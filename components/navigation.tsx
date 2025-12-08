import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Events", href: "/events", status: "active" as const },
  { label: "BatchMail", href: "/batchmail", status: "placeholder" as const },
  { label: "FrameIt", href: "/frameit", status: "placeholder" as const },
  { label: "Certify", href: "/certify", status: "placeholder" as const },
  { label: "SnapGrid", href: "/snapgrid", status: "placeholder" as const },
];

export function NavigationBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05060b]/50 backdrop-blur-3xl">
      <div className="mx-auto flex w-[min(1280px,100%-3rem)] items-center justify-between py-4">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) =>
            link.status === "active" ? (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ) : (
              <span
                key={link.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-white/50"
                aria-disabled
              >
                <span>{link.label}</span>
                <span className="absolute -top-2 right-0 translate-x-1 rounded-full bg-white/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.3em] text-white/60 group-hover:text-white">
                  Soon
                </span>
              </span>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden md:inline-flex" href="/sign-in">
            Sign In
          </Button>
          <Button className="px-6" href="/get-started">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
