import React from 'react';
import { Mail, Reply, ReplyAll, Forward, Delete, Archive, Clock, Tag, MoreHorizontal } from 'lucide-react';

export function CommandBar() {
  return (
    <div className="h-16 bg-white border-b flex items-center px-4 space-x-6">
      <div className="flex items-center space-x-1">
        <button className="flex flex-col items-center px-3 py-1 rounded hover:bg-gray-100">
          <Mail className="w-5 h-5 text-[#0078D4]" />
          <span className="text-xs mt-1">New</span>
        </button>
        <div className="h-12 w-px bg-gray-200 mx-2" />
        <button className="flex flex-col items-center px-3 py-1 rounded hover:bg-gray-100">
          <Reply className="w-5 h-5 text-gray-600" />
          <span className="text-xs mt-1">Reply</span>
        </button>
        <button className="flex flex-col items-center px-3 py-1 rounded hover:bg-gray-100">
          <ReplyAll className="w-5 h-5 text-gray-600" />
          <span className="text-xs mt-1">Reply all</span>
        </button>
        <button className="flex flex-col items-center px-3 py-1 rounded hover:bg-gray-100">
          <Forward className="w-5 h-5 text-gray-600" />
          <span className="text-xs mt-1">Forward</span>
        </button>
        <div className="h-12 w-px bg-gray-200 mx-2" />
        <button className="flex flex-col items-center px-3 py-1 rounded hover:bg-gray-100">
          <Delete className="w-5 h-5 text-gray-600" />
          <span className="text-xs mt-1">Delete</span>
        </button>
        <button className="flex flex-col items-center px-3 py-1 rounded hover:bg-gray-100">
          <Archive className="w-5 h-5 text-gray-600" />
          <span className="text-xs mt-1">Archive</span>
        </button>
        <div className="h-12 w-px bg-gray-200 mx-2" />
        <button className="flex flex-col items-center px-3 py-1 rounded hover:bg-gray-100">
          <Clock className="w-5 h-5 text-gray-600" />
          <span className="text-xs mt-1">Snooze</span>
        </button>
        <button className="flex flex-col items-center px-3 py-1 rounded hover:bg-gray-100">
          <Tag className="w-5 h-5 text-gray-600" />
          <span className="text-xs mt-1">Categorize</span>
        </button>
        <button className="flex flex-col items-center px-3 py-1 rounded hover:bg-gray-100">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
          <span className="text-xs mt-1">More</span>
        </button>
      </div>
    </div>
  );
}