"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function FloatingBubble({ messages }) {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    if (messages.length === 0) return;

    const lastMsg = messages[messages.length - 1];

    console.log("LAST MESSAGE:", lastMsg);

    const newBubble = {
      id: Date.now() + Math.random(),

      // FIXED
      text: lastMsg.message,

      sender: lastMsg.sender,

      x: Math.random() * 60 + 20,

      duration: Math.random() * 3 + 4,
    };

    setBubbles((prev) => [...prev, newBubble]);

    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
    }, newBubble.duration * 1000);
  }, [messages]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            initial={{
              opacity: 0,
              y: "100vh",
              x: `${b.x}vw`,
              scale: 0.5,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: "-10vh",
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: b.duration,
              ease: "linear",
            }}
            className="
              absolute
              max-w-xs
              break-words
              rounded-2xl
              border
              border-zinc-700
              bg-zinc-800
              p-3
              text-sm
              font-medium
              text-white
              shadow-xl
            "
          >
            <div className="mb-1 text-xs text-zinc-400">{b.sender}</div>

            <div>{b.text}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
