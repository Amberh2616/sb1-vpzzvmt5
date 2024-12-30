import { useState, useCallback } from 'react';
import { EmailAPIService } from '../services/email/api.service';
import { EmailMessage } from '../services/email/types';
import { mockEmails } from '../data/mockEmails';

export function useEmailSystem() {
  const [emails, setEmails] = useState<EmailMessage[]>(mockEmails);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState('INBOX');
  const [isConnected, setIsConnected] = useState(false);

  const api = EmailAPIService.getInstance();

  const fetchEmails = useCallback(async (folder?: string) => {
    if (folder) {
      setSelectedFolder(folder);
    }
    
    setLoading(true);
    setError(null);

    try {
      // First check if API is available
      const response = await fetch(import.meta.env.VITE_API_URL + '/health');
      const isApiAvailable = response.ok;
      setIsConnected(isApiAvailable);

      if (!isApiAvailable) {
        throw new Error('Email server is not available');
      }

      const fetchedEmails = await api.fetchEmails(folder || selectedFolder);
      setEmails(fetchedEmails);
    } catch (err) {
      console.error('Failed to fetch emails:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch emails');
      // Use mock data as fallback
      setEmails(mockEmails);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  }, [selectedFolder]);

  const sendEmail = useCallback(async (message: Omit<EmailMessage, 'id' | 'date'>) => {
    if (!isConnected) {
      throw new Error('Email server is not connected');
    }

    setLoading(true);
    try {
      await api.sendEmail(message);
      setError(null);
      await fetchEmails();
    } catch (err) {
      console.error('Failed to send email:', err);
      setError(err instanceof Error ? err.message : 'Failed to send email');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchEmails, isConnected]);

  const markAsRead = useCallback(async (messageId: string) => {
    if (!isConnected) return;

    try {
      await api.markAsRead(messageId);
      setEmails(current =>
        current.map(email =>
          email.id === messageId ? { ...email, isRead: true } : email
        )
      );
    } catch (err) {
      console.error('Failed to mark email as read:', err);
    }
  }, [isConnected]);

  const deleteEmail = useCallback(async (messageId: string) => {
    if (!isConnected) return;

    try {
      await api.deleteEmail(messageId);
      setEmails(current => current.filter(email => email.id !== messageId));
    } catch (err) {
      console.error('Failed to delete email:', err);
      setError('Failed to delete email');
    }
  }, [isConnected]);

  return {
    emails,
    loading,
    error,
    selectedFolder,
    isConnected,
    fetchEmails,
    sendEmail,
    markAsRead,
    deleteEmail,
    setSelectedFolder
  };
}