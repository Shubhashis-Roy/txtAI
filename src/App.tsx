import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import ChatWidget from "./components/ChatWidget";
import { FloatingNavbar } from "./components/FloatingNavbar";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatingNavbar />
      <LandingPage />
      <ChatWidget open={open} onToggle={() => setOpen((o) => !o)} />
    </>
  );
}
