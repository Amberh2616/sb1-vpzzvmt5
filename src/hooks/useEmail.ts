import { useState, useCallback } from 'react';
import { IMAPService } from '../services/email/imap.service';
import { SMTPService } from '../services/email/smtp.service';
import { EmailMessage } from '../services/email/types';

export function useEmail() {
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = useCallback(async (folder: string = 'INBOX') => {
    setLoading(true);
    try {
      const imapService = IMAPService.getInstance();
      const fetchedEmails = await imapService.fetchEmails(folder);
      setEmails(fetchedEmails);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch emails');
    } finally {
      setLoading(false);
    }
  }, []);

  const sendEmail = useCallback(async (message: Omit<EmailMessage, 'id' | 'date'>) => {
    setLoading(true);
    try {
      const smtpService = SMTPService.getInstance();
      await smtpService.sendEmail(message);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send email');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    emails,
    loading,
    error,
    fetchEmails,
    sendEmail
  };
}