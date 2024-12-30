import React, { useState } from 'react';
import { Send, Mail } from 'lucide-react';
import { ChatMessage } from './ChatMessage';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface ConversationDetailsProps {
  contact: {
    name: string;
    email: string;
    avatar: string;
  };
  messages: Message[];
}

export function ConversationDetails({ contact, messages }: ConversationDetailsProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  const handleGenerateEmail = () => {
    // Handle email generation
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b">
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold">{contact.name}</h2>
          <p className="text-sm text-gray-500">{contact.email}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} {...message} />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            <Send className="w-5 h-5" />
          </button>
          <button
            onClick={handleGenerateEmail}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <Mail className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}