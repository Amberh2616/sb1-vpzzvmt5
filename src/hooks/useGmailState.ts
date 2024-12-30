import { useState, useEffect, useCallback } from 'react';
import { GmailAuth } from '../services/gmail/auth';
import { GmailAPI } from '../services/gmail/api';
import { Email } from '../types/email';
import { mockEmails } from '../data/mockEmails';
import { GmailState } from '../types/gmail';

export function useGmailState(): GmailState {
  const [state, setState] = useState<GmailState>({
    emails: mockEmails,
    isLoading: true,
    error: null,
    isAuthenticated: false,
    isInitialized: false,
    useMockData: false
  });

  const setPartialState = (newState: Partial<GmailState>) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  const refreshEmails = useCallback(async () => {
    if (state.useMockData) {
      setPartialState({ emails: mockEmails, isLoading: false });
      return;
    }

    setPartialState({ isLoading: true });
    try {
      const api = GmailAPI.getInstance();
      const fetchedEmails = await api.getEmails();
      setPartialState({
        emails: fetchedEmails,
        error: null,
        isLoading: false
      });
    } catch (err) {
      console.error('Email refresh error:', err);
      setPartialState({
        error: err instanceof Error ? err.message : 'Failed to refresh emails',
        emails: mockEmails,
        isLoading: false
      });
    }
  }, [state.useMockData]);

  const signIn = useCallback(async () => {
    if (state.useMockData) return;
    
    setPartialState({ isLoading: true });
    try {
      const auth = GmailAuth.getInstance();
      await auth.signIn();
      setPartialState({ 
        isAuthenticated: true,
        error: null 
      });
      await refreshEmails();
    } catch (err) {
      console.error('Sign in error:', err);
      setPartialState({
        error: err instanceof Error ? err.message : 'Failed to sign in',
        emails: mockEmails,
        isLoading: false
      });
    }
  }, [refreshEmails, state.useMockData]);

  const signOut = useCallback(async () => {
    setPartialState({ isLoading: true });
    try {
      const auth = GmailAuth.getInstance();
      await auth.signOut();
      setPartialState({
        isAuthenticated: false,
        emails: mockEmails,
        error: null,
        isLoading: false,
        useMockData: false
      });
    } catch (err) {
      console.error('Sign out error:', err);
      setPartialState({
        error: err instanceof Error ? err.message : 'Failed to sign out',
        isLoading: false
      });
    }
  }, []);

  const useMockDataInstead = useCallback(() => {
    setPartialState({
      useMockData: true,
      error: null,
      isLoading: false,
      emails: mockEmails,
      isInitialized: true
    });
  }, []);

  const initialize = useCallback(async () => {
    if (state.isInitialized || state.useMockData) return;

    try {
      const auth = GmailAuth.getInstance();
      await auth.initialize();
      
      const isSignedIn = auth.isSignedIn();
      setPartialState({ 
        isAuthenticated: isSignedIn,
        isInitialized: true,
        isLoading: false,
        error: null
      });
      
      if (isSignedIn) {
        await refreshEmails();
      }
    } catch (err) {
      console.error('Gmail initialization error:', err);
      setPartialState({
        error: err instanceof Error ? err.message : 'Failed to initialize Gmail API',
        isLoading: false,
        isInitialized: true,
        useMockData: true // Automatically use mock data on initialization error
      });
    }
  }, [state.isInitialized, state.useMockData, refreshEmails]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    ...state,
    refreshEmails,
    signIn,
    signOut,
    useMockDataInstead
  };
}