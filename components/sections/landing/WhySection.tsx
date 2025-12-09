import { motion } from "framer-motion";

export default function WhySection({ focusPoints, whyRef, whyControls }: any) {
  return (
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
        {focusPoints.map((point: any, idx: number) => {
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
  );
}