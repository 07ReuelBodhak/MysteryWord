import { cn } from "@/lib/utils";

export function Avatar({ src, fallback, size = "md", className }) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl"
  };

  return (
    <div className={cn("relative flex items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0 text-white font-medium", sizes[size], className)}>
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <span>{fallback || "?"}</span>
      )}
    </div>
  );
}
