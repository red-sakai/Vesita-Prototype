
import { Button } from "@/components/ui/button";
import FloatingLines from "@/components/ui/FloatingLines";

export default function RegisterPage() {

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
      <div className="page-shell space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Create your account</p>
          <h1 className="text-4xl font-semibold text-white">Register for Vesita</h1>
          <p className="mx-auto max-w-2xl text-sm text-white/60">
            Claim your workspace, invite collaborators, and start publishing events with role-based controls baked in.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <form className="glass-panel space-y-6 p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-white/70">
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">Full name</span>
                <input
                  type="text"
                  placeholder="Jordan Sparks"
                  className="w-full rounded-2xl border border-white/10 bg-[#0C111D] px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                  required
                />
              </label>
              <label className="space-y-2 text-sm text-white/70">
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">Work email</span>
                <input
                  type="email"
                  placeholder="you@studio.com"
                  className="w-full rounded-2xl border border-white/10 bg-[#0C111D] px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                  required
                />
              </label>
            </div>
            <label className="space-y-2 text-sm text-white/70">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">Organization</span>
              <input
                type="text"
                placeholder="Vesita Collective"
                className="w-full rounded-2xl border border-white/10 bg-[#0C111D] px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                required
              />
            </label>
            <label className="space-y-2 text-sm text-white/70">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">Team size</span>
              <select
                className="w-full appearance-none rounded-2xl border border-white/10 bg-[#0C111D] px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                defaultValue="1-5"
              >
                {[
                  "1-5",
                  "6-15",
                  "16-30",
                  "31-75",
                  "76+",
                ].map((size) => (
                  <option key={size} value={size} className="bg-[#0C111D] text-black">
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm text-white/70">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">Password</span>
              <input
                type="password"
                placeholder="Create a strong password"
                className="w-full rounded-2xl border border-white/10 bg-[#0C111D] px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                required
              />
            </label>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <input type="checkbox" required className="h-4 w-4 rounded border border-white/20 bg-transparent" />
              I agree to the Vesita Terms and Privacy Policy.
            </div>
            <Button type="submit" className="w-full py-3 text-base">
              Create workspace
            </Button>
          </form>
          <div className="glass-panel space-y-6 p-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">What happens next</p>
              <h2 className="text-2xl font-semibold text-white">Your first event in three steps</h2>
            </div>
            <ol className="space-y-4 text-sm text-white/70">
              <li className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Step 1</p>
                <p className="mt-1 font-semibold text-white">Verify email + invite collaborators</p>
                <p>Send organizer or admin invites directly from the onboarding wizard.</p>
              </li>
              <li className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Step 2</p>
                <p className="mt-1 font-semibold text-white">Draft your first experience</p>
                <p>Add title, location, capacity, and guest journey in our guided builder.</p>
              </li>
              <li className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Step 3</p>
                <p className="mt-1 font-semibold text-white">Publish + share RSVP link</p>
                <p>We create ticket codes and a shareable page instantly so you can start collecting registrations.</p>
              </li>
            </ol>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70">
              Already have a Vesita account? <a href="/sign-in" className="text-[#4DE1D3]">Sign in here.</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
