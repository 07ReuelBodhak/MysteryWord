"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function GameTimer({ durationSeconds, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onExpire) onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isLow = timeLeft <= 30;

  return (
    <div className={`flex items-center gap-2 font-mono text-4xl font-black italic tracking-tighter ${isLow ? 'text-red-500 animate-pulse' : 'text-white'}`}>
      <Clock className="w-6 h-6" />
      {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
    </div>
  );
}
