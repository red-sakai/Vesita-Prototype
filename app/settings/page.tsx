"use client";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="page-shell">
        <div className="glass-panel p-12 text-center">
          <div className="mx-auto max-w-md space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-3xl">🔐</span>
            </div>
            <h3 className="text-xl font-semibold text-white">Authentication Required</h3>
            <p className="text-sm text-white/60">
              Please sign in to access your settings.
            </p>
            <Button href="/sign-in" className="mt-4">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Settings</p>
        <h1 className="text-4xl font-semibold text-white">Account Settings</h1>
        <p className="text-sm text-white/60">
          Manage your account preferences and profile.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Section */}
        <div className="glass-panel p-8 space-y-6">
          <h2 className="text-xl font-semibold text-white">Profile Information</h2>
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#4DE1D3] to-[#3B82F6] flex items-center justify-center text-2xl font-semibold text-white">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-semibold text-white">{user.name}</p>
              <p className="text-sm text-white/60">{user.email}</p>
              <span className={`inline-block mt-1 rounded-full px-3 py-1 text-xs border ${
                user.role === "ADMIN"
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                  : user.role === "ORGANIZER"
                  ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
              }`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Settings Placeholder */}
        <div className="glass-panel p-12 text-center">
          <div className="mx-auto max-w-md space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-3xl">⚙️</span>
            </div>
            <h3 className="text-xl font-semibold text-white">Settings Coming Soon</h3>
            <p className="text-sm text-white/60">
              Advanced account settings and preferences are under development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

