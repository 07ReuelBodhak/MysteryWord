"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/shared/Button";
import { AlertOctagon, RefreshCcw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center h-full flex-1 w-full max-w-lg mx-auto text-center px-4">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center border-4 border-dashed border-red-900/50 mb-6 shadow-lg shadow-white/5 relative">
          <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl"></div>
          <AlertOctagon className="w-10 h-10 text-red-500 relative z-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white mb-3 uppercase italic">
          Something went wrong
        </h1>

        <p className="text-neutral-400 font-medium mb-10 text-sm max-w-sm">
          We encountered an issue while loading your profile data. Please try
          again or return to the dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => reset()}
            className="w-full sm:w-auto sm:min-w-[160px] gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Try again
          </Button>

          <Button
            variant="primary"
            size="lg"
            className="w-full px-0 py-0 text-xs sm:w-auto sm:min-w-[160px]"
          >
            <Link
              href="/home"
              className="flex items-center justify-center w-full h-full px-8 py-3"
            >
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
