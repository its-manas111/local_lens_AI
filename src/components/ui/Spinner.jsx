// TODO: Build reusable Spinner component with configurable size, color,
// and optional label text. Used across all loading states in the app.
import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Spinner({ size = 'md', label = '', className = '' }) {
  // TODO: Map size to w/h Tailwind classes
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Loader2 className="animate-spin w-5 h-5 text-primary" />
      {label && <span className="text-xs text-muted-foreground font-light">{label}</span>}
    </div>
  );
}
