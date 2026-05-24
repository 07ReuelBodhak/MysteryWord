"use client";

import { motion } from "motion/react";
import { Button } from "@/components/shared/Button";
import { useRouter } from "next/navigation";
import { Trophy, Frown } from "lucide-react";

export function GameResultModal({ result, word, onPlayAgain }) {
  const router = useRouter();

  if (!result) return null;

  const isWin = result === "win";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-black border border-neutral-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl shadow-white/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-neutral-900/30"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex justify-center mb-6">
            {isWin ? (
              <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                <Trophy className="w-10 h-10" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-red-950/50 flex items-center justify-center border-4 border-dashed border-red-900">
                <Frown className="w-10 h-10 text-red-500" />
              </div>
            )}
          </div>

          <h2
            className={`text-4xl font-black mb-2 uppercase tracking-tight italic ${isWin ? "text-white" : "text-red-500"}`}
          >
            {isWin ? "You Won!" : "Game Over"}
          </h2>

          <div className="bg-white/5 rounded-2xl p-6 py-8 w-full border border-white/10 my-6 flex flex-col items-center justify-center gap-2">
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
              The word was
            </p>
            <p className="text-5xl font-black text-white uppercase tracking-tighter">
              {word}
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full mt-2">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => router.push("/home")}
              className="w-full text-neutral-500"
            >
              Return Home
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
