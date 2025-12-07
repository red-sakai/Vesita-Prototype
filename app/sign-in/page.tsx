import { SignInForm, type DemoUser } from "@/components/sign-in-form";
import dummyData from "@/data/dummy.json";

const demoUsers = dummyData.users as DemoUser[];

export default function SignInPage() {
  return (
    <div className="page-shell">
      <div className="mx-auto max-w-xl space-y-10">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Welcome back</p>
          <h1 className="text-4xl font-semibold text-white">Sign in to Vesita</h1>
          <p className="text-sm text-white/60">
            Access your organizer console, respond to invitations, and continue planning unforgettable gatherings.
          </p>
        </div>
        <div className="glass-panel space-y-6 p-8">
          <SignInForm users={demoUsers} />
        </div>
        <div className="glass-panel space-y-4 p-6 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Demo accounts</p>
          <ul className="space-y-3">
            {demoUsers.map((user) => (
              <li key={user.id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-white">{user.name}</p>
                <p className="text-white/70">Role: {user.role}</p>
                <p className="text-white/60 text-xs">Email: {user.email}</p>
                <p className="text-white/60 text-xs">Password: {user.password}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
