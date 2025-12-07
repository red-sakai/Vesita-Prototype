import Link from "next/link";

const footerNav = [
  { label: "Events", href: "/events" },
  { label: "BatchMail", href: "/batchmail" },
  { label: "FrameIt", href: "/frameit" },
  { label: "Certify", href: "/certify" },
  { label: "SnapGrid", href: "/snapgrid" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#04060f]/80">
      <div className="page-shell flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3 text-white/70">
          <div className="text-sm uppercase tracking-[0.35em] text-white/60">Vesita</div>
          <p className="text-sm max-w-sm">
            A modern event operations stack for creators, studios, and teams who care about memorable experiences.
          </p>
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Vesita Labs. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-white/70">
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full border border-white/10 px-4 py-2 hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
