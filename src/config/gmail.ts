import { GmailError } from '../services/gmail/errors';

export const GMAIL_CONFIG = {
  apiKey: import.meta.env.VITE_GMAIL_API_KEY,
  clientId: import.meta.env.VITE_GMAIL_CLIENT_ID,
  scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest']
};

export function validateGmailConfig() {
  if (!GMAIL_CONFIG.apiKey) {
    throw GmailError.configError('Gmail API Key is missing. Please set VITE_GMAIL_API_KEY in your .env file.');
  }
  
  if (!GMAIL_CONFIG.clientId) {
    throw GmailError.configError('Gmail Client ID is missing. Please set VITE_GMAIL_CLIENT_ID in your .env file.');
  }

  // Check if we're in development
  const isDev = import.meta.env.DEV;
  const currentOrigin = window.location.origin;

  if (isDev) {
    console.info('Running in development mode. Please ensure your development domain is authorized:', currentOrigin);
  }

  return { isValid: true, origin: currentOrigin };
}