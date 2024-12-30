import React from 'react';
import { Flag, Paperclip } from 'lucide-react';
import { Avatar } from './Avatar';
import { Email } from '../types/email';

interface EmailListProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
  selectedEmailId?: string;
}

export function EmailList({ emails, onSelectEmail, selectedEmailId }: EmailListProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="sticky top-0 bg-white border-b px-4 py-2 text-sm font-medium text-gray-500 flex items-center">
        Focused
      </div>
      {emails.map((email) => (
        <div
          key={email.id}
          onClick={() => onSelectEmail(email)}
          className={`flex items-center px-4 py-2 border-b cursor-pointer ${
            !email.isRead ? 'bg-brand-lighter' : 'bg-white'
          } ${selectedEmailId === email.id ? 'bg-brand-light' : ''} hover:bg-[#F3F2F1]`}
        >
          <div className="flex-shrink-0 mr-4">
            <Avatar 
              name={email.sender}
              initials={getInitials(email.sender)}
              imageUrl={email.senderImage}
              hasUnread={!email.isRead}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span className={`font-semibold truncate ${!email.isRead ? 'font-bold' : ''}`}>
                {email.sender}
              </span>
              {email.isFlagged && (
                <Flag className="w-4 h-4 text-brand ml-2" />
              )}
            </div>
            <div className="flex">
              <span className={`truncate ${!email.isRead ? 'font-semibold' : ''}`}>
                {email.subject}
              </span>
              <span className="text-gray-500 truncate ml-2">
                - {email.preview}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {email.hasAttachment && (
              <Paperclip className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-sm text-gray-500 whitespace-nowrap">{email.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}