import type { MessageTypes } from "./chat";

export interface ChatResponse {
  reply: string;
  sessionId: string;
}
export interface ChatHistoryResponse {
  conversationId: string;
  messages: MessageTypes[];
}
