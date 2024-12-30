import React from 'react';
import { Star, Paperclip } from 'lucide-react';
import { EmailMessage } from '../../../services/email/types';
import { formatDate } from '../../../utils/dateUtils';

interface EmailListItemProps {
  email: EmailMessage;
  onSelect: (email: EmailMessage) => void;
  isSelected: boolean;
}

export function EmailListItem({ email, onSelect, isSelected }: EmailListItemProps) {
  return (
    <div
      onClick={() => onSelect(email)}
      className={`flex items-center p-3 border-b cursor-pointer ${
        isSelected ? 'bg-brand-lighter' : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex-shrink-0 mr-3">
        <Star className={`w-4 h-4 ${email.flagged ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <span className="font-medium truncate">{email.from}</span>
          {email.attachments?.length > 0 && (
            <Paperclip className="w-4 h-4 ml-2 text-gray-400" />
          )}
        </div>
        <div className="text-sm text-gray-600 truncate">{email.subject}</div>
      </div>
      <div className="ml-3 text-sm text-gray-500">
        {formatDate(email.date)}
      </div>
    </div>
  );
}