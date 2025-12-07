"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import type { DemoEvent } from "@/components/events/events-board";
import type { DemoUser } from "@/components/sign-in-form";
import { EventDetail } from "@/components/events/event-detail";

type EventDetailClientProps = {
  event: DemoEvent;
  users: DemoUser[];
};

export function EventDetailClient({ event, users }: EventDetailClientProps) {
  const { user, isLoading } = useAuth();

  const backHref = user ? `/events?user=${user.id}` : "/events";

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-10 w-40 rounded-full"></div>
        <div className="glass-panel p-8 skeleton h-96"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-all hover:gap-3"
      >
        <span className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center transition-all">←</span>
        Back to events
      </Link>
      <EventDetail event={event} users={users} viewer={user} />
    </div>
  );
}
