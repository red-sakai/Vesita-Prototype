"use client";

import { AnimatedSection } from "./animated-section";

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

const statistics: Stat[] = [
  { value: "20", label: "Events Hosted", suffix: "+" },
  { value: "98", label: "Satisfaction Rate", suffix: "%" },
  { value: "2000", label: "Happy Attendees", suffix: "+" },
  { value: "10", label: "Organizations", suffix: "+" },
];

export function StatisticsBar() {
  return (
    <AnimatedSection className="glass-panel p-8 md:p-10">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {statistics.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="mb-2 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {stat.value}
              {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
            </div>
            <div className="text-xs uppercase tracking-wider text-white/60 md:text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
