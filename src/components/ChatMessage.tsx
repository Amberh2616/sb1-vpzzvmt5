import React from 'react';
import { ChatAvatar } from './ChatAvatar';

interface ChatMessageProps {
  content: string;
  timestamp: string;
  isOwn: boolean;
  sender: string;
  senderImage?: string;
}

export function ChatMessage({ content, timestamp, isOwn, sender, senderImage }: ChatMessageProps) {
  return (
    <div className={`flex items-start gap-3 mb-4 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      <ChatAvatar name={sender} imageUrl={senderImage} size="sm" />
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOwn ? 'bg-brand text-white' : 'bg-gray-100 text-gray-900'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium">{sender}</span>
        </div>
        <p className="text-sm">{content}</p>
        <span className={`text-xs ${isOwn ? 'text-brand-lighter' : 'text-gray-500'} block mt-1`}>
          {timestamp}
        </span>
      </div>
    </div>
  );
}