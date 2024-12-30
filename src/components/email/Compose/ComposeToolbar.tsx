import React from 'react';
import { Paperclip, Image, Link, Bold, Italic, List } from 'lucide-react';

interface ComposeToolbarProps {
  onAttach: () => void;
  onAddImage: () => void;
  onAddLink: () => void;
  onBold: () => void;
  onItalic: () => void;
  onList: () => void;
}

export function ComposeToolbar(props: ComposeToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-t border-b">
      <button
        onClick={props.onAttach}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Attach file"
      >
        <Paperclip className="w-4 h-4" />
      </button>
      <button
        onClick={props.onAddImage}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Insert image"
      >
        <Image className="w-4 h-4" />
      </button>
      <div className="w-px h-4 bg-gray-300 mx-1" />
      <button
        onClick={props.onAddLink}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Insert link"
      >
        <Link className="w-4 h-4" />
      </button>
      <button
        onClick={props.onBold}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={props.onItalic}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={props.onList}
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Bullet list"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}