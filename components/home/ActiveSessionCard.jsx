import { Card } from "@/components/shared/Card";
import { Avatar } from "@/components/shared/Avatar";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import Link from "next/link";
import { Clock, HelpCircle, Users } from "lucide-react";

export function ActiveSessionCard({ session }) {
  // Difficulty colors mapping
  const diffMap = {
    "Easy": "easy",
    "Medium": "medium",
    "Hard": "hard"
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 mb-3 hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <div>
          <span className="text-sm font-medium text-white block leading-none mb-1">{session.username}'s Game</span>
          <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">{session.difficulty} • {session.questions} Qs</span>
        </div>
      </div>
      
      <Link href={`/game/${session.id}`}>
        <span className="text-[10px] px-3 py-1 font-bold rounded bg-neutral-800 hover:bg-neutral-700 text-white uppercase tracking-widest transition-colors">
          Watch
        </span>
      </Link>
    </div>
  );
}
