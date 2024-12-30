import React from 'react';
import { Crown } from 'lucide-react';

interface VIPIndicatorProps {
  type?: 'crown' | 'circle';
}

export function VIPIndicator({ type = 'circle' }: VIPIndicatorProps) {
  if (type === 'crown') {
    return (
      <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
        <Crown className="w-3 h-3 text-white" />
      </div>
    );
  }

  return (
    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
  );
}