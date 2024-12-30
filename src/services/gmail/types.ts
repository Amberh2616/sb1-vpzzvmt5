export interface GmailAuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
}

export interface GmailConfig {
  apiKey: string;
  clientId: string;
  scope: string;
  discoveryDocs: string[];
}

export interface GmailError {
  code: string;
  message: string;
  details?: unknown;
}