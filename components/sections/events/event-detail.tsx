"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { DemoEvent } from "@/components/sections/events/events-board";
import type { DemoUser } from "@/components/sign-in-form";

export type RSVPRecord = {
  userId: string;
  status: string;
  ticketCode: string;
};

type EventDetailProps = {
  event: DemoEvent;
  users: DemoUser[];
  viewer?: DemoUser;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function EventDetail({ event, users, viewer }: EventDetailProps) {
  const [attendees, setAttendees] = useState<RSVPRecord[]>(event.attendees || []);
  const [feedback, setFeedback] = useState<string | null>(null);
  const canRSVP = viewer?.role === "ATTENDEE";
  const viewerRsvp = attendees.find((record) => record.userId === viewer?.id);
  const organizer = users.find((person) => person.id === event.organizerId);

  function resolveName(userId: string) {
    return users.find((person) => person.id === userId)?.name || userId;
  }

  function handleRSVP() {
    if (!viewer || !canRSVP) {
      setFeedback("Only attendees can RSVP.");
      return;
    }

    setAttendees((prev) => {
      if (viewerRsvp) {
        setFeedback("Your RSVP has been cancelled.");
        return prev.filter((record) => record.userId !== viewer.id);
      }
      const next = [
        ...prev,
        {
          userId: viewer.id,
          status: "REGISTERED",
          ticketCode: `VST-${Math.floor(Math.random() * 9000 + 1000)}`,
        },
      ];
      setFeedback("You are confirmed for this event.");
      return next;
    });
  }

  return (
    <div className="space-y-8">
      <div className="glass-panel overflow-hidden">
        <div className="relative h-64 w-full bg-gradient-to-r from-[#151d34] via-[#1a233d] to-[#262f4b]">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(141,91,255,0.45), transparent 45%), radial-gradient(circle at 80% 0%, rgba(77,225,211,0.4), transparent 40%)",
          }} />
          <div className="absolute inset-0 flex items-end p-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">{event.published ? "Live" : "Draft"}</p>
              <h1 className="text-4xl font-semibold text-white">{event.title}</h1>
              <p className="text-sm text-white/70">Hosted by {organizer?.name ?? "Unknown"}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-6 p-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Schedule</p>
                <p>{formatDate(event.startTime)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Location</p>
                <p>{event.location}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Capacity</p>
                <p>{event.capacity} seats</p>
              </div>
            </div>
            <p className="text-sm text-white/70">{event.description}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button onClick={handleRSVP} disabled={!canRSVP}>
                {viewerRsvp ? "Cancel RSVP" : "RSVP"}
              </Button>
              {!canRSVP && <p className="text-xs text-white/60">Sign in as an attendee to RSVP.</p>}
            </div>
            {feedback && (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                {feedback}
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Organizer</p>
              <p className="text-lg font-semibold text-white">{organizer?.name ?? "Unknown"}</p>
              <p className="text-sm text-white/60">Role: {organizer?.role ?? "ORGANIZER"}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Invite link</p>
              <p className="text-sm text-white/70">vesita.app/events/{event.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel space-y-4 p-8">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Attendees ({attendees.length})</p>
          <span className="text-xs text-white/50">Live sync</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {attendees.length === 0 && (
            <p className="text-sm text-white/60">No RSVPs yet. Be the first to register.</p>
          )}
          {attendees.map((record) => (
            <div
              key={record.ticketCode}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
            >
              <div>
                <p className="text-white font-semibold">{resolveName(record.userId)}</p>
                <p className="text-xs text-white/50">Ticket {record.ticketCode}</p>
              </div>
              <span className="rounded-full border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200">
                {record.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
