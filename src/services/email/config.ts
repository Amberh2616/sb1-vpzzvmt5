export const EMAIL_CONFIG = {
  imap: {
    host: 'imap.gmail.com',
    port: 993,
    secure: true,
    auth: {
      user: import.meta.env.VITE_EMAIL_USER,
      pass: import.meta.env.VITE_EMAIL_PASSWORD
    }
  },
  smtp: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: import.meta.env.VITE_EMAIL_USER,
      pass: import.meta.env.VITE_EMAIL_PASSWORD
    }
  }
};