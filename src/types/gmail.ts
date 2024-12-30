import { Email } from './email';

export interface GmailState {
  emails: Email[];
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  useMockData: boolean;
}

export interface GmailContextType extends GmailState {
  refreshEmails: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  useMockDataInstead: () => void;
}