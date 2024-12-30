import React from 'react';
import { LogIn } from 'lucide-react';

interface AuthPromptProps {
  onSignIn: () => void;
}

export function AuthPrompt({ onSignIn }: AuthPromptProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Gmail Authentication Required</h2>
        <p className="text-gray-600 mb-6">
          Please sign in with your Google account to access your emails.
        </p>
        <button
          onClick={onSignIn}
          className="flex items-center justify-center gap-2 w-full bg-brand text-white py-2 px-4 rounded hover:bg-brand-dark transition-colors"
        >
          <LogIn className="w-5 h-5" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}