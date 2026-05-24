"use client";

import { useEffect, useRef, useState } from "react";

import { Clock } from "lucide-react";

export function GameTimer({ initialSeconds, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  /*
    PREVENT MULTIPLE EXPIRE CALLS
  */

  const expiredRef = useRef(false);

  /*
    RESET TIMER
  */

  useEffect(() => {
    setTimeLeft(initialSeconds);

    expiredRef.current = false;
  }, [initialSeconds]);

  /*
    COUNTDOWN
  */

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!expiredRef.current) {
        expiredRef.current = true;

        onExpire?.();
      }

      return;
    }

    const timeout = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timeLeft, onExpire]);

  /*
    FORMAT
  */

  const mins = Math.floor(timeLeft / 60);

  const secs = timeLeft % 60;

  const isLow = timeLeft <= 30;

  return (
    <div
      className={`
        flex items-center gap-2
        font-mono text-4xl
        font-black italic
        tracking-tighter
        ${isLow ? "text-red-500 animate-pulse" : "text-white"}
      `}
    >
      <Clock className="h-6 w-6" />

      <span>
        {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
