import { useState, useEffect } from 'react';
import { GmailAuth } from '../services/gmail/auth';
import { GmailAPI } from '../services/gmail/api';
import { Email } from '../types/email';
import { mockEmails } from '../data/mockEmails';

export function useGmail() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeGmail = async () => {
      try {
        const auth = GmailAuth.getInstance();
        await auth.initialize();
        
        if (mounted) {
          const isSignedIn = auth.isSignedIn();
          setIsAuthenticated(isSignedIn);
          
          if (isSignedIn) {
            await refreshEmails();
          } else {
            setEmails(mockEmails);
          }
        }
      } catch (err) {
        if (mounted) {
          console.error('Gmail initialization error:', err);
          setError(err instanceof Error ? err.message : 'Failed to initialize Gmail API');
          setEmails(mockEmails);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeGmail();

    return () => {
      mounted = false;
    };
  }, []);

  const refreshEmails = async () => {
    setIsLoading(true);
    try {
      const api = GmailAPI.getInstance();
      const fetchedEmails = await api.getEmails();
      setEmails(fetchedEmails);
      setError(null);
    } catch (err) {
      console.error('Email refresh error:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh emails');
      setEmails(mockEmails);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    setIsLoading(true);
    try {
      const auth = GmailAuth.getInstance();
      await auth.signIn();
      setIsAuthenticated(true);
      await refreshEmails();
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign in to Gmail');
      setEmails(mockEmails);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const auth = GmailAuth.getInstance();
      await auth.signOut();
      setIsAuthenticated(false);
      setEmails(mockEmails);
      setError(null);
    } catch (err) {
      console.error('Sign out error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    emails,
    isLoading,
    error,
    isAuthenticated,
    refreshEmails,
    signIn,
    signOut
  };
}