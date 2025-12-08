import { notFound } from "next/navigation";
import dummyData from "@/data/dummy.json";
import type { DemoEvent } from "@/components/sections/events/events-board";
import type { DemoUser } from "@/components/sign-in-form";
import { EventDetailClient } from "@/components/sections/events/event-detail-client";

type EventDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const events = dummyData.events as DemoEvent[];
  const users = dummyData.users as DemoUser[];
  const event = events.find((evt) => evt.id === id);

  if (!event) {
    notFound();
  }

  return (
    <div className="page-shell space-y-10">
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Event</p>
        <h1 className="text-4xl font-semibold text-white">RSVP + Attendees</h1>
        <p className="text-sm text-white/60">Join the experience and see who is already in.</p>
      </div>
      <EventDetailClient event={event} users={users} />
    </div>
  );
}
