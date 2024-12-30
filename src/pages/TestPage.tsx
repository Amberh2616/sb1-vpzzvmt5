import React from 'react';
import { Header } from '../components/Header';
import { EmailTest } from '../components/email/EmailTest';

export function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <EmailTest />
      </main>
    </div>
  );
}