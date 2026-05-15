import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { BrainCircuit, Lightbulb, Trophy, Timer } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 z-10 flex flex-col items-center justify-center text-center py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-neutral-400 mb-8 uppercase tracking-widest">
          <BrainCircuit className="w-3 h-3" />
          <span>AI-Powered Deduction</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 uppercase italic leading-none">
          Guess the hidden word <br className="hidden md:block" />
          <span className="text-neutral-600 block mt-4 text-4xl md:text-6xl">before time runs out.</span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10">
          The AI knows the secret. You only get to ask yes or no questions. Track the responses, narrow it down, and make your final guess.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8">
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" className="w-full text-xs px-8 uppercase italic font-black shadow-lg shadow-white/5">
              Login with Discord
            </Button>
          </Link>
          <Link href="/home" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full text-xs px-8 border-neutral-700">
              View Demo
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-24 text-left w-full max-w-4xl border-t border-neutral-800 pt-16">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-neutral-800">
              <Lightbulb className="w-4 h-4 text-neutral-400" />
            </div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest">Ask Smart Questions</h3>
            <p className="text-xs text-neutral-500 font-medium">Narrow down the possibilities logically.</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-neutral-800">
              <BrainCircuit className="w-4 h-4 text-neutral-400" />
            </div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest">Read AI Answers</h3>
            <p className="text-xs text-neutral-500 font-medium">It only says Yes, No, or Maybe.</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-neutral-800">
              <Timer className="w-4 h-4 text-neutral-400" />
            </div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest">Beat the Clock</h3>
            <p className="text-xs text-neutral-500 font-medium">Guess before the 5-minute timer ends.</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-neutral-800">
              <Trophy className="w-4 h-4 text-neutral-400" />
            </div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest">Climb Leaderboards</h3>
            <p className="text-xs text-neutral-500 font-medium">Earn points for fast and correct guesses.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
