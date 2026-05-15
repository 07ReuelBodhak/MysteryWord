"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { UserStatsCard } from "@/components/home/UserStatsCard";
import { StartGameCard } from "@/components/home/StartGameCard";
import { ActiveSessionsList } from "@/components/home/ActiveSessionsList";
import { LeaderboardPreview } from "@/components/home/LeaderboardPreview";
import { getCurrentUser, getActiveSessions, getLeaderboard } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [userData, sessionsData, lbData] = await Promise.all([
          getCurrentUser(),
          getActiveSessions(),
          getLeaderboard()
        ]);
        setUser(userData);
        setSessions(sessionsData);
        setLeaderboard(lbData);
      } catch (error) {
        console.error("Failed to load home data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <PageShell>
        <div className="flex items-center justify-center h-full flex-1">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <UserStatsCard user={user} />
          <ActiveSessionsList sessions={sessions} />
        </div>
        <div className="flex flex-col gap-6">
          <StartGameCard />
          <LeaderboardPreview leaderboard={leaderboard} />
        </div>
      </div>
    </PageShell>
  );
}
