import { useState, useEffect, useRef } from "react";
import { getChatHistory, sendMessage } from "../api/chatApi";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import type { MessageTypes } from "../types/chat";
import {
  getSessionIdFromLocalStorage,
  setSessionIdInLocalStorage,
} from "../utils/session";

interface ChatContainerProps {
  onClose?: () => void;
  initialMessage?: string;
}

export default function ChatContainer({
  onClose,
  initialMessage,
}: ChatContainerProps) {
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const hasSentInitialMessage = useRef(false);

  useEffect(() => {
    const sessionId = getSessionIdFromLocalStorage();

    async function fetchHistory() {
      if (!sessionId) return;

      setIsHistoryLoading(true);
      try {
        const history = await getChatHistory(sessionId);
        setMessages(history?.messages);
      } finally {
        setIsHistoryLoading(false);
      }
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

  useEffect(() => {
    if (initialMessage && !hasSentInitialMessage.current) {
      hasSentInitialMessage.current = true;
      handleSend(initialMessage);
    }
  }, [initialMessage]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "520px",
        height: "85vh",
        maxHeight: "720px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#F8FAFC",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ position: "relative" }}>
            <img
              src="/chat.png"
              alt="Spur Support"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: "2px",
                right: "2px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#16a34a",
                border: "2px solid #F8FAFC",
              }}
            />
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "14px" }}>
              Spur Support
            </div>
            <div style={{ fontSize: "12px", color: "#16a34a" }}>Online</div>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "none",
              background: "#E5E7EB",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ✕
          </button>
        )}
      </div>

      <ChatMessages
        messages={messages}
        loading={loading}
        isHistoryLoading={isHistoryLoading}
      />

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
