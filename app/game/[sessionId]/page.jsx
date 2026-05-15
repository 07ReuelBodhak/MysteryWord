"use client";

import { use, useEffect, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { GameHeader } from "@/components/game/GameHeader";
import { GameTimer } from "@/components/game/GameTimer";
import { QuestionInput } from "@/components/game/QuestionInput";
import { AIResponseSticker } from "@/components/game/AIResponseSticker";
import { GuessHistory } from "@/components/game/GuessHistory";
import { FinalGuessBox } from "@/components/game/FinalGuessBox";
import { SpectatorChat } from "@/components/game/SpectatorChat";
import { FloatingBubble } from "@/components/game/FloatingBubble";
import { GameResultModal } from "@/components/game/GameResultModal";
import { getGameSession, askQuestion, submitFinalGuess, sendSpectatorMessage } from "@/lib/api";
import { mockGuessHistory } from "@/lib/dummyData";
import { subscribeToSession, sendMockEvent } from "@/lib/socketMock";
import { Loader2 } from "lucide-react";

export default function GamePage({ params }) {
  const { sessionId } = use(params);
  const [session, setSession] = useState(null);
  const [history, setHistory] = useState(mockGuessHistory);
  const [messages, setMessages] = useState([]);
  const [latestResponse, setLatestResponse] = useState(null);
  const [result, setResult] = useState(null); // 'win', 'loss'
  const [correctWord, setCorrectWord] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const data = await getGameSession(sessionId);
        setSession(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    init();

    const unsubscribe = subscribeToSession(sessionId, (event) => {
      if (event.type === 'question_answered') {
        setHistory(prev => [...prev, { text: event.text, answer: event.answer }]);
        setLatestResponse(event.answer);
      } else if (event.type === 'spectator_message') {
        setMessages(prev => [...prev, { text: event.text, sender: event.sender }]);
      } else if (event.type === 'game_over') {
        setResult(event.result);
        setCorrectWord(event.word);
      }
    });

    return unsubscribe;
  }, [sessionId]);

  const handleQuestionSubmit = async (question) => {
    if (result) return;
    const answer = await askQuestion(sessionId, question);
    sendMockEvent(sessionId, { type: 'question_answered', text: question, answer });
  };

  const handleFinalGuess = async (guess) => {
    if (result) return;
    const res = await submitFinalGuess(sessionId, guess);
    if (res.isCorrect) {
      sendMockEvent(sessionId, { type: 'game_over', result: 'win', word: res.correctWord });
    } else {
      setHistory(prev => [...prev, { text: `Final guess: ${guess}`, answer: "No" }]);
      setLatestResponse("No");
    }
  };

  const handleTimerExpire = () => {
    if (result) return;
    sendMockEvent(sessionId, { type: 'game_over', result: 'loss', word: "mango" });
  };

  const handleSendMessage = async (msg) => {
    await sendSpectatorMessage(sessionId, msg);
    sendMockEvent(sessionId, { type: 'spectator_message', text: msg, sender: "SpectatorUser" });
  };

  if (loading) {
    return (
      <PageShell>
        <div className="flex items-center justify-center h-full flex-1">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
        </div>
      </PageShell>
    );
  }

  if (!session) {
    return (
      <PageShell>
        <div className="flex items-center justify-center h-full flex-1">
          <p className="text-zinc-500">Session not found.</p>
        </div>
      </PageShell>
    );
  }

  const isPlayer = session.isPlayer;

  return (
    <PageShell>
      <div className="flex flex-col h-full bg-transparent">
        <FloatingBubble messages={messages} />
        
        <div className="mb-4">
          <GameHeader session={session} isPlayer={isPlayer} />
          <div className="mt-4 flex justify-end">
            <GameTimer durationSeconds={session.durationSeconds} onExpire={handleTimerExpire} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* Main Area */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <AIResponseSticker response={latestResponse} />
            
            {isPlayer && (
              <div className="mt-auto flex flex-col gap-8 pb-8">
                <QuestionInput onSubmit={handleQuestionSubmit} disabled={!!result} />
                <FinalGuessBox onSubmit={handleFinalGuess} disabled={!!result} />
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="flex flex-col gap-6 h-full max-h-[700px]">
            <div className={isPlayer ? "h-full" : "h-1/2"}>
              <GuessHistory history={history} />
            </div>
            
            {!isPlayer && (
              <div className="h-1/2 min-h-0">
                <SpectatorChat messages={messages} onSendMessage={handleSendMessage} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <GameResultModal result={result} word={correctWord} onPlayAgain={() => window.location.href = '/home'} />
    </PageShell>
  );
}
