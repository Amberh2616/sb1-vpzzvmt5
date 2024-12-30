import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { CommandBar } from '../components/CommandBar';
import { Sidebar } from '../components/Sidebar';
import { EmailList } from '../components/EmailList';
import { EmailContent } from '../components/EmailContent';
import { ChatSection } from '../components/ChatSection';
import { mockEmails } from '../data/mockEmails';
import { mockChats } from '../data/mockChats';

export function MailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedEmailId, setSelectedEmailId] = React.useState<string>(id || '1');
  const selectedEmail = mockEmails.find(email => email.id === selectedEmailId) || mockEmails[0];
  const chats = mockChats[selectedEmail.sender] || [];

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex items-center px-4 py-2 bg-gray-50 border-b">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
      <CommandBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-1">
          <div className="w-[400px] flex flex-col border-r">
            <EmailList
              emails={mockEmails}
              onSelectEmail={(email) => setSelectedEmailId(email.id)}
              selectedEmailId={selectedEmailId}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-auto">
              <EmailContent email={selectedEmail} />
            </div>
            <div className="h-[300px] border-t">
              <ChatSection sender={selectedEmail.sender} messages={chats} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}