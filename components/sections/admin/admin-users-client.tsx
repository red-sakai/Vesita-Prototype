"use client";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import type { DemoUser } from "@/components/sign-in-form";

type AdminUsersClientProps = {
  users: DemoUser[];
};

export function AdminUsersClient({ users }: AdminUsersClientProps) {
  const { user } = useAuth();

  if (user?.role !== "ADMIN") {
    return (
      <div className="glass-panel p-12 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-rose-500/10 flex items-center justify-center">
            <span className="text-3xl">🚫</span>
          </div>
          <h3 className="text-xl font-semibold text-white">Access Denied</h3>
          <p className="text-sm text-white/60">
            You don't have permission to view this page. Admin access required.
          </p>
          <Button href={`/events?user=${user?.id}`} className="mt-4">
            Go to Events
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">All Users</h2>
        <Button variant="soft">Add User</Button>
      </div>
      
      <div className="space-y-4">
        {users.map((userItem) => (
          <div
            key={userItem.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#4DE1D3] to-[#3B82F6] flex items-center justify-center text-lg font-semibold text-white">
                {userItem.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white">{userItem.name}</p>
                <p className="text-sm text-white/60">{userItem.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`rounded-full px-4 py-2 text-sm border ${
                userItem.role === "ADMIN"
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                  : userItem.role === "ORGANIZER"
                  ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
              }`}>
                {userItem.role}
              </span>
              <button className="text-sm text-white/60 hover:text-white transition px-4 py-2 rounded-lg hover:bg-white/5">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

