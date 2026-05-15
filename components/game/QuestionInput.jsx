"use client";

import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { Send, Loader2 } from "lucide-react";

export function QuestionInput({ onSubmit, disabled }) {
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || disabled || isSubmitting) return;

    setIsSubmitting(true);
    await onSubmit(question.trim());
    setQuestion("");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={disabled || isSubmitting}
        placeholder="Ask a Yes/No question..."
        className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-4 px-6 pr-24 text-sm focus:outline-none focus:border-white transition-all text-white placeholder-neutral-500 disabled:opacity-50"
      />
      <button 
        type="submit" 
        disabled={disabled || isSubmitting || !question.trim()}
        className="absolute right-2 top-2 bottom-2 px-6 bg-white text-black text-xs font-bold rounded-full uppercase disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ask AI"}
      </button>
    </form>
  );
}
