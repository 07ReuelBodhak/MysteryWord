"use client";

import { useState } from "react";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { startGame } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Loader2, Play } from "lucide-react";

export function StartGameCard({ className }) {
  const [isStarting, setIsStarting] = useState(false);
  const router = useRouter();

  const handleStart = async () => {
    setIsStarting(true);
    const result = await startGame();
    router.push(`/game/${result.sessionId}`);
  };

  return (
    <Card
      className={`flex flex-col items-center justify-center text-center p-8 border-neutral-800 bg-neutral-900/30 ${className}`}
    >
      <Button
        size="lg"
        onClick={handleStart}
        disabled={isStarting}
        className="w-full py-4 cursor-pointer bg-white text-black font-black uppercase text-sm rounded-xl hover:bg-neutral-200 transition-colors shadow-lg shadow-white/5 h-auto leading-normal"
      >
        {isStarting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
        Start New Game
      </Button>
    </Card>
  );
}
