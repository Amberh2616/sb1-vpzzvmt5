import React from 'react';
import { RefreshCw, Search, Filter } from 'lucide-react';

interface EmailListToolbarProps {
  onRefresh: () => void;
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function EmailListToolbar({ onRefresh, onSearch, isLoading }: EmailListToolbarProps) {
  return (
    <div className="p-3 border-b flex items-center gap-3">
      <div className="flex-1 relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search emails..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
      </button>
      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
        <Filter className="w-4 h-4" />
      </button>
    </div>
  );
}