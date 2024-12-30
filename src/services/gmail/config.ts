import { GMAIL_SCOPES, GMAIL_DISCOVERY_DOCS } from '../../config/constants';
import { validateEnvironment } from '../../utils/environment';

export function getGmailConfig() {
  validateEnvironment();

  return {
    apiKey: import.meta.env.VITE_GMAIL_API_KEY,
    clientId: import.meta.env.VITE_GMAIL_CLIENT_ID,
    scope: `${GMAIL_SCOPES.readonly} ${GMAIL_SCOPES.send}`,
    discoveryDocs: GMAIL_DISCOVERY_DOCS
  };
}