import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = 'Loading...', className }: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className || ''}`} role="status" aria-live="polite">
      <Loader2 className="h-6 w-6 animate-spin mb-2 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );
} 