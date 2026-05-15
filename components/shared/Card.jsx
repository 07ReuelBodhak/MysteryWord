import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }) {
  return (
    <div 
      className={cn("bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 shadow-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
}
