import { GAPI_TIMEOUT } from '../../config/constants';
import { getGmailConfig } from './config';
import { GmailError } from './errors';
import { getEnvironment } from '../../utils/environment';

export async function initializeGapi(): Promise<void> {
  const { isDevelopment, origin } = getEnvironment();
  
  if (isDevelopment) {
    console.info(
      'Development environment detected.\n' +
      'Make sure to add this origin to your Google Cloud Console:\n' +
      origin
    );
  }

  try {
    // Load GAPI with timeout
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Gmail API initialization timed out'));
      }, GAPI_TIMEOUT);

      gapi.load('client:auth2', {
        callback: () => {
          clearTimeout(timeout);
          resolve();
        },
        onerror: (error) => {
          clearTimeout(timeout);
          reject(error);
        }
      });
    });

    // Initialize GAPI client
    const config = getGmailConfig();
    await gapi.client.init({
      ...config,
      ux_mode: 'popup', // Force popup mode for better compatibility
      plugin_name: 'gmail-client' // Identify your application
    });
  } catch (error) {
    if (error instanceof Error && 
        (error.message.includes('Not a valid origin') || 
         error.message.includes('has not been registered'))) {
      throw GmailError.originError(getEnvironment().origin);
    }
    throw GmailError.fromError(error);
  }
}