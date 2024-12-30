import nodemailer from 'nodemailer';
import { emailConfig } from '../config/email';
import { EmailMessage } from '../types/email';

export class SmtpService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(emailConfig.smtp);
  }

  async sendEmail(message: Omit<EmailMessage, 'id' | 'date'>): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: emailConfig.smtp.auth.user,
        to: message.to.join(', '),
        cc: message.cc?.join(', '),
        bcc: message.bcc?.join(', '),
        subject: message.subject,
        text: message.text,
        html: message.html,
        attachments: message.attachments?.map(attachment => ({
          filename: attachment.filename,
          content: attachment.content,
          contentType: attachment.contentType
        }))
      });
    } catch (error) {
      console.error('SMTP send error:', error);
      throw error;
    }
  }
}