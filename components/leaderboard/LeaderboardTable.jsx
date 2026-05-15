import { Card } from "@/components/shared/Card";
import { Avatar } from "@/components/shared/Avatar";
import { Trophy, Medal, Award } from "lucide-react";

export function LeaderboardTable({ users }) {
  if (!users) return null;

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-zinc-300" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="font-bold text-zinc-500 w-5 text-center">{rank}</span>;
    }
  };

  return (
    <Card className="overflow-hidden p-0 border-neutral-800 bg-neutral-900/30">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-neutral-300">
          <thead className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 border-b border-neutral-800">
            <tr>
              <th scope="col" className="px-6 py-4">Rank</th>
              <th scope="col" className="px-6 py-4">User</th>
              <th scope="col" className="px-6 py-4 text-right">Points</th>
              <th scope="col" className="px-6 py-4 text-center hidden sm:table-cell">W - L</th>
              <th scope="col" className="px-6 py-4 text-center hidden md:table-cell">Games</th>
              <th scope="col" className="px-6 py-4 text-center hidden md:table-cell">Streak</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr 
                key={user.user} 
                className="border-b border-neutral-800/50 hover:bg-white/5 transition-colors last:border-0"
              >
                <td className="px-6 py-4">
                  {getRankIcon(user.rank)}
                </td>
                <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                  <Avatar fallback={user.user.charAt(0)} size="sm" />
                  {user.user}
                </td>
                <td className="px-6 py-4 text-right font-bold text-white">
                  {user.points}
                </td>
                <td className="px-6 py-4 text-center hidden sm:table-cell">
                  <span className="text-green-400">{user.wins}</span> 
                  <span className="text-zinc-600 mx-1">/</span> 
                  <span className="text-red-400">{user.losses}</span>
                </td>
                <td className="px-6 py-4 text-center hidden md:table-cell">
                  {user.games}
                </td>
                <td className="px-6 py-4 text-center hidden md:table-cell">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-neutral-800 text-neutral-300">
                    <FlameIcon className="w-3 h-3 mr-1" /> {user.bestStreak}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function FlameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}
