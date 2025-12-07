import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-white/40 hover:text-white"
    >
      <span className="relative text-base font-black tracking-tight text-white">
        Vesita
        <span className="absolute -right-2 -top-2 h-2 w-2 rounded-full bg-[#4DE1D3] shadow-[0_0_12px_rgba(77,225,211,0.8)]" />
      </span>
      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-white/60 group-hover:text-white">
        Beta
      </span>
    </Link>
  );
}
