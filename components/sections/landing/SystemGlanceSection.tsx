import { motion } from "framer-motion";

export default function SystemGlanceSection({ systemGlance, glanceRef, glanceControls }: any) {
  return (
    <motion.div
      ref={glanceRef}
      initial={{ opacity: 0, y: 40 }}
      animate={glanceControls}
      style={{ willChange: "opacity, transform" }}
      className="grid gap-6 md:grid-cols-3"
    >
      {systemGlance.map((item: any) => (
        <article key={item.label} className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">{item.label}</p>
          <p className="mt-3 text-base text-white/80">{item.body}</p>
        </article>
      ))}
    </motion.div>
  );
}