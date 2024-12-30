import React, { createContext, useContext, ReactNode } from 'react';
import { useGmailState } from '../hooks/useGmailState';
import { GmailContextType } from '../types/gmail';

const GmailContext = createContext<GmailContextType | null>(null);

interface GmailProviderProps {
  children: ReactNode;
}

export function GmailProvider({ children }: GmailProviderProps) {
  const gmailState = useGmailState();

  return (
    <GmailContext.Provider value={gmailState}>
      {children}
    </GmailContext.Provider>
  );
}

export function useGmail() {
  const context = useContext(GmailContext);
  if (!context) {
    throw new Error('useGmail must be used within a GmailProvider');
  }
  return context;
}