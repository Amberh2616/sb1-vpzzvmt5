import React from 'react';
import { Avatar } from './Avatar';
import { Email } from '../types/email';

interface EmailCardProps {
  email: Email;
  onClick: () => void;
}

export function EmailCard({ email, onClick }: EmailCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-3">
        <Avatar
          name={email.sender}
          imageUrl={email.senderImage}
          initials={getInitials(email.sender)}
        />
        <div>
          <div className="font-medium">{email.sender}</div>
          <div className="text-sm text-gray-500">{email.date}</div>
        </div>
      </div>
      <h3 className="font-medium mb-1">{email.subject}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{email.preview}</p>
    </div>
  );
}