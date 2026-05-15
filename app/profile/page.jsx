"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { RecentGames } from "@/components/profile/RecentGames";
import { getProfile } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const data = await getProfile();

        setProfile(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (error) {
    throw error;
  }

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
      <div className="flex flex-col w-full max-w-4xl mx-auto">
        <ProfileStats user={profile?.user} stats={profile?.stats} />
        <RecentGames games={profile?.recent} />

        <div className="mt-12 flex justify-center border-t border-neutral-800 pt-8">
          <Button
            variant="danger"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="gap-2 text-[10px] uppercase font-bold tracking-widest px-6 shadow-none"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
