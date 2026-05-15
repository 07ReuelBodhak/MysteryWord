"use client";

import { useState } from "react";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { MessageCircle, Send } from "lucide-react";

export function SpectatorChat({ messages, onSendMessage }) {
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    onSendMessage(msg.trim().substring(0, 80));
    setMsg("");
  };

  return (
    <Card className="h-full flex flex-col max-h-[500px]">
      <div className="flex justify-between items-center mb-4 sticky top-0 pb-2 z-10 border-b border-neutral-800">
        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
          Spectator Chat
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2 custom-scrollbar flex flex-col-reverse text-[11px] italic">
        {[...messages].reverse().map((m, i) => (
          <p key={i} className="text-neutral-400 break-words">
            <span className="font-bold text-neutral-500 not-italic mr-2">{m.sender}:</span>
            {m.text}
          </p>
        ))}
        {messages.length === 0 && (
          <p className="text-neutral-500 text-center my-4">No distractions yet. Send one!</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 pt-3 border-t border-neutral-800 flex gap-2">
        <input
          type="text"
          value={msg}
          maxLength={80}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Send distraction..."
          className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none"
        />
        <button 
          type="submit" 
          disabled={!msg.trim()}
          className="text-neutral-500 hover:text-white disabled:opacity-50 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </Card>
  );
}
