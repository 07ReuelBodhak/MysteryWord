import { PageShell } from "@/components/layout/PageShell";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <PageShell>
      <div className="flex flex-col w-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-6 animate-pulse">
          {/* Profile Header Skeleton */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-8 border-b border-neutral-800 mb-6">
            <div className="w-24 h-24 rounded-full bg-neutral-800" />
            <div className="flex flex-col items-center sm:items-start gap-4 w-full max-w-xs">
              <div className="h-10 bg-neutral-800 rounded-md w-48" />
              <div className="h-6 bg-neutral-900 rounded-full w-32" />
            </div>
          </div>

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col flex-1 bg-transparent border border-neutral-800 py-10 items-center justify-center text-center relative overflow-hidden rounded-2xl min-h-[160px]"
              >
                <div className="w-16 h-12 bg-neutral-900 rounded-md mb-4" />
                <div className="w-24 h-4 bg-neutral-900 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Games Skeleton */}
        <div className="mt-8 flex flex-col gap-4 border-t border-neutral-800 pt-8 animate-pulse">
          <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4 w-32 h-4 bg-neutral-900 rounded-md" />
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-transparent border border-neutral-800 rounded-2xl h-[82px]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-neutral-900" />
                  <div className="flex flex-col gap-2">
                    <div className="w-32 h-4 bg-neutral-800 rounded" />
                    <div className="w-20 h-3 bg-neutral-900 rounded" />
                  </div>
                </div>
                <div className="w-16 h-6 bg-neutral-900 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-12 flex justify-center border-t border-neutral-800 pt-8">
          <div className="flex items-center gap-2 text-neutral-500 font-bold uppercase tracking-widest text-[10px]">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading profile...
          </div>
        </div>
      </div>
    </PageShell>
  );
}
