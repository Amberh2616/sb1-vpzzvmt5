import React from 'react';

interface AvatarProps {
  name: string;
  initials: string;
  imageUrl?: string;
  hasUnread?: boolean;
}

export function Avatar({ name, initials, imageUrl, hasUnread = false }: AvatarProps) {
  // Generate a consistent color based on the name
  const getColorClass = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className="relative">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getColorClass(name)}`}>
          <span className="text-sm font-medium">{initials}</span>
        </div>
      )}
      {hasUnread && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
      )}
    </div>
  );
}