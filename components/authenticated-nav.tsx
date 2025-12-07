"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export function AuthenticatedNav() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const getNavLinks = () => {
    const baseQuery = user
      ? `?user=${user.id}&role=${user.role.toLowerCase()}`
      : "";

    switch (user?.role) {
      case "ADMIN":
        return [
          { label: "Dashboard", href: `/admin/dashboard${baseQuery}` },
          { label: "All Events", href: `/events${baseQuery}` },
          { label: "Users", href: `/admin/users${baseQuery}` },
          { label: "Analytics", href: `/admin/analytics${baseQuery}` },
        ];
      case "ORGANIZER":
        return [
          { label: "Dashboard", href: `/organizer/dashboard${baseQuery}` },
          { label: "My Events", href: `/events${baseQuery}` },
          { label: "Create Event", href: `/organizer/create${baseQuery}` },
          { label: "Analytics", href: `/organizer/analytics${baseQuery}` },
        ];
      case "ATTENDEE":
        return [
          { label: "Events", href: `/events${baseQuery}` },
          { label: "My Tickets", href: `/attendee/tickets${baseQuery}` },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case "ADMIN":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "ORGANIZER":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "ATTENDEE":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      default:
        return "bg-white/10 text-white/60 border-white/20";
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05060b]/95 backdrop-blur-3xl">
      <div className="mx-auto flex w-[min(1280px,100%-3rem)] items-center justify-between py-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href.split("?")[0];
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-white">
                  {user?.name}
                </span>
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#4DE1D3] to-[#3B82F6] flex items-center justify-center text-sm font-semibold text-white">
                {user?.name.charAt(0)}
              </div>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 origin-top-right animate-in fade-in zoom-in-95 duration-200">
                <div className="glass-panel overflow-hidden rounded-2xl border border-white/10 p-2">
                  <div className="border-b border-white/10 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white">
                        {user?.name}
                      </p>
                      <span
                        className={`text-xs ${getRoleBadgeColor()} rounded-full px-2 py-0.5 border`}
                      >
                        {user?.role}
                      </span>
                    </div>
                    <p className="text-xs text-white/60">{user?.email}</p>
                  </div>

                  <div className="py-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-lg px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white md:hidden"
                      >
                        {link.label}
                      </Link>
                    ))}

                    <Link
                      href={`/settings?user=${user?.id}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-lg px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                    >
                      Settings
                    </Link>
                  </div>

                  <div className="border-t border-white/10 pt-2">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        signOut();
                      }}
                      className="w-full rounded-lg px-4 py-2 text-left text-sm text-rose-300 transition hover:bg-rose-500/10"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
