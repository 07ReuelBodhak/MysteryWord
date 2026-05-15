import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden font-sans p-4">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <main className="z-10 flex flex-col items-center text-center max-w-lg w-full">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center border border-neutral-800 mb-6 shadow-lg shadow-white/5">
          <SearchX className="w-8 h-8 text-neutral-400" />
        </div>

        <h1 className="text-8xl md:text-[120px] font-black tracking-tighter text-white mb-2 uppercase italic leading-none">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-neutral-400 mb-4">
          Page not found
        </h2>

        <p className="text-neutral-500 font-medium mb-10 text-lg">
          This route disappeared before you could guess it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
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

          <Button
            variant="secondary"
            size="lg"
            className="w-full px-0 py-0 text-xs border-neutral-700 sm:w-auto sm:min-w-[160px]"
          >
            <Link
              href="/"
              className="flex items-center justify-center w-full h-full px-8 py-3"
            >
              Back to Start
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
