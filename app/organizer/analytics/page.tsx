"use client";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export default function OrganizerAnalyticsPage() {
  const { user } = useAuth();

  if (user?.role !== "ORGANIZER" && user?.role !== "ADMIN") {
    return (
      <div className="page-shell">
        <div className="glass-panel p-12 text-center">
          <div className="mx-auto max-w-md space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-rose-500/10 flex items-center justify-center">
              <span className="text-3xl">🚫</span>
            </div>
            <h3 className="text-xl font-semibold text-white">Access Denied</h3>
            <p className="text-sm text-white/60">
              You don't have permission to view this page. Organizer access required.
            </p>
            <Button href={`/events?user=${user?.id}`} className="mt-4">
              Go to Events
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Organizer Portal</p>
        <h1 className="text-4xl font-semibold text-white">Event Analytics</h1>
        <p className="text-sm text-white/60">
          Track performance and insights for your events.
        </p>
      </div>

      <div className="glass-panel p-12 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-3xl">📊</span>
          </div>
          <h3 className="text-xl font-semibold text-white">Analytics Coming Soon</h3>
          <p className="text-sm text-white/60">
            Detailed event analytics and insights are under development.
          </p>
          <Button href={`/organizer/dashboard?user=${user?.id}`} variant="soft" className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

