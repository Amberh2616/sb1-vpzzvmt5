import React, { useState } from 'react';
import { Send, Mail, Paperclip, Image, Smile, CheckSquare } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatAvatar } from './ChatAvatar';

interface ChatSectionProps {
  sender: string;
  messages: ChatMessageType[];
}

export function ChatSection({ sender, messages }: ChatSectionProps) {
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

  const handleAddTodo = () => {
    // Handle adding to todo list
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-3 bg-white border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ChatAvatar name={sender} />
          <h2 className="font-semibold">Chat with {sender}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateEmail}
            className="text-xs px-3 py-1.5 bg-brand-lighter text-brand rounded-md hover:bg-brand-light flex items-center gap-1"
          >
            <Mail className="w-3 h-3" />
            Generate Email
          </button>
          <button
            onClick={handleAddTodo}
            className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-1"
          >
            <CheckSquare className="w-3 h-3" />
            Add To-Do
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            {...message} 
            sender={message.sender}
          />
        ))}
      </div>

      <div className="p-3 bg-white border-t">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Paperclip className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Image className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Smile className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-md px-3 py-1.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-md bg-brand text-white hover:bg-brand-dark"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}