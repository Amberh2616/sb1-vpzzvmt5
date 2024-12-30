import { EmailMessage } from './types';

export class EmailAPIService {
  private static instance: EmailAPIService;
  private baseUrl: string;
  
  private constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    if (!this.baseUrl) {
      throw new Error('API URL not configured. Please set VITE_API_URL in .env');
    }
  }

  static getInstance(): EmailAPIService {
    if (!EmailAPIService.instance) {
      EmailAPIService.instance = new EmailAPIService();
    }
    return EmailAPIService.instance;
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async fetchEmails(folder: string = 'INBOX'): Promise<EmailMessage[]> {
    const isHealthy = await this.checkHealth();
    if (!isHealthy) {
      throw new Error('Email server is not available');
    }

    try {
      const response = await fetch(`${this.baseUrl}/emails?folder=${folder}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch emails: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Email fetch error:', error);
      throw new Error('Failed to fetch emails. Please check your connection and try again.');
    }
  }

  // ... rest of the service methods remain the same
}