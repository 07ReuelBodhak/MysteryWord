import { cn } from "@/lib/utils";

export function Button({ variant = "primary", size = "md", className, children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase transition-colors focus:outline-none shadow-lg shadow-white/5 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-white text-black hover:bg-neutral-200",
    secondary: "bg-transparent text-white border border-neutral-700 hover:border-white italic",
    ghost: "bg-transparent text-white hover:bg-neutral-800",
    danger: "bg-red-950 text-red-200 border border-red-900 hover:bg-red-900"
  };

  const sizes = {
    sm: "h-8 px-4 text-[10px] rounded-full",
    md: "h-10 px-6 text-xs rounded-full",
    lg: "h-14 px-8 text-sm rounded-xl"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
