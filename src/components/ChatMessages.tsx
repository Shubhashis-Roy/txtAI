import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatMessageSkeleton from "./ChatMessageSkeleton";
import type { MessageTypes } from "../types/chat";

interface Props {
  messages: MessageTypes[];
  loading: boolean;
  isHistoryLoading?: boolean;
}

export default function ChatMessages({
  messages,
  loading,
  isHistoryLoading = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    if (!showScrollDown) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showScrollDown]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    setShowScrollDown(!atBottom);
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: 0,
        position: "relative",
        background: "#f9fafb",
      }}
    >
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: "100%",
          overflowY: "auto",
          padding: "16px",
        }}
      >
        {/* 🔹 HISTORY SKELETONS */}
        {isHistoryLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <ChatMessageSkeleton key={i} />
          ))}

        {/* 🔹 REAL MESSAGES */}
        {!isHistoryLoading &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

        {/* 🔹 TYPING INDICATOR (NOT HISTORY) */}
        {loading && !isHistoryLoading && (
          <div style={{ fontSize: "12px", color: "#666", marginTop: "6px" }}>
            Spur Support is typing…
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {showScrollDown && (
        <button
          onClick={() =>
            bottomRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          style={{
            position: "absolute",
            left: "14px",
            bottom: "14px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
          }}
        >
          ↓
        </button>
      )}
    </div>
  );
}
