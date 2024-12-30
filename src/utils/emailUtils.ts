import { EmailMessage } from '../services/email/types';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function parseEmailList(emails: string): string[] {
  return emails
    .split(',')
    .map(email => email.trim())
    .filter(email => validateEmail(email));
}

export function formatEmailAddress(name: string, email: string): string {
  return name ? `${name} <${email}>` : email;
}

export function searchEmails(emails: EmailMessage[], query: string): EmailMessage[] {
  const searchTerm = query.toLowerCase();
  return emails.filter(email => 
    email.subject.toLowerCase().includes(searchTerm) ||
    email.from.toLowerCase().includes(searchTerm) ||
    email.text?.toLowerCase().includes(searchTerm)
  );
}