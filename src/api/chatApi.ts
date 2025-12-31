import axiosInstance from "../services/axios";
import type { ChatHistoryResponse, ChatResponse } from "../types/chatApi";

export async function sendMessage(
  message: string,
  sessionId?: string | null
): Promise<ChatResponse> {
  const payload = {
    message,
    ...(sessionId !== undefined && { sessionId }),
  };

  const res = await axiosInstance.post("/chat/message", payload);
  return res?.data;
}

export async function getChatHistory(
  sessionId: string
): Promise<ChatHistoryResponse> {
  const res = await axiosInstance.get(`/chat/history/${sessionId}`);

  return res?.data;
}
