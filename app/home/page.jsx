"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

import { PageShell } from "@/components/layout/PageShell";
import { UserStatsCard } from "@/components/home/UserStatsCard";
import { StartGameCard } from "@/components/home/StartGameCard";
import { ActiveSessionsList } from "@/components/home/ActiveSessionsList";
import { LeaderboardPreview } from "@/components/home/LeaderboardPreview";

import {
  getLeaderboardStats,
  getActiveSessions,
  getLeaderboard,
} from "@/lib/api";

export default function HomePage() {
  const { data: session, status } = useSession();

  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  // Only for first page load
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // Wait until NextAuth finishes checking session
      if (status === "loading") return;

      // No logged in user
      if (!session?.user?.discord_id) {
        setInitialLoading(false);
        return;
      }

      try {
        const [userData, sessionsData, lbData] = await Promise.all([
          getLeaderboardStats(session.user.discord_id),
          getActiveSessions(),
          getLeaderboard(),
        ]);

        console.log("User data:", userData);
        console.log("Sessions data:", sessionsData);
        console.log("Leaderboard data:", lbData);

        setUser(userData);
        setSessions(sessionsData);
        setLeaderboard(lbData);
      } catch (error) {
        console.error("Failed to load home data:", error);
      } finally {
        // Only disable initial loader once
        setInitialLoading(false);
      }
    }

    loadData();
  }, [session?.user?.discord_id, status]);

  if (initialLoading) {
    return (
      <PageShell>
        <div className="flex h-full flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Side */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <UserStatsCard user={user} />
          <ActiveSessionsList sessions={sessions} />
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-6">
          <StartGameCard
            discord_id={session?.user?.discord_id}
            username={session?.user?.username}
          />
          <LeaderboardPreview leaderboard={leaderboard} />
        </div>
      </div>
    </PageShell>
  );
}
