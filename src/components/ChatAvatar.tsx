import React from 'react';
import { User } from 'lucide-react';

interface ChatAvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md';
}

export function ChatAvatar({ name, imageUrl, size = 'md' }: ChatAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10'
  };

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-brand-light flex items-center justify-center`}>
      <User className="w-5 h-5 text-brand" />
    </div>
  );
}