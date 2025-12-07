"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

type SignInFormProps = {
  users: DemoUser[];
};

type StatusState = {
  type: "success" | "error";
  message: string;
};

export function SignInForm({ users }: SignInFormProps) {
  const [status, setStatus] = useState<StatusState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "").trim();

    const match = users.find(
      (user) => user.email.toLowerCase() === email && user.password === password
    );

    if (match) {
      setStatus({
        type: "success",
        message: `Welcome back, ${match.name}. Redirecting...`,
      });
      
      // Use the auth context sign in method
      setTimeout(() => {
        signIn(match);
      }, 500);
    } else {
      setStatus({
        type: "error",
        message: "No account matched these credentials. Try one of the demo users below.",
      });
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <label className="block space-y-2 text-left text-sm text-white/70">
        <span className="text-xs uppercase tracking-[0.3em] text-white/50">Email</span>
        <input
          name="email"
          type="email"
          required
          className="w-full rounded-2xl border border-white/10 bg-[#0C111D] px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
          placeholder="you@vesita.dev"
        />
      </label>
      <label className="block space-y-2 text-left text-sm text-white/70">
        <span className="text-xs uppercase tracking-[0.3em] text-white/50">Password</span>
        <input
          name="password"
          type="password"
          required
          className="w-full rounded-2xl border border-white/10 bg-[#0C111D] px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
          placeholder="Secure passphrase"
        />
      </label>
      <div className="flex items-center justify-between text-xs text-white/60">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4 rounded border border-white/20 bg-transparent" />
          Keep me signed in
        </label>
        <a href="#" className="text-[#4DE1D3] hover:text-white">
          Forgot password?
        </a>
      </div>
      {status && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm transition-all ${
            status.type === "success"
              ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
              : "border-rose-400/40 bg-rose-500/10 text-rose-200"
          }`}
        >
          {status.message}
        </div>
      )}
      <Button type="submit" disabled={isLoading} className="w-full py-3 text-base">
        {isLoading ? "Signing in..." : "Continue"}
      </Button>
    </form>
  );
}
