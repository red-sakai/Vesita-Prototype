import { OrganizerDashboard } from "@/components/organizer/organizer-dashboard";
import dummyData from "@/data/dummy.json";
import type { DemoUser } from "@/components/sign-in-form";
import type { DemoEvent } from "@/components/events/events-board";

export default function OrganizerDashboardPage() {
  const users = dummyData.users as DemoUser[];
  const events = dummyData.events as DemoEvent[];

  return (
    <div className="page-shell space-y-10">
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Organizer Portal</p>
        <h1 className="text-4xl font-semibold text-white">Your Dashboard</h1>
        <p className="text-sm text-white/60">
          Create and manage your events, track RSVPs, and engage with attendees.
        </p>
      </div>
      <OrganizerDashboard users={users} events={events} />
    </div>
  );
}

