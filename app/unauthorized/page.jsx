"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { Lock } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden font-sans p-4">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <main className="z-10 flex flex-col items-center text-center max-w-lg w-full bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-10 shadow-2xl">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center border-4 border-dashed border-red-900/50 mb-6 shadow-lg shadow-white/5 relative">
          <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl"></div>
          <Lock className="w-10 h-10 text-red-500 relative z-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white mb-3 uppercase italic">
          Access Denied
        </h1>

        <p className="text-neutral-400 font-medium mb-10 text-sm max-w-sm">
          You do not have permission to view this page. Please log in or return
          to the previous page.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.back()}
            className="w-full sm:w-auto sm:min-w-[160px]"
          >
            Go Back
          </Button>

          <Button
            variant="primary"
            size="lg"
            className="w-full px-0 py-0 text-xs sm:w-auto sm:min-w-[160px]"
          >
            <Link
              href="/login"
              className="flex items-center justify-center w-full h-full px-8 py-3"
            >
              Login
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
