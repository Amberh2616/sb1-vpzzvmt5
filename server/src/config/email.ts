import dotenv from 'dotenv';
dotenv.config();

export const emailConfig = {
  imap: {
    host: process.env.EMAIL_IMAP_HOST || 'imap.gmail.com',
    port: Number(process.env.EMAIL_IMAP_PORT) || 993,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  },
  smtp: {
    host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  }
};