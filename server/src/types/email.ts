export interface EmailAttachment {
  filename: string;
  contentType: string;
  size: number;
  content?: Buffer;
}

export interface EmailMessage {
  id: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: EmailAttachment[];
  date: Date;
}