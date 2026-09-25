import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto flex min-h-[60svh] max-w-xl flex-col items-center justify-center px-5 py-20 text-center">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
          404
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold text-[#0B1F18]">
          Page not found
        </h1>
        <p className="mt-3 text-[15px] text-[#4A4A4A]">
          That page may have moved, or the link is outdated.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-press inline-flex h-11 items-center rounded-full bg-[#0B1F18] px-5 text-[10px] font-bold tracking-[0.12em] text-[#EBE8E2] uppercase"
          >
            Back home
          </Link>
          <Link
            href="/blog"
            className="inline-flex h-11 items-center rounded-full border border-[#0B1F18]/20 px-5 text-[10px] font-bold tracking-[0.12em] text-[#0B1F18] uppercase"
          >
            Blog
          </Link>
          <Link
            href="/treatments"
            className="inline-flex h-11 items-center rounded-full border border-[#0B1F18]/20 px-5 text-[10px] font-bold tracking-[0.12em] text-[#0B1F18] uppercase"
          >
            Treatments
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
