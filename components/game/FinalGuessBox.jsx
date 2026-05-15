"use client";

import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { Loader2 } from "lucide-react";

export function FinalGuessBox({ onSubmit, disabled }) {
  const [guess, setGuess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guess.trim() || disabled || isSubmitting) return;

    setIsSubmitting(true);
    await onSubmit(guess.trim());
    setGuess("");
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 text-center">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={disabled || isSubmitting}
          placeholder="Enter the hidden word..."
          className="w-full bg-transparent border-b-2 border-dashed border-neutral-800 px-4 py-4 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-all text-center uppercase tracking-widest font-bold disabled:opacity-50"
        />
        <div className="mt-6 flex justify-center">
          <button 
            type="submit" 
            disabled={disabled || isSubmitting || !guess.trim()}
            className="px-8 py-2 border border-neutral-700 rounded-full text-xs font-bold hover:border-white transition-colors uppercase italic disabled:opacity-50 flex items-center gap-2 text-white"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Submit Final Guess
          </button>
        </div>
      </form>
    </div>
  );
}
