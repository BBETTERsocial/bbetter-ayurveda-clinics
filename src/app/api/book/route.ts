import { NextResponse } from "next/server";

type BookingBody = {
  name?: string;
  mobile?: string;
  problem?: string;
  date?: string;
  location?: string;
  message?: string;
};

function isValidMobile(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export async function POST(request: Request) {
  let body: BookingBody;
  try {
    body = (await request.json()) as BookingBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const mobile = String(body.mobile || "").trim();
  const problem = String(body.problem || "").trim();
  const date = String(body.date || "").trim();
  const location = String(body.location || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !mobile || !problem || !date) {
    return NextResponse.json(
      {
        ok: false,
        error: "Name, mobile number, problem, and appointment date are required.",
      },
      { status: 400 }
    );
  }

  if (!isValidMobile(mobile)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid mobile number." },
      { status: 400 }
    );
  }

  const webAppUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL?.trim();
  if (!webAppUrl) {
    console.error("GOOGLE_SHEETS_WEBAPP_URL is not set");
    return NextResponse.json(
      { ok: false, error: "Booking service is not configured yet." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        mobile,
        problem,
        date,
        location,
        message,
        sheetId: process.env.GOOGLE_SHEETS_ID || "",
      }),
      redirect: "follow",
    });

    const text = await res.text();
    let parsed: { ok?: boolean; error?: string } = {};
    try {
      parsed = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      // Apps Script sometimes returns HTML on redirect; treat 2xx as success
      if (res.ok) {
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json(
        { ok: false, error: "Could not save booking. Try again." },
        { status: 502 }
      );
    }

    if (!res.ok || parsed.ok === false) {
      return NextResponse.json(
        { ok: false, error: parsed.error || "Could not save booking." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Booking sheet error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not save booking. Try again." },
      { status: 502 }
    );
  }
}
