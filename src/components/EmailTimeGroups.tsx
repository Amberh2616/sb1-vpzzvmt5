import React from 'react';
import { Email } from '../types/email';

interface EmailTimeGroupsProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
}

export function EmailTimeGroups({ emails, onSelectEmail }: EmailTimeGroupsProps) {
  const groupedEmails = emails.reduce((groups, email) => {
    const date = email.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(email);
    return groups;
  }, {} as Record<string, Email[]>);

  return (
    <div className="divide-y">
      {Object.entries(groupedEmails).map(([date, emails]) => (
        <div key={date} className="py-2">
          <div className="px-4 py-2 sticky top-0 bg-gray-50 border-b">
            <span className="text-sm font-medium text-gray-600">{date}</span>
            <span className="text-xs text-gray-500 ml-2">({emails.length})</span>
          </div>
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => onSelectEmail(email)}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${email.isRead ? 'bg-gray-300' : 'bg-brand'}`} />
                <span className={`flex-1 truncate ${!email.isRead ? 'font-semibold' : ''}`}>
                  {email.subject}
                </span>
                {email.hasAttachment && (
                  <span className="text-xs text-gray-500">📎</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}