/**
 * Paste this into your Google Sheet:
 *   1. Open sheet ID 1fjRocwQNoxFTkxCeq2YmdhRjiomHGRENzIxqIxevxco
 *   2. Extensions → Apps Script
 *   3. Replace code with this file
 *   4. Save → Deploy → New deployment → Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *   5. Copy the Web App URL into Vercel / .env.local:
 *      GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/XXXX/exec
 *
 * Sheet columns (row 1 headers):
 * Timestamp | Name | Mobile | Problem | Appointment Date | Location | Message
 */

var SHEET_ID = "1fjRocwQNoxFTkxCeq2YmdhRjiomHGRENzIxqIxevxco";
var SHEET_NAME = "Bookings"; // create this tab, or change to your tab name

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents || "{}");
    } else if (e.parameter) {
      data = e.parameter;
    }

    var name = String(data.name || "").trim();
    var mobile = String(data.mobile || "").trim();
    var problem = String(data.problem || "").trim();
    var date = String(data.date || "").trim();
    var location = String(data.location || "").trim();
    var message = String(data.message || "").trim();

    if (!name || !mobile || !problem || !date) {
      return json_({ ok: false, error: "Missing required fields" });
    }

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Mobile",
        "Problem",
        "Appointment Date",
        "Location",
        "Message",
      ]);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Mobile",
        "Problem",
        "Appointment Date",
        "Location",
        "Message",
      ]);
    }

    sheet.appendRow([
      new Date(),
      name,
      mobile,
      problem,
      date,
      location,
      message,
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({ ok: true, service: "BBETTER booking" });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
