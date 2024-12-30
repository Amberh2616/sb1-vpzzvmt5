import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, RefreshCw, Server } from 'lucide-react';
import { useEmailSystem } from '../../hooks/useEmailSystem';

export function EmailTest() {
  const { fetchEmails, loading, error, isConnected } = useEmailSystem();
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  const runTest = async () => {
    setTestStatus('testing');
    setTestMessage('Testing connection...');

    try {
      await fetchEmails();
      if (isConnected) {
        setTestStatus('success');
        setTestMessage('Successfully connected to email server');
      } else {
        throw new Error('Could not establish connection to email server');
      }
    } catch (err) {
      setTestStatus('error');
      setTestMessage(err instanceof Error ? err.message : 'Failed to connect to email server');
    }
  };

  useEffect(() => {
    runTest();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <Server className="w-6 h-6 text-brand" />
        <h2 className="text-xl font-semibold">Email Connection Test</h2>
      </div>
      
      <div className="space-y-4">
        <div className={`flex items-center gap-3 p-4 rounded-md ${
          testStatus === 'error' ? 'bg-red-50' :
          testStatus === 'success' ? 'bg-green-50' :
          'bg-gray-50'
        }`}>
          {testStatus === 'testing' && (
            <RefreshCw className="w-5 h-5 text-gray-500 animate-spin" />
          )}
          {testStatus === 'success' && (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
          {testStatus === 'error' && (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          <span className={`${
            testStatus === 'error' ? 'text-red-700' :
            testStatus === 'success' ? 'text-green-700' :
            'text-gray-700'
          }`}>
            {testMessage}
          </span>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium mb-2">Connection Details</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Status:</dt>
              <dd className={`font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">API URL:</dt>
              <dd className="font-mono text-xs">{import.meta.env.VITE_API_URL}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Email:</dt>
              <dd className="font-mono text-xs">{import.meta.env.VITE_EMAIL_USER}</dd>
            </div>
          </dl>
        </div>

        <button
          onClick={runTest}
          disabled={loading}
          className="w-full px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Testing...
            </>
          ) : (
            'Test Connection Again'
          )}
        </button>

        {error && (
          <div className="text-sm text-red-600 mt-2 p-3 bg-red-50 rounded-md">
            <strong>Error Details:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
}