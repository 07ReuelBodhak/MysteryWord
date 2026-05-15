import { Card } from "@/components/shared/Card";
import { Avatar } from "@/components/shared/Avatar";
import Link from "next/link";
import { Trophy } from "lucide-react";

export function LeaderboardPreview({ leaderboard }) {
  if (!leaderboard) return null;

  return (
    <Card className="flex flex-col gap-6 bg-neutral-900/30">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
           Leaderboard
        </h3>
        <Link href="/leaderboard" className="text-[10px] font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-widest bg-neutral-900 rounded px-2 py-1">
          View All
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {leaderboard.slice(0, 3).map((user, idx) => (
          <div key={user.user} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 font-bold w-4 text-sm">{idx + 1}</span>
              <Avatar fallback={user.user.charAt(0)} size="sm" className="w-8 h-8 rounded-full bg-neutral-800 border-neutral-700 font-bold" />
              <span className="font-semibold text-white text-sm truncate">{user.user}</span>
            </div>
            <span className="font-bold text-sm text-white flex flex-col items-end leading-none">
              {user.points}
              <span className="text-[10px] text-neutral-500 uppercase">pts</span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
