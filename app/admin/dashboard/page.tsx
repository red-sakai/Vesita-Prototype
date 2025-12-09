import { AdminDashboard } from "@/components/sections/admin/admin-dashboard";
import dummyData from "@/data/dummy.json";
import type { DemoUser } from "@/components/sign-in-form";
import type { DemoEvent } from "@/components/sections/events/events-board";

export default function AdminDashboardPage() {
  const users = dummyData.users as DemoUser[];
  const events = dummyData.events as DemoEvent[];

  return (
    <div className="page-shell space-y-10">
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Admin Portal</p>
        <h1 className="text-4xl font-semibold text-white">System Dashboard</h1>
        <p className="text-sm text-white/60">
          Manage users, monitor events, and oversee platform operations.
        </p>
      </div>
      <AdminDashboard users={users} events={events} />
    </div>
  );
}

