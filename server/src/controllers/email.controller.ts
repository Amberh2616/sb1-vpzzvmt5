import { Request, Response } from 'express';
import { ImapService } from '../services/imap.service';
import { SmtpService } from '../services/smtp.service';

export class EmailController {
  private imapService: ImapService;
  private smtpService: SmtpService;

  constructor() {
    this.imapService = new ImapService();
    this.smtpService = new SmtpService();
  }

  async getEmails(req: Request, res: Response) {
    try {
      const folder = req.query.folder as string || 'INBOX';
      const limit = Number(req.query.limit) || 50;
      
      const emails = await this.imapService.fetchEmails(folder, limit);
      res.json(emails);
    } catch (error) {
      console.error('Get emails error:', error);
      res.status(500).json({ error: 'Failed to fetch emails' });
    }
  }

  async sendEmail(req: Request, res: Response) {
    try {
      await this.smtpService.sendEmail(req.body);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Send email error:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  }

  async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const folder = req.query.folder as string || 'INBOX';
      
      await this.imapService.markAsRead(id, folder);
      res.status(200).json({ message: 'Email marked as read' });
    } catch (error) {
      console.error('Mark as read error:', error);
      res.status(500).json({ error: 'Failed to mark email as read' });
    }
  }
}