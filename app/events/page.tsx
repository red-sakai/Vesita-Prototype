import dummyData from "@/data/dummy.json";
import type { DemoUser } from "@/components/sign-in-form";
import type { DemoEvent } from "@/components/events/events-board";
import { EventsPageClient } from "@/components/events/events-page-client";

export default function EventsPage() {
  const users = dummyData.users as DemoUser[];
  const events = dummyData.events as DemoEvent[];

  return (
    <div className="page-shell space-y-10">
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Events</p>
        <h1 className="text-4xl font-semibold text-white">Upcoming gatherings</h1>
        <p className="text-sm text-white/60">
          Sign in to interact with events using your role permissions. Attendees can RSVP, and organizers can publish new experiences.
        </p>
      </div>
      <EventsPageClient users={users} events={events} />
    </div>
  );
}
