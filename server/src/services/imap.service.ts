import Imap from 'imap';
import { simpleParser } from 'mailparser';
import { emailConfig } from '../config/email';
import { EmailMessage } from '../types/email';

export class ImapService {
  private imap: Imap;

  constructor() {
    this.imap = new Imap({
      ...emailConfig.imap,
      tlsOptions: { rejectUnauthorized: false } // Required for some Gmail connections
    });
  }

  private connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imap.once('ready', resolve);
      this.imap.once('error', reject);
      this.imap.connect();
    });
  }

  async fetchEmails(folder: string = 'INBOX', limit: number = 50): Promise<EmailMessage[]> {
    try {
      await this.connect();
      
      return new Promise((resolve, reject) => {
        this.imap.openBox(folder, false, (err, box) => {
          if (err) return reject(err);

          const fetch = this.imap.seq.fetch(`${Math.max(1, box.messages.total - limit + 1)}:*`, {
            bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
            struct: true
          });

          const messages: EmailMessage[] = [];

          fetch.on('message', (msg) => {
            const message: any = {};

            msg.on('body', (stream, info) => {
              let buffer = '';
              stream.on('data', (chunk) => {
                buffer += chunk.toString('utf8');
              });
              stream.once('end', () => {
                if (info.which === 'TEXT') {
                  message.text = buffer;
                } else {
                  Object.assign(message, this.parseHeader(buffer));
                }
              });
            });

            msg.once('attributes', (attrs) => {
              message.id = attrs.uid.toString();
              message.date = attrs.date;
            });

            msg.once('end', () => {
              messages.push(this.normalizeMessage(message));
            });
          });

          fetch.once('error', reject);
          fetch.once('end', () => {
            this.imap.end();
            resolve(messages);
          });
        });
      });
    } catch (error) {
      console.error('IMAP fetch error:', error);
      throw error;
    }
  }

  private parseHeader(header: string): Partial<EmailMessage> {
    const parsed: any = {};
    header.split('\r\n').forEach(line => {
      const [key, value] = line.split(': ');
      if (key && value) {
        parsed[key.toLowerCase()] = value;
      }
    });
    return {
      from: parsed.from,
      subject: parsed.subject,
      to: parsed.to?.split(',').map((email: string) => email.trim()) || []
    };
  }

  private normalizeMessage(raw: any): EmailMessage {
    return {
      id: raw.id,
      from: raw.from || '',
      to: Array.isArray(raw.to) ? raw.to : [raw.to || ''],
      subject: raw.subject || '(No subject)',
      text: raw.text || '',
      date: raw.date || new Date(),
      attachments: []
    };
  }
}