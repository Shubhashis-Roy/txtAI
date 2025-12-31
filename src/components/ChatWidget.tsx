import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatContainer from "./ChatContainer";
type ChatMode = "closed" | "widget" | "chat";
export default function ChatWidget() {
  const [mode, setMode] = useState<ChatMode>("closed");
  const [initialMessage, setInitialMessage] = useState<string | undefined>();
  const quickQuestions = [
    "Hey, I want to subscribe to Spur.",
    "I want to book a demo call",
  ];
  const openChat = (msg?: string) => {
    setInitialMessage(msg);
    setMode("chat");
  };
  const closeChat = () => {
    setInitialMessage(undefined);
    setMode("widget");
  };
  return (
    <>
      <AnimatePresence>
        {mode === "chat" && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            style={{
              position: "fixed",
              inset: "auto 0 0 0",
              display: "flex",
              justifyContent: "flex-end",
              padding: "16px",
              zIndex: 1000,
            }}
          >
            <ChatContainer
              initialMessage={initialMessage}
              onClose={closeChat}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {mode === "widget" && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            style={{
              position: "fixed",
              bottom: "150px",
              right: "50px",
              width: "360px",
              borderRadius: "18px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              background: "#F8FAFC",
              overflow: "hidden",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "#2563EB",
                padding: "20px",
                color: "#fff",
                position: "relative",
              }}
            >
              <h2 style={{ fontSize: "22px", fontWeight: 700 }}>
                Hey 👋, how can we help?
              </h2>
            </div>
            <div style={{ padding: "16px", background: "#fff" }}>
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
                  Message us anytime, we reply instantly.
                </div>
                <button
                  onClick={() => openChat()}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "#2563EB",
                    color: "#fff",
                    borderRadius: "10px",
                    border: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                    margin: "14px 0",
                  }}
                >
                  Chat with us →
                </button>
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
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => openChat(q)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "999px",
                        border: "1px solid #E5E7EB",
                        background: "#fff",
                        fontSize: "13px",
                        cursor: "pointer",
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {mode !== "chat" && (
        <button
          onClick={() => setMode(mode === "closed" ? "widget" : "closed")}
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "#1F65EF",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
            zIndex: 1000,
          }}
        >
          {mode === "widget" ? (
            "✕"
          ) : (
            <img
              src="https://spur-uploads.s3.ap-south-1.amazonaws.com/360/7799_spurlogobluebg.svg"
              style={{ width: "38px" }}
            />
          )}
        </button>
      )}
    </>
  );
}
