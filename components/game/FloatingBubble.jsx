"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function FloatingBubble({ messages }) {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    
    const newBubble = {
      id: Date.now() + Math.random(),
      text: lastMsg.text,
      x: Math.random() * 60 + 20, // 20% to 80% width
      duration: Math.random() * 3 + 4, // 4 to 7 seconds
    };

    setBubbles((prev) => [...prev, newBubble]);

    setTimeout(() => {
      setBubbles((prev) => prev.filter(b => b.id !== newBubble.id));
    }, newBubble.duration * 1000);
  }, [messages]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {bubbles.map(b => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: "100vh", x: `${b.x}vw`, scale: 0.5 }}
            animate={{ opacity: [0, 1, 1, 0], y: "-10vh", scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: b.duration, ease: "linear" }}
            className="absolute p-3 rounded-2xl bg-zinc-800 text-white shadow-xl border border-zinc-700 max-w-xs break-words font-medium text-sm"
          >
            {b.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
