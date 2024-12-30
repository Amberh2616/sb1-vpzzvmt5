export interface EmailRecipient {
  name: string;
  email: string;
  image?: string;
}

export interface Email {
  id: string;
  sender: string;
  senderImage?: string;
  subject: string;
  preview: string;
  date: string;
  isRead: boolean;
  hasAttachment: boolean;
  isFlagged: boolean;
  to: EmailRecipient[];
  cc?: EmailRecipient[];
  content: string;
}