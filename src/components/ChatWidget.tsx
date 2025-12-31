// ChatWidget.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import ChatContainer from "./ChatContainer";

interface Props {
  open: boolean;
  onToggle: () => void;
}

export default function ChatWidget({ open, onToggle }: Props) {
  const [showChat, setShowChat] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  const quickQuestions = [
    "Hey, I want to subscribe to Spur.",
    "I want to book a demo call",
  ];

  const handleQuickQuestion = (q: string) => {
    setInitialMessage(q);
    setShowChat(true);
  };

  return (
    <>
      {/* ChatContainer */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <ChatContainer
            onClose={() => {
              setShowChat(false);
              setInitialMessage(null);
            }}
            initialMessage={initialMessage || undefined}
          />
        </motion.div>
      )}

      {/* Initial conversation card */}
      {open && !showChat && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "360px",
            borderRadius: "18px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            zIndex: 1000,
            fontFamily: "Inter, sans-serif",
            overflow: "hidden",
            background: "#F8FAFC",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#2563EB",
              padding: "22px 20px",
              color: "#fff",
              position: "relative",
            }}
          >
            <button
              onClick={onToggle}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <h2
              style={{
                fontSize: "26px",
                fontWeight: 800,
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              Hey 👋, how can we help you today?
            </h2>
          </div>

          {/* Body */}
          <div
            style={{
              background: "#fff",
              padding: "16px",
            }}
          >
            {/* Start conversation card */}
            <div
              style={{
                borderRadius: "14px",
                padding: "14px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                marginBottom: "14px",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: "16px" }}>
                Start a conversation
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748B",
                  marginTop: "2px",
                }}
              >
                We usually respond within 10 minutes
              </div>

              <button
                onClick={() => handleQuickQuestion("")}
                style={{
                  width: "100%",
                  marginTop: "12px",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#2563EB",
                  color: "#fff",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                Chat with us ➤
              </button>
            </div>

            {/* Quick Questions */}
            <div
              style={{
                fontSize: "13px",
                color: "#64748B",
                marginBottom: "8px",
              }}
            >
              Ask Quick Questions
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "999px",
                    border: "1px solid #E5E7EB",
                    background: "#fff",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={onToggle}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "76px",
          height: "76px",
          borderRadius: "50%",
          background: "#1F65EF",
          color: "#fff",
          border: "none",
          fontSize: "28px",
          cursor: "pointer",
          boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
          zIndex: 1000,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {open ? (
          "✕"
        ) : (
          <img
            src="https://spur-uploads.s3.ap-south-1.amazonaws.com/360/7799_spurlogobluebg.svg"
            alt="Spur"
            style={{
              width: "40px",
              height: "40px",
            }}
          />
        )}
      </button>
    </>
  );
}
