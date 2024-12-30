import React, { useState } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import { useEmail } from '../../hooks/useEmail';
import type { EmailMessage } from '../../services/email/types';

interface ComposeEmailProps {
  onClose: () => void;
}

export function ComposeEmail({ onClose }: ComposeEmailProps) {
  const { sendEmail } = useEmail();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !subject || !content) return;

    setSending(true);
    try {
      await sendEmail({
        to: to.split(',').map(email => email.trim()),
        subject,
        text: content,
        from: 'user@example.com' // This would come from user's settings
      });
      onClose();
    } catch (err) {
      console.error('Failed to send email:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">New Message</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <input
              type="email"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          
          <div>
            <textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <Paperclip className="w-4 h-4" />
              Attach
            </button>
            
            <button
              type="submit"
              disabled={sending}
              className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded hover:bg-brand-dark disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}