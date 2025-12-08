"use client";
import { useAnimation } from "framer-motion";
import { useRef } from "react";
import { useFadeInOnView } from "@/hooks/useFadeInOnView";
import { StatisticsBar } from "@/components/statistics-bar";
import { Sparkles, Link2, CheckCircle } from "lucide-react";
import HeroSection from "./HeroSection";
import WhySection from "./WhySection";
import SystemGlanceSection from "./SystemGlanceSection";
import LandingBackground from "./LandingBackground";

const focusPoints = [
  {
    icon: Sparkles,
    color: "purple",
    title: "Create",
    detail:
      "Launch a new event space with title, schedule, and capacity guardrails in under a minute.",
  },
  {
    icon: Link2,
    color: "cyan",
    title: "Coordinate",
    detail:
      "Share a single RSVP link, automate reminders, and keep contributions in sync across roles.",
  },
  {
    icon: CheckCircle,
    color: "primary",
    title: "Check in",
    detail:
      "Confirm arrivals with QR or manual toggles so your team sees attendance in real time.",
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

export default function LandingSection() {
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
      <LandingBackground />
      <div className="page-shell space-y-24" style={{ marginTop: "-3rem" }}>
        <HeroSection />
        <StatisticsBar />
        <WhySection focusPoints={focusPoints} whyRef={whyRef} whyControls={whyControls} />
        <SystemGlanceSection systemGlance={systemGlance} glanceRef={glanceRef} glanceControls={glanceControls} />
      </div>
    </>
  );
}
