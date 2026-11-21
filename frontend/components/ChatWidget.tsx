"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! Ask me about hotels, transport or trip planning.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || sending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { message?: string; error?: string };

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.message || data.error || "I could not process that message.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Connection failed. Please check your internet connection and try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <section
          role="dialog"
          aria-label="Traveler support chat"
          className="w-[320px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
        >
          <header className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <p className="font-semibold">Traveler Support</p>
              <p className="text-xs text-muted">How can we help?</p>
            </div>
            <button
              type="button"
              aria-label="Close support chat"
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-base hover:text-fg"
            >
              x
            </button>
          </header>
          <div className="h-72 overflow-y-auto p-4" aria-live="polite">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-5 ${
                      message.role === "user"
                        ? "rounded-br-md bg-sun text-black"
                        : "rounded-bl-md bg-base text-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-base px-3 py-2 text-sm text-muted">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form onSubmit={sendMessage} className="flex gap-2 border-t border-line p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about travel..."
              aria-label="Message"
              maxLength={500}
              className="min-w-0 flex-1 rounded-full border border-line bg-base px-4 py-2 text-sm text-fg outline-none placeholder:text-muted focus:border-sun"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="rounded-full bg-sun px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        aria-label={open ? "Close support chat" : "Open support chat"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-sun bg-sun shadow-[0_8px_24px_rgba(240,165,58,0.35)] transition-transform hover:scale-105"
      >
        <Image
          src="/images/man-hiking-illustration_722738-1536.png"
          alt=""
          fill
          sizes="64px"
          className="object-cover"
        />
      </button>
    </div>
  );
}
