import type { MessageTypes } from "../types/chat";

interface Props {
  message: MessageTypes;
}

const senderConfig = {
  user: {
    name: "You",
    avatar: "/user.png",
    bg: "#2563eb",
    color: "#fff",
    align: "flex-end" as const,
  },
  ai: {
    name: "Spur Support",
    avatar: "/chat.png",
    bg: "#ffffff",
    color: "#111",
    align: "flex-start" as const,
  },
};

export default function ChatMessage({ message }: Props) {
  const config = senderConfig[message.sender];
  const isUser = message.sender === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: config.align,
        marginBottom: "14px",
      }}
    >
      {/* AI AVATAR */}
      {!isUser && (
        <img
          src={config.avatar}
          alt={config.name}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            marginRight: "8px",
            objectFit: "contain",
          }}
        />
      )}

      {/* NAME + BUBBLE */}
      <div
        style={{
          maxWidth: "72%",
          display: "flex",
          flexDirection: "column",
          alignItems: isUser ? "flex-end" : "flex-start",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            marginBottom: "4px",
            color: "#6b7280",
          }}
        >
          {config.name}
        </div>

        <div
          style={{
            padding: "12px 14px",
            borderRadius: "16px",
            background: config.bg,
            color: config.color,
            boxShadow: !isUser ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
            lineHeight: 1.4,
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {message.text}
        </div>
      </div>

      {/* USER AVATAR */}
      {isUser && (
        <img
          src={config.avatar}
          alt={config.name}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            marginLeft: "8px",
            objectFit: "contain",
          }}
        />
      )}
    </div>
  );
}
