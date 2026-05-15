import { LoginButton } from "@/components/auth/LoginButton";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-white font-black tracking-tighter uppercase italic"
      >
        <Gamepad2 className="w-6 h-6" />
        <span className="text-xl">GuessArena</span>
      </Link>

      <div className="w-full max-w-md bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center z-10">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center border border-neutral-800 mb-6 shadow-lg shadow-white/5">
          <Gamepad2 className="w-6 h-6 text-white" />
        </div>

        <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-neutral-400 text-sm mb-8 font-medium">
          Sign in with Discord to continue your guessing streak and climb the
          leaderboard.
        </p>

        <LoginButton />

        <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest mt-8 px-4">
          By logging in, you agree to the rules of the arena. No cheating!
        </p>
      </div>
    </div>
  );
}
