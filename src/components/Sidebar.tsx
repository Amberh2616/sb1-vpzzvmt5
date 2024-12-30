import React from 'react';
import { Inbox, Send, Archive, Trash, Star, File, Calendar, Users, CheckSquare } from 'lucide-react';

const menuItems = [
  { icon: Inbox, label: 'Inbox', count: 12, active: true },
  { icon: Send, label: 'Sent items' },
  { icon: Star, label: 'Favorites' },
  { icon: Archive, label: 'Archive' },
  { icon: File, label: 'Drafts', count: 2 },
  { icon: Trash, label: 'Deleted items' },
];

const apps = [
  { icon: Calendar, label: 'Calendar' },
  { icon: Users, label: 'People' },
  { icon: CheckSquare, label: 'To Do' },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-[#FAF9F8] flex flex-col h-full border-r">
      <div className="p-4">
        <button className="w-full bg-brand text-white rounded py-3 px-5 text-left font-semibold hover:bg-brand-dark">
          New message
        </button>
      </div>
      <nav className="flex-1">
        <div className="mb-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center px-4 py-2 text-sm ${
                item.active
                  ? 'bg-[#E1DFDD] text-black'
                  : 'text-gray-700 hover:bg-[#F3F2F1]'
              }`}
            >
              <item.icon className="w-4 h-4 mr-3" />
              <span className="flex-1">{item.label}</span>
              {item.count && (
                <span className="text-xs font-medium">{item.count}</span>
              )}
            </a>
          ))}
        </div>
        <div className="pt-4 border-t">
          {apps.map((app) => (
            <a
              key={app.label}
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#F3F2F1]"
            >
              <app.icon className="w-4 h-4 mr-3" />
              {app.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}