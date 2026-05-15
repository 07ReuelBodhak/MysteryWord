import { ActiveSessionCard } from "./ActiveSessionCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Activity } from "lucide-react";

export function ActiveSessionsList({ sessions }) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="mt-6 flex flex-col gap-4">
      <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">
        Active Sessions
      </h3>
        <EmptyState 
          title="No Active Games" 
          description="Start a game and be the first to play right now." 
        />
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">
        Active Sessions
      </h3>
      <div className="space-y-3">
        {sessions.map(session => (
          <ActiveSessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}
