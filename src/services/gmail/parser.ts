import { Email, EmailRecipient } from '../../types/email';

export class GmailParser {
  static parseEmail(message: any): Email {
    const headers = message.payload.headers;
    const getHeader = (name: string) => 
      headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value || '';

    const from = getHeader('From');
    const [, senderName = '', senderEmail = ''] = from.match(/^(?:"?([^"]*)"?\s)?(?:<?(.+@[^>]+)>?)$/) || [];

    return {
      id: message.id,
      sender: senderName || senderEmail.split('@')[0],
      subject: getHeader('Subject'),
      preview: message.snippet || '',
      date: new Date(getHeader('Date')).toLocaleString(),
      isRead: !message.labelIds?.includes('UNREAD'),
      hasAttachment: message.payload.parts?.some((part: any) => part.filename && part.filename.length > 0) || false,
      isFlagged: message.labelIds?.includes('STARRED') || false,
      to: this.parseRecipients(getHeader('To')),
      content: this.parseMessageBody(message.payload),
    };
  }

  static parseRecipients(recipientString: string): EmailRecipient[] {
    return recipientString.split(',').map(recipient => {
      const matches = recipient.trim().match(/^(?:"?([^"]*)"?\s)?(?:<?(.+@[^>]+)>?)$/);
      const [, name = '', email = ''] = matches || [];
      return {
        name: name || email.split('@')[0],
        email,
      };
    });
  }

  static parseMessageBody(payload: any): string {
    if (payload.body.data) {
      return atob(payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
    }

    if (payload.parts) {
      for (const part of payload.parts) {
        if (part.mimeType === 'text/plain' || part.mimeType === 'text/html') {
          return atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
        }
      }
    }

    return '';
  }
}