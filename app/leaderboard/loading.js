import { PageShell } from "@/components/layout/PageShell";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <PageShell>
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center gap-5 border-b border-neutral-800 pb-8 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-lg shadow-white/5" />
          <div className="flex flex-col gap-2">
            <div className="h-10 bg-neutral-800 rounded-md w-64" />
            <div className="h-4 bg-neutral-900 rounded-md w-48" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/30">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-neutral-800">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <div className="w-10 h-3 bg-neutral-900 rounded-full" />
                  </th>
                  <th scope="col" className="px-6 py-4">
                    <div className="w-16 h-3 bg-neutral-900 rounded-full" />
                  </th>
                  <th scope="col" className="px-6 py-4 flex justify-end">
                    <div className="w-16 h-3 bg-neutral-900 rounded-full border-r-0" />
                  </th>
                  <th scope="col" className="px-6 py-4 hidden sm:table-cell">
                    <div className="w-12 h-3 bg-neutral-900 rounded-full mx-auto" />
                  </th>
                  <th scope="col" className="px-6 py-4 hidden md:table-cell">
                    <div className="w-12 h-3 bg-neutral-900 rounded-full mx-auto" />
                  </th>
                  <th scope="col" className="px-6 py-4 hidden md:table-cell">
                    <div className="w-12 h-3 bg-neutral-900 rounded-full mx-auto" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(8)].map((_, i) => (
                  <tr
                    key={i}
                    className="border-b border-neutral-800/50 last:border-0"
                  >
                    <td className="px-6 py-4">
                      <div className="w-6 h-6 bg-neutral-900 rounded-md" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-900 shrink-0" />
                        <div className="h-4 w-24 bg-neutral-800 rounded-md" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <div className="h-5 w-16 bg-neutral-800 rounded" />
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="h-4 w-12 bg-neutral-900 rounded mx-auto" />
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="h-4 w-8 bg-neutral-900 rounded mx-auto" />
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="h-5 w-12 bg-neutral-800 rounded-md mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-neutral-500 font-bold uppercase tracking-widest text-[10px]">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading leaderboard...
          </div>
        </div>
      </div>
    </PageShell>
  );
}
