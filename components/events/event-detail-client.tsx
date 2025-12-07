"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { DemoEvent } from "@/components/events/events-board";
import type { DemoUser } from "@/components/sign-in-form";
import { EventDetail } from "@/components/events/event-detail";

type EventDetailClientProps = {
  event: DemoEvent;
  users: DemoUser[];
};

export function EventDetailClient({ event, users }: EventDetailClientProps) {
  const searchParams = useSearchParams();
  const requestedUser = searchParams.get("user");
  const viewer = users.find((user) => user.id === requestedUser || user.email === requestedUser);

  const backHref = viewer ? `/events?user=${viewer.id}` : "/events";

  return (
    <div className="space-y-6">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
      >
        <span className="h-8 w-8 rounded-full border border-white/20 text-center leading-8">←</span>
        Back to events
      </Link>
      <EventDetail event={event} users={users} viewer={viewer} />
    </div>
  );
}
