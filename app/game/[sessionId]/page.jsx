"use client";

import { use, useEffect, useRef, useState } from "react";

import { useSession } from "next-auth/react";

import { Loader2 } from "lucide-react";

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

import { getGameSession } from "@/lib/api";

import { createGameSocket } from "@/lib/socket";

export default function GamePage({ params }) {
  /*
    =========================================
    PARAMS
    =========================================
  */

  const { sessionId } = use(params);

  /*
    =========================================
    AUTH
    =========================================
  */

  const { data: authSession, status } = useSession();

  /*
    =========================================
    STATE
    =========================================
  */

  const [session, setSession] = useState(null);

  const [history, setHistory] = useState([]);

  const [messages, setMessages] = useState([]);

  const [latestResponse, setLatestResponse] = useState(null);

  const [result, setResult] = useState(null);

  const [correctWord, setCorrectWord] = useState("");

  const [loading, setLoading] = useState(true);

  const [socketReady, setSocketReady] = useState(false);

  /*
    =========================================
    REFS
    =========================================
  */

  const hasFetched = useRef(false);

  const socketRef = useRef(null);

  /*
    =========================================
    LOAD SESSION
    =========================================
  */

  useEffect(() => {
    if (status === "loading") return;

    const discordId = authSession?.user?.discord_id;

    if (!discordId) {
      setLoading(false);

      return;
    }

    if (hasFetched.current) return;

    hasFetched.current = true;

    async function loadSession() {
      try {
        setLoading(true);

        const data = await getGameSession(sessionId, discordId);

        console.log("Loaded session:", data);

        setSession(data);

        setHistory(data.questions || []);

        setMessages(data.chat_messages || []);
      } catch (error) {
        console.error("Failed to load session:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [sessionId, authSession?.user?.discord_id, status]);

  /*
    =========================================
    WEBSOCKET
    =========================================
  */

  useEffect(() => {
    if (!sessionId) return;

    const socket = createGameSocket(sessionId);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WS CONNECTED");

      setSocketReady(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        console.log("WS EVENT:", data);

        switch (data.type) {
          /*
            =====================================
            QUESTION ANSWERED
            =====================================
          */

          case "question_answered":
            setHistory((prev) => [
              ...prev,
              {
                question: data.data.question,

                answer: data.data.answer,
              },
            ]);

            setLatestResponse(data.data.answer);

            break;

          /*
            =====================================
            CHAT MESSAGE
            =====================================
          */

          case "spectator_message":
            setMessages((prev) => [
              ...prev,
              {
                sender: data.data.sender,

                message: data.data.message,
              },
            ]);

            break;

          /*
            =====================================
            WRONG GUESS
            =====================================
          */

          case "wrong_guess":
            setHistory((prev) => [
              ...prev,
              {
                question: `Final Guess: ${data.guess}`,

                answer: "No",
              },
            ]);

            setLatestResponse("No");

            break;

          /*
            =====================================
            GAME OVER
            =====================================
          */
          case "game_over":
            console.log("GAME OVER:", data);

            setResult(data.result);

            setCorrectWord(data.word || "unknown");

            break;

          default:
            break;
        }
      } catch (err) {
        console.error("WS MESSAGE ERROR:", err);
      }
    };

    socket.onerror = (error) => {
      console.error("WS ERROR:", error);
    };

    socket.onclose = () => {
      console.log("WS CLOSED");

      setSocketReady(false);
    };

    return () => {
      socket.close();
    };
  }, [sessionId]);

  /*
    =========================================
    ASK QUESTION
    =========================================
  */

  const handleQuestionSubmit = (question) => {
    if (result) return;

    const socket = socketRef.current;

    if (!socket) {
      console.log("Socket missing");

      return;
    }

    if (socket.readyState !== WebSocket.OPEN) {
      console.log("Socket not open");

      return;
    }

    socket.send(
      JSON.stringify({
        type: "ask_question",

        question,
      }),
    );
  };

  /*
    =========================================
    FINAL GUESS
    =========================================
  */

  const handleFinalGuess = (guess) => {
    if (result) return;

    const socket = socketRef.current;

    if (!socket) {
      console.log("Socket missing");

      return;
    }

    if (socket.readyState !== WebSocket.OPEN) {
      console.log("Socket not open");

      return;
    }

    socket.send(
      JSON.stringify({
        type: "final_guess",

        guess,
      }),
    );
  };

  const handleExpire = () => {
    console.log("Frontend timer ended");

    /*
    Prevent further actions
  */

    setSocketReady(false);
  };

  /*
    =========================================
    SEND MESSAGE
    =========================================
  */

  const handleSendMessage = (message) => {
    const socket = socketRef.current;

    if (!socket) {
      console.log("Socket missing");

      return;
    }

    if (socket.readyState !== WebSocket.OPEN) {
      console.log("Socket not open");

      return;
    }

    socket.send(
      JSON.stringify({
        type: "chat_message",

        username: authSession?.user?.username || "Anonymous",

        message,
      }),
    );
  };

  /*
    =========================================
    LOADING
    =========================================
  */

  if (loading || status === "loading") {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        </div>
      </PageShell>
    );
  }

  /*
    =========================================
    SESSION NOT FOUND
    =========================================
  */

  if (!session) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-zinc-500">Session not found.</p>
        </div>
      </PageShell>
    );
  }

  /*
    =========================================
    PLAYER CHECK
    =========================================
  */

  const isPlayer = session.isPlayer;

  /*
    =========================================
    UI
    =========================================
  */

  return (
    <PageShell>
      <div className="flex h-full flex-col bg-transparent">
        <FloatingBubble messages={messages} />

        {/* HEADER */}

        <div className="mb-4">
          <GameHeader session={session} isPlayer={isPlayer} />

          <div className="mt-4 flex justify-end">
            <GameTimer
              initialSeconds={session.remainingSeconds}
              onExpire={handleExpire}
            />
          </div>
        </div>

        {/* MAIN */}

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT */}

          <div className="lg:col-span-2 flex flex-col gap-6">
            <AIResponseSticker response={latestResponse} />

            {isPlayer && (
              <div className="mt-auto flex flex-col gap-8 pb-8">
                <QuestionInput
                  onSubmit={handleQuestionSubmit}
                  disabled={!!result || !socketReady}
                />

                <FinalGuessBox
                  onSubmit={handleFinalGuess}
                  disabled={!!result || !socketReady}
                />
              </div>
            )}
          </div>

          {/* RIGHT */}

          <div className="flex h-full max-h-[700px] flex-col gap-6">
            <div className={isPlayer ? "h-full" : "h-1/2"}>
              <GuessHistory history={history} />
            </div>

            {!isPlayer && (
              <div className="h-1/2 min-h-0">
                <SpectatorChat
                  messages={messages}
                  onSendMessage={handleSendMessage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RESULT MODAL */}

      <GameResultModal
        result={result}
        word={correctWord}
        onPlayAgain={() => {
          window.location.href = "/home";
        }}
      />
    </PageShell>
  );
}
