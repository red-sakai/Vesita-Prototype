"use client";
import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";
import { useFadeInOnView } from "@/hooks/useFadeInOnView";
import { Button } from "@/components/ui/button";
import { StatisticsBar } from "@/components/statistics-bar";
import { Sparkles, Link2, CheckCircle } from "lucide-react";
import Image from "next/image";
import FloatingLines from "@/components/FloatingLines";



const focusPoints = [
  {
    icon: Sparkles,
    color: "purple",
    title: "Create",
    detail: "Launch a new event space with title, schedule, and capacity guardrails in under a minute.",
  },
  {
    icon: Link2,
    color: "cyan",
    title: "Coordinate",
    detail: "Share a single RSVP link, automate reminders, and keep contributions in sync across roles.",
  },
  {
    icon: CheckCircle,
    color: "primary",
    title: "Check in",
    detail: "Confirm arrivals with QR or manual toggles so your team sees attendance in real time.",
  },
];

const systemGlance = [
  {
    label: "Roles",
    body: "Guest, Attendee, Organizer, and Admin permissions ready out of the box.",
  },
  {
    label: "Routing",
    body: "Every event gets a unique link and ticket codes for each seat reserved.",
  },
  {
    label: "Signals",
    body: "Live RSVP pulse shows registrations, confirmations, and attendance deltas.",
  },
];

export default function Home() {
    const glanceControls = useAnimation();
    const glanceRef = useRef<HTMLDivElement | null>(null);
    useFadeInOnView(glanceRef, glanceControls);
  const whyControls = useAnimation();
  const whyRef = useRef<HTMLDivElement | null>(null);
  useFadeInOnView(whyRef, whyControls);
  const heroControls = useAnimation();
  const heroRef = useRef<HTMLDivElement | null>(null);
  useFadeInOnView(heroRef, heroControls);
  return (
    <>
      {/* Full-page background FloatingLines */}
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
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 40 }}
        animate={heroControls}
        style={{ willChange: "opacity, transform", marginTop: "-3rem" }}
        className="page-shell space-y-24"
      >
        <div className="min-h-[90vh] grid place-items-center">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Hero Text */}
            <div className="space-y-10 text-center lg:text-left">
              <div className="space-y-6">
                <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                  Host <span className="text-gradient">thoughtful gatherings</span> with one centered
                  workspace.
                </h1>
                <p className="text-base text-white/70 md:text-lg">
                  Everything from invites to attendance lives here. Stay present with your community while Vesita
                  keeps the ops clean in the background.
                </p>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Button href="/get-started" className="px-8 text-base">
                  Get started
                </Button>
                <Button variant="soft" href="/sign-in" className="px-8 text-base">
                  Sign in
                </Button>
              </div>
              <div className="flex flex-col lg:items-start gap-3 text-xs text-white/40">
                <span className="items-left">Scroll to explore Vesita</span>
                <span className="h-10 w-px animate-pulse item-c bg-gradient-to-b from-white/60 to-transparent" />
              </div>
            </div>

            {/* Hero Mockup */}
            <div className="relative hidden lg:block">
              <div className="float-animation">
                <Image
                  src="/dashboard-mockup.png"
                  alt="Vesita Dashboard Preview"
                  width={600}
                  height={450}
                  className="rounded-3xl shadow-[0_25px_80px_rgba(140,91,255,0.4)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <StatisticsBar />

        <motion.div
          ref={whyRef}
          initial={{ opacity: 0, y: 40 }}
          animate={whyControls}
          style={{ willChange: "opacity, transform" }}
          className="glass-panel grid gap-10 p-10 md:grid-cols-[0.8fr,1.2fr]"
        >
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Why Vesita</p>
            <h2 className="text-3xl font-semibold text-white">Everything you need, nothing to wrestle.</h2>
            <p className="text-sm text-white/60">
              Organizers, producers, and collaborators operate from the same canvas. Every update syncs instantly so
              nobody has to chase a spreadsheet or screenshot again.
            </p>
            <ul className="space-y-3 text-sm text-white/70">
              <li>- Structured event builder for hybrid or in-person formats.</li>
              <li>- Role-aware dashboards with access controls baked in.</li>
              <li>- Real time RSVP and attendance feed for door teams.</li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {focusPoints.map((point, idx) => {
              const Icon = point.icon;
              const colorClass = `feature-card-${point.color}`;
              return (
                <div
                  key={point.title}
                  className={`rounded-3xl border bg-white/5 p-5 transition-all duration-300 card-lift ${colorClass}`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <Icon className="h-6 w-6 text-white/80" />
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">0{idx + 1}</p>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-white">{point.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{point.detail}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          ref={glanceRef}
          initial={{ opacity: 0, y: 40 }}
          animate={glanceControls}
          style={{ willChange: "opacity, transform" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {systemGlance.map((item) => (
            <article key={item.label} className="glass-panel p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">{item.label}</p>
              <p className="mt-3 text-base text-white/80">{item.body}</p>
            </article>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
