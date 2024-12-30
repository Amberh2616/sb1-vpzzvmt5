import { EmailMessage } from './types';

export class IMAPService {
  private static instance: IMAPService;
  
  private constructor() {}

  static getInstance(): IMAPService {
    if (!IMAPService.instance) {
      IMAPService.instance = new IMAPService();
    }
    return IMAPService.instance;
  }

  async fetchEmails(folder: string = 'INBOX', limit: number = 50): Promise<EmailMessage[]> {
    // In a real implementation, this would connect to your backend API
    // which would then use node-imap or similar to fetch emails
    const response = await fetch(`/api/emails?folder=${folder}&limit=${limit}`);
    return response.json();
  }

  async markAsRead(messageId: string): Promise<void> {
    await fetch(`/api/emails/${messageId}/read`, { method: 'POST' });
  }

  async moveToFolder(messageId: string, folder: string): Promise<void> {
    await fetch(`/api/emails/${messageId}/move`, {
      method: 'POST',
      body: JSON.stringify({ folder }),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}