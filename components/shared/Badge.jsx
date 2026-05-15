import { cn } from "@/lib/utils";

export function Badge({ variant = "active", children, className }) {
  const variants = {
    easy: "bg-zinc-800 text-zinc-300 border border-zinc-700",
    medium: "bg-zinc-800 text-white border border-zinc-600",
    hard: "bg-zinc-950 text-white border border-zinc-500",
    active: "bg-green-950/30 text-green-400 border border-green-900/50",
    won: "bg-zinc-100 text-zinc-900 font-bold",
    lost: "bg-zinc-900 text-zinc-500 border border-zinc-800"
  };

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
