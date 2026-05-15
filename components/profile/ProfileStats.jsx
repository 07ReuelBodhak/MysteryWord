import { Card } from "@/components/shared/Card";
import { Avatar } from "@/components/shared/Avatar";
import { Trophy, Target, PieChart, Activity } from "lucide-react";

export function ProfileStats({ user }) {
  if (!user) return null;

  const winRate = user.games > 0 ? Math.round((user.wins / user.games) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-center gap-6 p-8 border-b border-neutral-800 mb-6">
        <Avatar fallback={user.avatar} size="xl" className="border-neutral-700 bg-neutral-800" />
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase italic">{user.username}</h1>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            Rank #{user.rank || 'N/A'} • {user.points} pts
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox icon={Trophy} label="Wins" value={user.wins} />
        <StatBox icon={Target} label="Games Played" value={user.games} />
        <StatBox icon={PieChart} label="Win Rate" value={`${winRate}%`} />
        <StatBox icon={Activity} label="Best Streak" value={user.bestStreak} />
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value }) {
  return (
    <Card className="flex flex-col flex-1 shadow-lg shadow-white/5 bg-transparent border-neutral-800 py-10 items-center justify-center text-center relative overflow-hidden">
      <span className="text-5xl font-black uppercase italic tracking-tighter text-white mb-2 relative z-10">{value}</span>
      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest relative z-10">{label}</span>
      <div className="absolute top-4 right-4 text-neutral-800 z-0">
        <Icon className="w-16 h-16 opacity-10" />
      </div>
    </Card>
  );
}
