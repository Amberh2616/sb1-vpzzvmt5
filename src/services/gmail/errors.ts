export class GmailError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'GmailError';
  }

  static fromError(error: unknown): GmailError {
    if (error instanceof GmailError) {
      return error;
    }

    // Handle specific Google API errors
    if (error && typeof error === 'object' && 'details' in error) {
      const details = (error as any).details;
      if (details?.error === 'idpiframe_initialization_failed') {
        return GmailError.originError();
      }
    }

    if (error instanceof Error) {
      return new GmailError('GMAIL_ERROR', error.message, error);
    }

    return new GmailError(
      'UNKNOWN_ERROR',
      'An unknown error occurred',
      error
    );
  }

  static originError(origin?: string): GmailError {
    const message = origin
      ? `Origin "${origin}" is not authorized in Google Cloud Console`
      : 'Application origin is not authorized in Google Cloud Console';

    return new GmailError(
      'ORIGIN_ERROR',
      message,
      { origin }
    );
  }

  static authError(message: string, details?: unknown): GmailError {
    return new GmailError('AUTH_ERROR', message, details);
  }

  static configError(message: string): GmailError {
    return new GmailError('CONFIG_ERROR', message);
  }

  static apiError(message: string, details?: unknown): GmailError {
    return new GmailError('API_ERROR', message, details);
  }
}