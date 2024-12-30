import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';
import { mockEmails } from '../data/mockEmails';

export function ActiveSenders() {
  const navigate = useNavigate();
  const [readSenders, setReadSenders] = React.useState<Set<string>>(new Set());
  
  // Get unique senders that haven't been read
  const activeSenders = Array.from(
    new Set(mockEmails.map(email => email.sender))
  )
    .map(sender => mockEmails.find(email => email.sender === sender)!)
    .filter(sender => !readSenders.has(sender.sender));

  const handleSenderClick = (emailId: string, sender: string) => {
    setReadSenders(prev => new Set([...prev, sender]));
    navigate(`/mail/${emailId}`);
  };

  if (activeSenders.length === 0) {
    return null;
  }

  return (
    <div className="py-6 flex flex-col items-center gap-6">
      {activeSenders.map((sender) => (
        <button
          key={sender.sender}
          onClick={() => handleSenderClick(sender.id, sender.sender)}
          className="relative group"
        >
          <div className="ring-2 ring-brand ring-offset-2 rounded-full transition-transform transform hover:scale-110">
            <Avatar
              name={sender.sender}
              imageUrl={sender.senderImage}
              initials={sender.sender.split(' ').map(n => n[0]).join('')}
            />
          </div>
          <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            {sender.sender}
          </div>
        </button>
      ))}
    </div>
  );
}