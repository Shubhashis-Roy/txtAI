import { useRef, useState } from "react";

interface Props {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = !disabled && text.trim().length > 0;

  const handleChange = (value: string) => {
    setText(value);

    // Auto-grow textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  };

  const handleSend = () => {
    if (!canSend) return;

    onSend(text.trim());
    setText("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "12px",
        borderTop: "1px solid #eee",
        background: "#fff",
        gap: "8px",
        alignItems: "flex-end",
        flexShrink: 0,
      }}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Type your message..."
        disabled={disabled}
        rows={1}
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: "18px",
          border: "1px solid #ddd",
          outline: "none",
          fontSize: "14px",
          resize: "none",
          overflowY: "auto",

          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          maxHeight: "120px",

          background: disabled ? "#f9fafb" : "#fff",
        }}
      />

      <button
        onClick={handleSend}
        disabled={!canSend}
        style={{
          padding: "10px 16px",
          borderRadius: "999px",
          border: "none",
          fontWeight: 500,

          background: canSend ? "#2563eb" : "#d1d5db",
          color: canSend ? "#fff" : "#6b7280",
          cursor: canSend ? "pointer" : "not-allowed",
          transition: "all 0.2s ease",
        }}
      >
        Send
      </button>
    </div>
  );
}
