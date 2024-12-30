export interface EmailConfig {
  imap: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    }
  };
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    }
  }
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

export interface EmailAttachment {
  filename: string;
  contentType: string;
  size: number;
  content?: Buffer;
}