import { useState, useEffect, useRef } from "react";
import { getChatHistory, sendMessage } from "../api/chatApi";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import type { MessageTypes } from "../types/chat";
import {
  getSessionIdFromLocalStorage,
  setSessionIdInLocalStorage,
} from "../utils/session";

export default function ChatContainer({
  onClose,
  initialMessage,
}: {
  onClose?: () => void;
  initialMessage?: string;
}) {
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const hasSentInitialMessage = useRef(false);

  useEffect(() => {
    const sessionId = getSessionIdFromLocalStorage();

    async function fetchHistory() {
      if (!sessionId) return;
      const history = await getChatHistory(sessionId);
      setMessages(history?.messages);
    }
    fetchHistory();
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const sessionId = getSessionIdFromLocalStorage();

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), sender: "user", text },
    ]);
    setLoading(true);

    try {
      const res = await sendMessage(text, sessionId);
      setSessionIdInLocalStorage(res?.sessionId);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "ai", text: res.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "ai",
          text: "Sorry, our support assistant is temporarily unavailable. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Send initial message only once
  useEffect(() => {
    if (initialMessage && !hasSentInitialMessage.current) {
      hasSentInitialMessage.current = true;
      handleSend(initialMessage);
    }
  }, [initialMessage]);

  return (
    <div
      style={{
        width: "380px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: "14px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#f9fafb",
        }}
      >
        <div>
          <strong>🤖 Spur Support</strong>
          <div style={{ fontSize: "12px", color: "#16a34a" }}>● Online</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        )}
      </div>

      <ChatMessages messages={messages} loading={loading} />
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
