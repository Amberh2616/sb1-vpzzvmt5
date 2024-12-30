import { ChatMessage } from '../types/chat';

export const mockChats: Record<string, ChatMessage[]> = {
  'John Doe': [
    {
      id: '1',
      content: 'Hi, I got your email about the project update',
      timestamp: '10:31 AM',
      isOwn: false,
      sender: 'John Doe',
      senderImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '2',
      content: 'Yes, I wanted to discuss some of the points mentioned',
      timestamp: '10:32 AM',
      isOwn: true,
      sender: 'Me'
    },
    {
      id: '3',
      content: 'I think we should consider the timeline adjustments',
      timestamp: '10:33 AM',
      isOwn: false,
      sender: 'Sarah Johnson',
      senderImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '4',
      content: 'Agreed, the technical requirements need review',
      timestamp: '10:34 AM',
      isOwn: false,
      sender: 'Michael Chen',
      senderImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '5',
      content: 'I can help with the resource allocation',
      timestamp: '10:35 AM',
      isOwn: false,
      sender: 'Emily Davis',
      senderImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ],
  'Jane Smith': [/* existing Jane Smith messages */],
  'Alex Thompson': [
    {
      id: '1',
      content: 'The new design mockups are ready for review',
      timestamp: '11:20 AM',
      isOwn: false,
      sender: 'Alex Thompson',
      senderImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ],
  'Maria Garcia': [
    {
      id: '1',
      content: 'I\'ve updated the client presentation slides',
      timestamp: 'Yesterday',
      isOwn: false,
      sender: 'Maria Garcia',
      senderImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ],
  // Add more chat entries for other contacts...
};