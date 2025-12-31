export type Sender = "user" | "ai";

export interface MessageTypes {
  id: string;
  sender: Sender;
  text: string;
  createdAt?: string;
}
