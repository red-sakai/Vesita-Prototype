"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import type { DemoUser } from "@/components/sign-in-form";
import type { DemoEvent } from "@/components/events/events-board";

type AttendeeTicketsProps = {
  users: DemoUser[];
  events: DemoEvent[];
};

function formatDate(value: string) {
  const date = new Date(value);
  return date.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getStatusColor(status: string) {
  switch (status) {
    case "REGISTERED":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    case "CONFIRMED":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "ATTENDED":
      return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    default:
      return "bg-white/10 text-white/60 border-white/20";
  }
}

export function AttendeeTickets({ users, events }: AttendeeTicketsProps) {
  const { user } = useAuth();

  // Find events the user is registered for
  const myTickets = events
    .filter(event => event.attendees?.some(a => a.userId === user?.id))
    .map(event => {
      const attendee = event.attendees?.find(a => a.userId === user?.id);
      return {
        event,
        attendee,
      };
    });

  const upcomingTickets = myTickets.filter(t => new Date(t.event.startTime) > new Date());
  const pastTickets = myTickets.filter(t => new Date(t.event.startTime) <= new Date());

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass-panel p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Total Tickets</p>
          <p className="text-3xl font-bold text-white">{myTickets.length}</p>
          <p className="text-xs text-white/60">All registrations</p>
        </div>
        <div className="glass-panel p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Upcoming</p>
          <p className="text-3xl font-bold text-white">{upcomingTickets.length}</p>
          <p className="text-xs text-white/60">Events to attend</p>
        </div>
        <div className="glass-panel p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Past Events</p>
          <p className="text-3xl font-bold text-white">{pastTickets.length}</p>
          <p className="text-xs text-white/60">Events attended</p>
        </div>
      </div>

      {myTickets.length === 0 ? (
        <div className="glass-panel p-12 text-center">
          <div className="mx-auto max-w-md space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-3xl">🎫</span>
            </div>
            <h3 className="text-xl font-semibold text-white">No tickets yet</h3>
            <p className="text-sm text-white/60">
              Browse available events and RSVP to start building your event collection!
            </p>
            <Button href={`/events?user=${user?.id}`} className="mt-4">
              Browse Events
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Upcoming Events */}
          {upcomingTickets.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingTickets.map(({ event, attendee }) => (
                  <article
                    key={event.id}
                    className="glass-panel p-6 hover:border-white/20 transition"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full border px-3 py-1 text-xs ${getStatusColor(attendee?.status || "")}`}>
                            {attendee?.status}
                          </span>
                          <span className="text-xs text-white/50">•</span>
                          <span className="text-xs text-white/50">Ticket: {attendee?.ticketCode}</span>
                        </div>
                        
                        <Link
                          href={`/events/${event.id}?user=${user?.id}`}
                          className="text-2xl font-semibold text-white hover:text-[#4DE1D3] transition inline-block"
                        >
                          {event.title}
                        </Link>

                        <div className="space-y-1 text-sm text-white/70">
                          <p>📅 {formatDate(event.startTime)}</p>
                          <p>📍 {event.location}</p>
                        </div>

                        {event.description && (
                          <p className="text-sm text-white/60 max-w-2xl">{event.description}</p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/events/${event.id}?user=${user?.id}`}
                          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-white hover:bg-white/10 transition"
                        >
                          View Details
                        </Link>
                        <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition">
                          Download Ticket
                        </button>
                      </div>
                    </div>

                    {/* QR Code Placeholder */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-4">
                      <div className="h-20 w-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <span className="text-2xl">📱</span>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-white">Check-in QR Code</p>
                        <p className="text-white/60 text-xs">Present this at the entrance</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastTickets.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Past Events</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {pastTickets.map(({ event, attendee }) => (
                  <article
                    key={event.id}
                    className="glass-panel p-6 opacity-75 hover:opacity-100 transition"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full border px-3 py-1 text-xs ${getStatusColor(attendee?.status || "")}`}>
                          {attendee?.status}
                        </span>
                      </div>
                      
                      <Link
                        href={`/events/${event.id}?user=${user?.id}`}
                        className="text-lg font-semibold text-white hover:text-[#4DE1D3] transition inline-block"
                      >
                        {event.title}
                      </Link>

                      <div className="space-y-1 text-sm text-white/60">
                        <p>📅 {formatDate(event.startTime)}</p>
                        <p>📍 {event.location}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Call to Action */}
      <div className="glass-panel p-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Discover More Events</h3>
        <p className="text-sm text-white/60 mb-4">
          Stay connected with your community by exploring and registering for upcoming experiences.
        </p>
        <Button href={`/events?user=${user?.id}`}>
          Browse All Events
        </Button>
      </div>
    </div>
  );
}

