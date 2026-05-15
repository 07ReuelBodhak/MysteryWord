"use client";

import { motion, AnimatePresence } from "motion/react";

export function AIResponseSticker({ response }) {
  if (!response) {
    return (
      <div className="w-64 h-64 mx-auto flex flex-col items-center justify-center rounded-full border-4 border-dashed border-neutral-800 relative bg-black text-neutral-500">
        <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full"></div>
        <span className="text-4xl mb-3 z-10">💬</span>
        <p className="text-[10px] font-bold uppercase tracking-widest z-10 relative text-center px-4">Waiting for question...</p>
      </div>
    );
  }

  const variants = {
    "Yes": { color: "text-white", pulse: "animate-none", icon: "✅" },
    "No": { color: "text-white", pulse: "animate-none", icon: "❌" },
    "Maybe": { color: "text-white", pulse: "animate-pulse", icon: "🤔" }
  };

  const style = variants[response] || variants["Maybe"];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={response + Date.now()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={`w-64 h-64 mx-auto flex flex-col items-center justify-center rounded-full border-4 border-dashed border-neutral-800 relative bg-black`}
      >
        <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full"></div>
        <span className={`text-5xl font-black italic tracking-tighter z-10 ${style.pulse} mb-2`}>
          {response.toUpperCase()}
        </span>
        <span className="text-4xl z-10">{style.icon}</span>
      </motion.div>
    </AnimatePresence>
  );
}
