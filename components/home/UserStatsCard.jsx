import { Card } from "@/components/shared/Card";
import { Avatar } from "@/components/shared/Avatar";
import { Trophy, Flame, Target } from "lucide-react";

export function UserStatsCard({ user }) {
  if (!user) return null;

  return (
    <Card className="flex flex-col gap-6 bg-neutral-900/30">
      <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Your Stats</h3>
      <div className="flex items-center gap-4">
        <Avatar src={user.avatarUrl} fallback={user.avatar} size="lg" className="border-neutral-700 bg-neutral-800" />
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white mb-1">{user.username}</h2>
          <p className="text-neutral-400 text-sm">{user.points} Points</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
        <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 flex flex-col justify-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-1 flex items-center gap-1.5"><Trophy className="w-3 h-3" /> Wins</p>
          <p className="text-xl font-bold text-white">{user.wins}</p>
        </div>
        <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 flex flex-col justify-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-1 flex items-center gap-1.5"><Flame className="w-3 h-3" /> Streak</p>
          <p className="text-xl font-bold text-white">{user.bestStreak}</p>
        </div>
        <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 flex flex-col justify-center col-span-2 sm:col-span-1">
          <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-1 flex items-center gap-1.5"><Target className="w-3 h-3" /> Games</p>
          <p className="text-xl font-bold text-white">{user.games}</p>
        </div>
      </div>
    </Card>
  );
}
