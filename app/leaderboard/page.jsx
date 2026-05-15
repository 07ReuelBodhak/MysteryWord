"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { getLeaderboard } from "@/lib/api";
import { Loader2, Trophy } from "lucide-react";

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getLeaderboard();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <PageShell>
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-5 border-b border-neutral-800 pb-8 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-black border border-neutral-800 flex items-center justify-center shadow-lg shadow-white/5">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
              Leaderboard
            </h1>
            <p className="text-neutral-500 text-sm font-medium">
              Top guessers in the arena.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
          </div>
        ) : (
          <LeaderboardTable users={users} />
        )}
      </div>
    </PageShell>
  );
}
