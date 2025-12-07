"use client";

import { useAuth } from "@/lib/auth-context";
import { EventsBoard, type DemoEvent } from "@/components/events/events-board";
import type { DemoUser } from "@/components/sign-in-form";
import { Button } from "@/components/ui/button";

type EventsPageClientProps = {
  users: DemoUser[];
  events: DemoEvent[];
};

export function EventsPageClient({ users, events }: EventsPageClientProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="glass-panel p-6 skeleton h-32"></div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-panel p-6 skeleton h-64"></div>
          <div className="glass-panel p-6 skeleton h-64"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="glass-panel p-12 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="mx-auto max-w-md space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-3xl">🔐</span>
          </div>
          <h3 className="text-xl font-semibold text-white">Authentication Required</h3>
          <p className="text-sm text-white/60">
            Please sign in to view and interact with events.
          </p>
          <Button href="/sign-in" className="mt-4">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return <EventsBoard events={events} currentUser={user} />;
}
