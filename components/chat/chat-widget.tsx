"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { EASE_MISSION, DURATION } from "@/lib/motion";

interface Message {
  role: "user" | "bot";
  text: string;
}

const MAX_PAIRS = 4;

const PANEL_VARIANTS = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: DURATION.fast, ease: EASE_MISSION },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.fast, ease: EASE_MISSION },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: DURATION.fast, ease: EASE_MISSION },
  },
} as const;

function trimToMaxPairs(messages: Message[]): Message[] {
  if (messages.length > MAX_PAIRS * 2) {
    return messages.slice(messages.length - MAX_PAIRS * 2);
  }
  return messages;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sessionIdRef = useRef<string>(`session_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", text: trimmed };
    setInputValue("");
    setMessages((prev) => trimToMaxPairs([...prev, userMessage]));
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CHATBOT_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, sessionId: sessionIdRef.current }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error("Non-OK response");
      const data = await response.json();
      const botText: string =
        data?.[0]?.botResponse ??
        "Sorry, something went wrong. Please call us at 312-265-1856.";
      setMessages((prev) => trimToMaxPairs([...prev, { role: "bot", text: botText }]));
    } catch {
      clearTimeout(timeoutId);
      setMessages((prev) =>
        trimToMaxPairs([
          ...prev,
          {
            role: "bot" as const,
            text: "Sorry, something went wrong. Please call us at 312-265-1856.",
          },
        ])
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            key="chat-panel"
            variants={PANEL_VARIANTS}
            initial={reduced ? false : "hidden"}
            animate="visible"
            exit={reduced ? undefined : "exit"}
            style={{ transformOrigin: "bottom right" }}
            className="flex w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.6)] h-[60vh] max-h-[500px] md:h-[420px] md:max-h-none md:w-80"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between bg-mission-gray-900 px-4 py-3"
              style={{ borderLeft: "4px solid var(--mission-red)" }}
            >
              <span className="font-display text-sm uppercase tracking-wider text-mission-white">
                Chat With Us
              </span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="rounded p-1 text-mission-gray-300 transition-colors hover:text-mission-white"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-mission-black p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm text-mission-white ${
                      msg.role === "user" ? "bg-mission-red" : "bg-mission-gray-900"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="flex items-center gap-1 rounded-lg bg-mission-gray-900 px-3 py-2"
                    aria-label="Bot is typing"
                  >
                    {([0, 0.15, 0.3] as const).map((delay, i) => (
                      <span
                        key={i}
                        aria-hidden="true"
                        className="block h-1.5 w-1.5 rounded-full bg-mission-gray-300"
                        style={
                          reduced
                            ? undefined
                            : {
                                animation: "typing-dot 0.9s ease-in-out infinite",
                                animationDelay: `${delay}s`,
                              }
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-white/10 bg-mission-gray-900 px-3 py-2.5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message…"
                disabled={isLoading}
                aria-label="Chat message"
                className="flex-1 rounded-md border border-white/10 bg-mission-black px-3 py-1.5 text-sm text-mission-white placeholder:text-mission-gray-500 focus:border-mission-red focus:outline-none focus:ring-1 focus:ring-mission-red disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                aria-label="Send message"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-mission-red text-mission-white transition-colors hover:bg-mission-red-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-mission-red text-mission-white shadow-[0_8px_32px_rgba(200,16,46,0.4)] transition-colors hover:bg-mission-red-dark"
        style={
          !isOpen && !reduced
            ? { animation: "cta-pulse 2s ease-in-out infinite" }
            : undefined
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <m.span
              key="close"
              initial={reduced ? false : { opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={reduced ? undefined : { opacity: 0, rotate: 90 }}
              transition={{ duration: DURATION.fast }}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </m.span>
          ) : (
            <m.span
              key="open"
              initial={reduced ? false : { opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={reduced ? undefined : { opacity: 0, rotate: -90 }}
              transition={{ duration: DURATION.fast }}
            >
              <MessageCircle className="h-6 w-6" aria-hidden="true" />
            </m.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
