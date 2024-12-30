import React from 'react';
import { Reply, Forward, Trash, Archive, Flag, Save } from 'lucide-react';
import { Email, EmailRecipient } from '../types/email';
import { Avatar } from './Avatar';

interface EmailContentProps {
  email: Email;
}

function RecipientList({ recipients }: { recipients: EmailRecipient[] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {recipients.map((recipient, index) => (
        <React.Fragment key={recipient.email}>
          <div className="flex items-center gap-1">
            {recipient.image && (
              <Avatar
                name={recipient.name}
                imageUrl={recipient.image}
                initials={recipient.name.split(' ').map(n => n[0]).join('')}
              />
            )}
            <span className="text-sm">{recipient.name}</span>
            <span className="text-sm text-gray-500">&lt;{recipient.email}&gt;</span>
          </div>
          {index < recipients.length - 1 && <span className="text-gray-400">,</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export function EmailContent({ email }: EmailContentProps) {
  const handleSave = () => {
    console.log('Saving email:', email);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center gap-2 p-2 border-b bg-[#f8f8f8]">
        <button className="flex items-center gap-1 px-4 py-1.5 text-sm hover:bg-[#e1e1e1] rounded">
          <Reply className="w-4 h-4" />
          Reply
        </button>
        <button className="flex items-center gap-1 px-4 py-1.5 text-sm hover:bg-[#e1e1e1] rounded">
          <Forward className="w-4 h-4" />
          Forward
        </button>
        <div className="h-5 w-px bg-gray-300 mx-1" />
        <button className="p-1.5 hover:bg-[#e1e1e1] rounded">
          <Archive className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-[#e1e1e1] rounded">
          <Trash className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-[#e1e1e1] rounded">
          <Flag className="w-4 h-4" />
        </button>
        <button 
          onClick={handleSave}
          className="flex items-center gap-1 px-4 py-1.5 text-sm bg-brand text-white hover:bg-brand-dark rounded"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">{email.subject}</h1>
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-4">
            <Avatar
              name={email.sender}
              imageUrl={email.senderImage}
              initials={email.sender.split(' ').map(n => n[0]).join('')}
            />
            <div className="flex-1">
              <div className="font-semibold">{email.sender}</div>
              <div className="text-sm text-gray-500 mt-1">
                <div className="flex gap-2">
                  <span className="font-medium">To:</span>
                  <RecipientList recipients={email.to} />
                </div>
                {email.cc && email.cc.length > 0 && (
                  <div className="flex gap-2 mt-1">
                    <span className="font-medium">CC:</span>
                    <RecipientList recipients={email.cc} />
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500 mt-1">{email.date}</div>
            </div>
          </div>
        </div>
        <div className="prose max-w-none">{email.content}</div>
      </div>
    </div>
  );
}