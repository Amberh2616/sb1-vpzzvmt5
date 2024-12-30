import { GMAIL_CONFIG } from '../../config/gmail';
import { GmailError } from './errors';
import { initializeGapi } from './initialize';

export class GmailAuth {
  private static instance: GmailAuth;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): GmailAuth {
    if (!GmailAuth.instance) {
      GmailAuth.instance = new GmailAuth();
    }
    return GmailAuth.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await initializeGapi();
      this.isInitialized = true;
    } catch (error) {
      this.isInitialized = false;
      throw GmailError.fromError(error);
    }
  }

  async signIn(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const auth = gapi.auth2.getAuthInstance();
      if (!auth) {
        throw new Error('Auth instance not initialized');
      }

      // Use a more reliable sign-in method
      const user = await auth.signIn({
        prompt: 'select_account',
        ux_mode: 'popup'
      });

      if (!user) {
        throw new Error('Sign in failed - no user returned');
      }
    } catch (error) {
      // Check for origin-related errors during sign-in
      if (error instanceof Error && 
          (error.message.includes('Not a valid origin') || 
           error.message.includes('has not been registered'))) {
        throw GmailError.originError();
      }
      throw GmailError.authError('Failed to sign in', error);
    }
  }

  async signOut(): Promise<void> {
    try {
      const auth = gapi.auth2.getAuthInstance();
      if (!auth) {
        throw new Error('Auth instance not initialized');
      }
      await auth.signOut();
    } catch (error) {
      throw GmailError.authError('Failed to sign out', error);
    }
  }

  isSignedIn(): boolean {
    try {
      const auth = gapi.auth2.getAuthInstance();
      return auth?.isSignedIn.get() || false;
    } catch {
      return false;
    }
  }
}