"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/shared/Button";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button
        size="lg"
        disabled
        className="w-full px-12 py-4 text-sm font-black uppercase italic shadow-lg shadow-white/5 sm:min-w-[260px]"
      >
        Loading...
      </Button>
    );
  }

  if (session?.user) {
    return (
      <Button
        size="lg"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="w-full px-12 py-4 text-sm font-black uppercase italic shadow-lg shadow-white/5 sm:min-w-[260px]"
      >
        Logout
      </Button>
    );
  }

  return (
    <Link href="/login" className="w-full sm:w-auto">
      <Button
        size="lg"
        className="w-full px-12 py-4 text-sm font-black uppercase italic shadow-lg shadow-white/5 sm:min-w-[260px]"
      >
        Login with Discord
      </Button>
    </Link>
  );
}
