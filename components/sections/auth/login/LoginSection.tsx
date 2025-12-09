import { SignInForm, type DemoUser } from "@/components/sign-in-form";
import FloatingLines from "@/components/ui/FloatingLines";
import dummyData from "@/data/dummy.json";

const demoUsers = dummyData.users as DemoUser[];

export default function LoginSection() {
  return (
    <>
      <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[4, 5, 6]}
          lineDistance={[10, 8, 6]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          linesGradient={["#6a4fb3", "#3a4a7c", "#8a6fae"]}
          topWavePosition={{ x: 0.0, y: 0.7, z: 0.5 }}
          middleWavePosition={{ x: 0.0, y: 0.0, z: 0.0 }}
        />
      </div>
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
    </>
  );
}
