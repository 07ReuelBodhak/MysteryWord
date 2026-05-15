import { Badge } from "@/components/shared/Badge";
import { Users } from "lucide-react";

export function GameHeader({ session, isPlayer }) {
  if (!session) return null;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b border-neutral-800 bg-transparent mb-4">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
          {isPlayer ? "Active Session" : "Spectating Session"}
        </h1>
        <p className="text-sm text-neutral-500 mt-2">
          Difficulty: <span className="text-white">{session.difficulty}</span> • Target length: <span className="text-white">{session.wordLength}</span>
        </p>
      </div>

      {!isPlayer && (
        <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest bg-neutral-900 px-4 py-2 rounded-full border border-neutral-800">
          <Users className="w-4 h-4" />
          <span>{Math.floor(Math.random() * 20) + 1} watching</span>
        </div>
      )}
    </div>
  );
}
