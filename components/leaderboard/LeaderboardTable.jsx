import { Card } from "@/components/shared/Card";
import { Avatar } from "@/components/shared/Avatar";
import { Trophy, Medal, Award } from "lucide-react";

export function LeaderboardTable({ users }) {
  console.log("Rendering LeaderboardTable with users:", users);

  if (!users || users.length === 0) {
    return (
      <Card className="border-neutral-800 bg-neutral-900/30 p-8 text-center">
        <p className="text-sm text-neutral-400">No leaderboard data found.</p>
      </Card>
    );
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-zinc-300" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return (
          <span className="w-5 text-center font-bold text-zinc-500">
            {rank}
          </span>
        );
    }
  };

  return (
    <Card className="overflow-hidden border-neutral-800 bg-neutral-900/30 p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-neutral-300">
          <thead className="border-b border-neutral-800 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">
                Rank
              </th>

              <th scope="col" className="px-6 py-4">
                User
              </th>

              <th scope="col" className="px-6 py-4 text-right">
                Points
              </th>

              <th
                scope="col"
                className="hidden px-6 py-4 text-center sm:table-cell"
              >
                W - L
              </th>

              <th
                scope="col"
                className="hidden px-6 py-4 text-center md:table-cell"
              >
                Games
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              const rank = index + 1;

              return (
                <tr
                  key={user._id || user.discord_id || rank}
                  className="border-b border-neutral-800/50 transition-colors last:border-0 hover:bg-white/5"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getRankIcon(rank)}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 font-medium text-white">
                      <Avatar
                        src={user.avatar_url}
                        fallback={user.username?.[0]?.toUpperCase() || "U"}
                        size="sm"
                      />

                      <div className="flex flex-col">
                        <span>{user.username || "Unknown User"}</span>

                        <span className="text-[10px] text-neutral-500">
                          {user.discord_id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right font-bold text-white">
                    {user.total_points ?? 0}
                  </td>

                  <td className="hidden px-6 py-4 text-center sm:table-cell">
                    <span className="text-green-400">{user.wins ?? 0}</span>
                    <span className="mx-1 text-zinc-600">/</span>
                    <span className="text-red-400">{user.losses ?? 0}</span>
                  </td>

                  <td className="hidden px-6 py-4 text-center md:table-cell">
                    {user.games_played ?? 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
