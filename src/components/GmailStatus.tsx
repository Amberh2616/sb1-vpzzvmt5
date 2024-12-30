import React from 'react';
import { AlertCircle, ExternalLink, XCircle } from 'lucide-react';

interface GmailStatusProps {
  error: string;
  onUseMockData: () => void;
  onDismiss?: () => void;
}

export function GmailStatus({ error, onUseMockData, onDismiss }: GmailStatusProps) {
  const currentOrigin = window.location.origin;
  const isOriginError = error.toLowerCase().includes('not authorized') || 
                       error.toLowerCase().includes('not been registered');

  return (
    <div className="fixed inset-x-0 bottom-0 p-4 bg-white border-t shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Gmail API Configuration Required</h3>
                <p className="text-sm mt-1 text-gray-600">
                  {isOriginError ? (
                    <>Your application origin is not authorized in Google Cloud Console.</>
                  ) : (
                    error
                  )}
                </p>
              </div>
              {onDismiss && (
                <button 
                  onClick={onDismiss}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={onUseMockData}
                className="flex-none px-4 py-2 bg-brand text-white text-sm font-medium rounded-md hover:bg-brand-dark transition-colors"
              >
                Continue with Demo Data
              </button>

              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-brand hover:text-brand-dark"
              >
                Open Google Cloud Console
                <ExternalLink className="w-3 h-3" />
              </a>

              {isOriginError && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Add this origin:</span>
                  <code className="px-2 py-1 bg-gray-100 rounded font-mono text-xs">
                    {currentOrigin}
                  </code>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}