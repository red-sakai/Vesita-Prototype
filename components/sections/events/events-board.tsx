"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { DemoUser } from "@/components/sign-in-form";

export type DemoEvent = {
  id: string;
  title: string;
  startTime: string;
  location: string;
  capacity: number;
  published: boolean;
  description?: string;
  organizerId?: string;
  attendees?: {
    userId: string;
    status: string;
    ticketCode: string;
  }[];
};

type EventsBoardProps = {
  events: DemoEvent[];
  currentUser?: DemoUser;
};

function formatDate(value: string) {
  const date = new Date(value);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function EventsBoard({ events, currentUser }: EventsBoardProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const canCreateEvent = currentUser?.role === "ORGANIZER";

  function handleCreateEvent() {
    setFeedback("Organizer action: Event builder is coming soon.");
  }

  return (
    <div className="space-y-6">
      <div className="glass-panel flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Signed in</p>
          <p className="text-lg font-semibold text-white">{currentUser?.name ?? "Guest"}</p>
          <p className="text-sm text-white/60">Role: {currentUser?.role ?? "N/A"}</p>
        </div>
        {canCreateEvent && (
          <Button onClick={handleCreateEvent} className="self-start md:self-auto">
            Create event
          </Button>
        )}
      </div>

      {feedback && (
        <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
          {feedback}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {events.map((eventItem) => (
          <article key={eventItem.id} className="glass-panel flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">{eventItem.published ? "Published" : "Draft"}</p>
                <Link
                  href={`/events/${eventItem.id}?user=${currentUser?.id ?? ""}`}
                  className="text-2xl font-semibold text-white hover:text-[#4DE1D3]"
                >
                  {eventItem.title}
                </Link>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                {eventItem.capacity} seats
              </span>
            </div>
            <p className="text-sm text-white/60">{eventItem.location}</p>
            <p className="text-sm text-white/70">{formatDate(eventItem.startTime)}</p>
            <Button
              variant="primary"
              href={`/events/${eventItem.id}?user=${currentUser?.id ?? ""}`}
              className="mt-auto"
            >
              View & RSVP
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
