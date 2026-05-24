// components/profile/RecentGames.jsx

"use client";

import { Card } from "@/components/shared/Card";

import { Badge } from "@/components/shared/Badge";

import { EmptyState } from "@/components/shared/EmptyState";

export function RecentGames({ games }) {
  console.log("games : ", games);
  // =========================
  // EMPTY STATE
  // =========================

  if (!games || games.length === 0) {
    return (
      <div className="mt-8 flex flex-col gap-4 border-t border-neutral-800 pt-8">
        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">
          Recent Games
        </h3>

        <EmptyState
          title="No recent games"
          description="Play a game to see your history."
        />
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="mt-8 flex flex-col gap-4 border-t border-neutral-800 pt-8">
      <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">
        Recent Games
      </h3>

      <div className="flex flex-col gap-3">
        {games.map((game) => {
          const formattedDate = new Date(
            game.played_at * 1000,
          ).toLocaleDateString();

          return (
            <Card
              key={game._id}
              className="flex items-center justify-between p-4 bg-transparent border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded flex items-center justify-center font-black text-xl italic ${
                    game.result === "win"
                      ? "bg-white text-black"
                      : "bg-transparent text-neutral-500 border border-neutral-800"
                  }`}
                >
                  {game.result === "win" ? "W" : "L"}
                </div>

                <div>
                  <p className="font-bold text-white text-sm sm:text-base uppercase tracking-widest leading-none mb-1">
                    {game.word.length} LTR
                  </p>

                  <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
                    WORD: {game.word}
                  </p>

                  <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest">
                    {formattedDate}
                  </p>
                </div>
              </div>

              <Badge variant={game.difficulty?.toLowerCase() || "medium"}>
                {game.difficulty}
              </Badge>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
