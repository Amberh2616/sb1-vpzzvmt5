import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Clock, Star } from 'lucide-react';
import { Avatar } from './Avatar';
import { VIPIndicator } from './VIPIndicator';
import { mockEmails } from '../data/mockEmails';
import { isVIPContact, getContactPriority } from '../utils/contactUtils';

interface Sender {
  id: string;
  name: string;
  image?: string;
  unread: number;
}

export function SenderGroups() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'starred'>('all');

  // Process emails to get unique senders with unread counts
  const senders: Sender[] = Object.values(
    mockEmails.reduce((acc, email) => {
      if (!acc[email.sender]) {
        acc[email.sender] = {
          id: email.id,
          name: email.sender,
          image: email.senderImage,
          unread: 0
        };
      }
      if (!email.isRead) {
        acc[email.sender].unread += 1;
      }
      return acc;
    }, {} as Record<string, Sender>)
  );

  // Filter senders based on search query
  const filteredSenders = senders.filter(sender =>
    sender.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort senders by VIP status, unread count, and name
  const sortedSenders = [...filteredSenders].sort((a, b) => {
    const priorityA = getContactPriority(a.name);
    const priorityB = getContactPriority(b.name);
    if (priorityA !== priorityB) return priorityA - priorityB;
    if (a.unread !== b.unread) return b.unread - a.unread;
    return a.name.localeCompare(b.name);
  });

  const handleSenderClick = (emailId: string) => {
    navigate(`/mail/${emailId}`);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
          />
        </div>
      </div>

      <div className="border-b">
        <div className="flex divide-x">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 p-2 text-sm ${
              activeTab === 'all' ? 'text-brand bg-brand-lighter' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-4 h-4 mx-auto mb-1" />
            All
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`flex-1 p-2 text-sm ${
              activeTab === 'recent' ? 'text-brand bg-brand-lighter' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Clock className="w-4 h-4 mx-auto mb-1" />
            Recent
          </button>
          <button
            onClick={() => setActiveTab('starred')}
            className={`flex-1 p-2 text-sm ${
              activeTab === 'starred' ? 'text-brand bg-brand-lighter' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Star className="w-4 h-4 mx-auto mb-1" />
            Starred
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div className="mb-4">
            <h3 className="text-xs font-medium text-gray-500 mb-2 px-2">VIP Contacts</h3>
            <div className="grid grid-cols-3 gap-2">
              {sortedSenders
                .filter(sender => isVIPContact(sender.name))
                .map((sender) => (
                  <button
                    key={sender.name}
                    onClick={() => handleSenderClick(sender.id)}
                    className="relative group p-1"
                  >
                    <div className={`relative rounded-lg p-2 transition-colors ${
                      sender.unread > 0 ? 'bg-brand-lighter' : 'hover:bg-gray-50'
                    }`}>
                      <div className="relative">
                        <Avatar
                          name={sender.name}
                          imageUrl={sender.image}
                          initials={sender.name.split(' ').map(n => n[0]).join('')}
                          hasUnread={sender.unread > 0}
                        />
                        <VIPIndicator type="crown" />
                      </div>
                      <div className="mt-1 text-xs text-center font-medium truncate">
                        {sender.name.split(' ')[0]}
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium text-gray-500 mb-2 px-2">All Contacts</h3>
            <div className="grid grid-cols-3 gap-2">
              {sortedSenders
                .filter(sender => !isVIPContact(sender.name))
                .map((sender) => (
                  <button
                    key={sender.name}
                    onClick={() => handleSenderClick(sender.id)}
                    className="relative group p-1"
                  >
                    <div className={`relative rounded-lg p-2 transition-colors ${
                      sender.unread > 0 ? 'bg-brand-lighter' : 'hover:bg-gray-50'
                    }`}>
                      <Avatar
                        name={sender.name}
                        imageUrl={sender.image}
                        initials={sender.name.split(' ').map(n => n[0]).join('')}
                        hasUnread={sender.unread > 0}
                      />
                      <div className="mt-1 text-xs text-center truncate">
                        {sender.name.split(' ')[0]}
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}