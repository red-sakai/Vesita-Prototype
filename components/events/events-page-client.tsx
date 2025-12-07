"use client";

import { useSearchParams } from "next/navigation";
import { EventsBoard, type DemoEvent } from "@/components/events/events-board";
import type { DemoUser } from "@/components/sign-in-form";

type EventsPageClientProps = {
  users: DemoUser[];
  events: DemoEvent[];
};

export function EventsPageClient({ users, events }: EventsPageClientProps) {
  const searchParams = useSearchParams();
  const requestedUser = searchParams.get("user");

  const currentUser = users.find(
    (user) => user.id === requestedUser || user.email === requestedUser
  );

  if (!currentUser) {
    return (
      <div className="glass-panel p-6 text-center text-sm text-white/70">
        We could not detect a signed-in account. Please <a href="/sign-in" className="text-[#4DE1D3]">sign in</a> to continue.
      </div>
    );
  }

  return <EventsBoard events={events} currentUser={currentUser} />;
}
