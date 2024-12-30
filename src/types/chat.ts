export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  sender: string;
  senderImage?: string;
}