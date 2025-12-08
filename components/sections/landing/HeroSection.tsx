import { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useFadeInOnView } from "@/hooks/useFadeInOnView";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  const heroControls = useAnimation();
  const heroRef = useRef<HTMLDivElement | null>(null);
  useFadeInOnView(heroRef, heroControls);

  return (
    <motion.div
      ref={heroRef}
      initial={{ opacity: 0, y: 40 }}
      animate={heroControls}
      style={{ willChange: "opacity, transform" }}
      className="min-h-[90vh] grid place-items-center"
    >
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
    </motion.div>
  );
}