import { Email, EmailRecipient } from '../types/email';
import { GMAIL_CONFIG, validateGmailConfig } from '../config/gmail';

export class GmailService {
  private static instance: GmailService;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): GmailService {
    if (!GmailService.instance) {
      GmailService.instance = new GmailService();
    }
    return GmailService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    const configValidation = validateGmailConfig();
    if (!configValidation.isValid) {
      throw new Error(configValidation.error);
    }

    try {
      await new Promise<void>((resolve, reject) => {
        gapi.load('client:auth2', async () => {
          try {
            await gapi.client.init({
              apiKey: GMAIL_CONFIG.apiKey,
              clientId: GMAIL_CONFIG.clientId,
              scope: GMAIL_CONFIG.scope,
              discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest']
            });
            this.isInitialized = true;
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Failed to initialize Gmail API:', error);
      throw new Error('Failed to initialize Gmail API');
    }
  }

  // ... rest of the service implementation remains the same ...
}