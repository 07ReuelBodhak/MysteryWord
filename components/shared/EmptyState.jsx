import { cn } from "@/lib/utils";
import { FolderX } from "lucide-react";

export function EmptyState({ title, description, icon: Icon = FolderX, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-950/50 text-zinc-500", className)}>
      <Icon className="w-8 h-8 mb-3 opacity-50" />
      <h3 className="text-sm font-medium text-zinc-300 mb-1">{title}</h3>
      {description && <p className="text-xs">{description}</p>}
    </div>
  );
}
