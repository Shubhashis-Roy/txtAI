import LandingPage from "./pages/LandingPage";
import ChatWidget from "./components/ChatWidget";
import { FloatingNavbar } from "./components/FloatingNavbar";

export default function App() {

  return (
    <>
      <FloatingNavbar />
      <LandingPage />
      <ChatWidget/>
    </>
  );
}
