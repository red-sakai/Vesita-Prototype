import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "soft";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: string;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-[#884BFF] via-[#AA6AF7] to-[#4DE1D3] text-white shadow-[0_15px_45px_rgba(136,75,255,0.35)] focus-visible:outline-[#884BFF] button-glow-animate",
  ghost:
    "bg-transparent text-white/80 hover:text-white border border-white/10 backdrop-blur focus-visible:outline-white/40",
  soft:
    "bg-white/5 text-white hover:bg-white/10 border border-white/10 focus-visible:outline-white/30",
};

export function Button({ variant = "primary", className, href, children, ...props }: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
