import { AttendeeTickets } from "@/components/attendee/attendee-tickets";
import dummyData from "@/data/dummy.json";
import type { DemoUser } from "@/components/sign-in-form";
import type { DemoEvent } from "@/components/events/events-board";

export default function AttendeeTicketsPage() {
  const users = dummyData.users as DemoUser[];
  const events = dummyData.events as DemoEvent[];

  return (
    <div className="page-shell space-y-10">
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">My Tickets</p>
        <h1 className="text-4xl font-semibold text-white">Your Event Passes</h1>
        <p className="text-sm text-white/60">
          Access your registered events and manage your tickets.
        </p>
      </div>
      <AttendeeTickets users={users} events={events} />
    </div>
  );
}

