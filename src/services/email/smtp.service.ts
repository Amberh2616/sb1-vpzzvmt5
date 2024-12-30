import { EmailMessage } from './types';

export class SMTPService {
  private static instance: SMTPService;
  
  private constructor() {}

  static getInstance(): SMTPService {
    if (!SMTPService.instance) {
      SMTPService.instance = new SMTPService();
    }
    return SMTPService.instance;
  }

  async sendEmail(message: Omit<EmailMessage, 'id' | 'date'>): Promise<void> {
    // In a real implementation, this would connect to your backend API
    // which would then use nodemailer or similar to send emails
    await fetch('/api/emails/send', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async saveDraft(message: Partial<EmailMessage>): Promise<string> {
    const response = await fetch('/api/emails/drafts', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data.id;
  }
}