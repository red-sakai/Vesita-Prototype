"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import type { DemoUser } from "@/components/sign-in-form";
import type { DemoEvent } from "@/components/events/events-board";

type OrganizerDashboardProps = {
  users: DemoUser[];
  events: DemoEvent[];
};

function formatDate(value: string) {
  const date = new Date(value);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function OrganizerDashboard({ users, events }: OrganizerDashboardProps) {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState<string | null>(null);

  // Filter events created by this organizer
  const myEvents = events.filter(e => e.organizerId === user?.id);
  const draftEvents = myEvents.filter(e => !e.published);
  const publishedEvents = myEvents.filter(e => e.published);
  const totalRegistrations = myEvents.reduce((acc, e) => acc + (e.attendees?.length || 0), 0);

  const handleCreateEvent = () => {
    setFeedback("Event builder coming soon! You'll be able to create events with full customization.");
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="glass-panel p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Welcome back, {user?.name}!</h2>
            <p className="text-sm text-white/60 mt-1">Ready to create something memorable?</p>
          </div>
          <Button onClick={handleCreateEvent} className="self-start md:self-auto">
            + Create New Event
          </Button>
        </div>
      </div>

      {feedback && (
        <div className="rounded-3xl border border-blue-400/40 bg-blue-500/10 px-6 py-4 text-sm text-blue-200 animate-in fade-in slide-in-from-top-2 duration-300">
          {feedback}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="glass-panel p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">My Events</p>
          <p className="text-3xl font-bold text-white">{myEvents.length}</p>
          <p className="text-xs text-white/60">{publishedEvents.length} live</p>
        </div>
        <div className="glass-panel p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Registrations</p>
          <p className="text-3xl font-bold text-white">{totalRegistrations}</p>
          <p className="text-xs text-white/60">Total RSVPs</p>
        </div>
        <div className="glass-panel p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Draft Events</p>
          <p className="text-3xl font-bold text-white">{draftEvents.length}</p>
          <p className="text-xs text-white/60">Need publishing</p>
        </div>
        <div className="glass-panel p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Avg. Capacity</p>
          <p className="text-3xl font-bold text-white">
            {myEvents.length > 0 ? Math.round(myEvents.reduce((acc, e) => acc + e.capacity, 0) / myEvents.length) : 0}
          </p>
          <p className="text-xs text-white/60">Per event</p>
        </div>
      </div>

      {/* My Events */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">My Events</h2>
          <Link
            href={`/events?user=${user?.id}`}
            className="text-sm text-[#4DE1D3] hover:text-white transition"
          >
            View all events →
          </Link>
        </div>

        {myEvents.length === 0 ? (
          <div className="glass-panel p-12 text-center">
            <div className="mx-auto max-w-md space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-xl font-semibold text-white">No events yet</h3>
              <p className="text-sm text-white/60">
                Get started by creating your first event. It only takes a minute to set up!
              </p>
              <Button onClick={handleCreateEvent} className="mt-4">
                Create Your First Event
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {myEvents.map((event) => (
              <article key={event.id} className="glass-panel p-6 space-y-4 hover:border-white/20 transition">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${
                        event.published ? "bg-emerald-500" : "bg-yellow-500"
                      }`}></span>
                      <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                        {event.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <Link
                      href={`/events/${event.id}?user=${user?.id}`}
                      className="text-xl font-semibold text-white hover:text-[#4DE1D3] transition"
                    >
                      {event.title}
                    </Link>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                    {event.capacity} seats
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-white/70">📍 {event.location}</p>
                  <p className="text-white/70">📅 {formatDate(event.startTime)}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-sm">
                    <span className="text-white/50">Registrations: </span>
                    <span className="font-semibold text-white">{event.attendees?.length || 0}</span>
                    <span className="text-white/50"> / {event.capacity}</span>
                  </div>
                  <Link
                    href={`/events/${event.id}?user=${user?.id}`}
                    className="text-sm text-[#4DE1D3] hover:text-white transition"
                  >
                    Manage →
                  </Link>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#4DE1D3] to-[#3B82F6] transition-all duration-500"
                    style={{
                      width: `${Math.min((event.attendees?.length || 0) / event.capacity * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Quick Tips</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium text-white">📊 Track Performance</p>
            <p className="text-xs text-white/60 mt-1">Monitor your RSVP conversion rates in real-time</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium text-white">✉️ Send Reminders</p>
            <p className="text-xs text-white/60 mt-1">Automated reminders boost attendance by 30%</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium text-white">🎫 Share Links</p>
            <p className="text-xs text-white/60 mt-1">Each event gets a unique shareable RSVP page</p>
          </div>
        </div>
      </div>
    </div>
  );
}

