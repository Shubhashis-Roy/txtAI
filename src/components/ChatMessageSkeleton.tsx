export default function ChatMessageSkeleton() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "14px",
        }}
      >
        <div style={{ marginRight: "8px", fontSize: "20px" }}>🤖</div>

        <div
          style={{
            maxWidth: "72%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "12px",
              background: "#e5e7eb",
              borderRadius: "6px",
              marginBottom: "6px",
            }}
          />

          <div
            style={{
              width: "220px",
              height: "36px",
              background: "#e5e7eb",
              borderRadius: "14px",
              animation: "pulse 1.4s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "14px",
        }}
      >
        <div
          style={{
            maxWidth: "72%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "12px",
              background: "#e5e7eb",
              borderRadius: "6px",
              marginBottom: "6px",
            }}
          />

          <div
            style={{
              width: "180px",
              height: "36px",
              background: "#e5e7eb",
              borderRadius: "14px",
              animation: "pulse 1.4s ease-in-out infinite",
            }}
          />
        </div>

        <div style={{ marginLeft: "8px", fontSize: "20px" }}>🙂</div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </>
  );
}
