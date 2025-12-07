"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import type { DemoUser } from "@/components/sign-in-form";
import type { DemoEvent } from "@/components/events/events-board";

type AdminDashboardProps = {
  users: DemoUser[];
  events: DemoEvent[];
};

export function AdminDashboard({ users, events }: AdminDashboardProps) {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<"overview" | "users" | "events">("overview");

  const stats = {
    totalUsers: users.length,
    totalEvents: events.length,
    publishedEvents: events.filter(e => e.published).length,
    totalAttendees: events.reduce((acc, e) => acc + (e.attendees?.length || 0), 0),
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="glass-panel p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Total Users</p>
          <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
          <p className="text-xs text-white/60">Active accounts</p>
        </div>
        <div className="glass-panel p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Total Events</p>
          <p className="text-3xl font-bold text-white">{stats.totalEvents}</p>
          <p className="text-xs text-white/60">{stats.publishedEvents} published</p>
        </div>
        <div className="glass-panel p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Registrations</p>
          <p className="text-3xl font-bold text-white">{stats.totalAttendees}</p>
          <p className="text-xs text-white/60">Total RSVPs</p>
        </div>
        <div className="glass-panel p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">System Status</p>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <p className="text-lg font-semibold text-emerald-300">Operational</p>
          </div>
          <p className="text-xs text-white/60">All systems running</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="glass-panel p-2 flex gap-2">
        <button
          onClick={() => setSelectedTab("overview")}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
            selectedTab === "overview"
              ? "bg-white/10 text-white"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setSelectedTab("users")}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
            selectedTab === "users"
              ? "bg-white/10 text-white"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setSelectedTab("events")}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
            selectedTab === "events"
              ? "bg-white/10 text-white"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          Events
        </button>
      </div>

      {/* Tab Content */}
      {selectedTab === "overview" && (
        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            <div className="space-y-3">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="text-sm font-medium text-white">{event.title}</p>
                    <p className="text-xs text-white/60">{event.attendees?.length || 0} registrations</p>
                  </div>
                  <Link
                    href={`/events/${event.id}?user=${user?.id}`}
                    className="text-xs text-[#4DE1D3] hover:text-white"
                  >
                    View →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === "users" && (
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">User Management</h2>
            <Button variant="soft">Add User</Button>
          </div>
          <div className="space-y-3">
            {users.map((userItem) => (
              <div key={userItem.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4DE1D3] to-[#3B82F6] flex items-center justify-center text-sm font-semibold text-white">
                    {userItem.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{userItem.name}</p>
                    <p className="text-xs text-white/60">{userItem.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs border ${
                    userItem.role === "ADMIN"
                      ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                      : userItem.role === "ORGANIZER"
                      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                      : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  }`}>
                    {userItem.role}
                  </span>
                  <button className="text-xs text-white/60 hover:text-white">Manage</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === "events" && (
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Event Management</h2>
            <Button variant="soft" href={`/events?user=${user?.id}`}>View All Events</Button>
          </div>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white">{event.title}</p>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${
                        event.published
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}>
                        {event.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-xs text-white/60">{event.location}</p>
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <span>{event.capacity} capacity</span>
                      <span>•</span>
                      <span>{event.attendees?.length || 0} registered</span>
                    </div>
                  </div>
                  <Link
                    href={`/events/${event.id}?user=${user?.id}`}
                    className="text-xs text-[#4DE1D3] hover:text-white"
                  >
                    Manage →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

