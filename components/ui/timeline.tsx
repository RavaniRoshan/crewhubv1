import React from 'react';
import { cn } from '@/lib/utils';
import { StatusBadge } from './status-badge';

/**
 * Timeline for displaying activity feeds.
 * @param {object} props
 * @param {TimelineItem[]} props.items - Timeline events.
 * @param {string} [props.className] - Additional class names.
 */
export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status?: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn('relative border-l border-muted-foreground/20 ml-2', className)}>
      {items.length === 0 && (
        <div className="text-muted-foreground text-sm py-4">No recent activity.</div>
      )}
      {items.map((item) => (
        <li key={item.id} className="mb-8 ml-4">
          <div className="absolute -left-1.5 flex items-center justify-center w-3 h-3 bg-primary rounded-full ring-4 ring-background" />
          <div className="flex items-center gap-2">
            <StatusBadge variant={item.variant || 'default'}>{item.status || 'event'}</StatusBadge>
            <span className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</span>
          </div>
          <h3 className="font-semibold text-base mt-1">{item.title}</h3>
          {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
        </li>
      ))}
    </ol>
  );
} 