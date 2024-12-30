import React from 'react';
import { Calendar, Star, Clock, Tag, Filter } from 'lucide-react';

export function EmailFilters() {
  return (
    <div className="p-4 border-b bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Filters</h2>
        <button className="text-sm text-brand hover:text-brand-dark">Reset</button>
      </div>
      <div className="space-y-2">
        <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Today</span>
          </div>
          <span className="text-xs bg-brand-lighter text-brand px-2 py-0.5 rounded">12</span>
        </button>
        <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Important</span>
          </div>
          <span className="text-xs bg-brand-lighter text-brand px-2 py-0.5 rounded">5</span>
        </button>
        <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Unread</span>
          </div>
          <span className="text-xs bg-brand-lighter text-brand px-2 py-0.5 rounded">8</span>
        </button>
        <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Labels</span>
          </div>
          <Filter className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}