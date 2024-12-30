export function validateEnvironment() {
  const requiredVars = {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_EMAIL_USER: import.meta.env.VITE_EMAIL_USER,
    VITE_EMAIL_PASSWORD: import.meta.env.VITE_EMAIL_PASSWORD
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingVars.join('\n')}\n\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }

  // Validate API URL format
  try {
    new URL(import.meta.env.VITE_API_URL);
  } catch {
    throw new Error('VITE_API_URL must be a valid URL');
  }
}

export function getEnvironment() {
  validateEnvironment();
  
  return {
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    origin: window.location.origin,
    apiUrl: import.meta.env.VITE_API_URL,
    emailUser: import.meta.env.VITE_EMAIL_USER
  };
}