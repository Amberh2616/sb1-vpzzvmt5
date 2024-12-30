import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockEmails } from '../data/mockEmails';
import { EmailCard } from './EmailCard';

export function EmailCollection() {
  const navigate = useNavigate();

  const handleEmailClick = (emailId: string) => {
    navigate(`/mail/${emailId}`);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockEmails.map((email) => (
          <EmailCard
            key={email.id}
            email={email}
            onClick={() => handleEmailClick(email.id)}
          />
        ))}
      </div>
    </div>
  );
}