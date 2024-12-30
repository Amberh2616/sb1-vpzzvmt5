import { Email } from '../../types/email';
import { GmailError } from './errors';
import { GmailAuth } from './auth';
import { GmailParser } from './parser';

export class GmailAPI {
  private static instance: GmailAPI;
  private auth: GmailAuth;

  private constructor() {
    this.auth = GmailAuth.getInstance();
  }

  static getInstance(): GmailAPI {
    if (!GmailAPI.instance) {
      GmailAPI.instance = new GmailAPI();
    }
    return GmailAPI.instance;
  }

  async getEmails(maxResults = 20): Promise<Email[]> {
    try {
      if (!this.auth.isSignedIn()) {
        throw GmailError.authError('User is not signed in');
      }

      const response = await gapi.client.gmail.users.messages.list({
        userId: 'me',
        maxResults,
      });

      const emails: Email[] = [];
      for (const message of response.result.messages || []) {
        const email = await this.getEmail(message.id);
        if (email) emails.push(email);
      }

      return emails;
    } catch (error) {
      throw GmailError.fromError(error);
    }
  }

  private async getEmail(messageId: string): Promise<Email | null> {
    try {
      const response = await gapi.client.gmail.users.messages.get({
        userId: 'me',
        id: messageId,
      });

      return GmailParser.parseEmail(response.result);
    } catch (error) {
      console.error('Error fetching email:', error);
      return null;
    }
  }
}