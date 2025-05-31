import React from 'react';
import { cn } from '@/lib/utils';

/**
 * StatusBadge for displaying status with color variants.
 * @param {object} props
 * @param {string} props.children - Badge text.
 * @param {"success"|"warning"|"error"|"info"|"default"} [props.variant] - Badge style.
 * @param {string} [props.className] - Additional class names.
 */
export interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  className?: string;
}

const variantClasses = {
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  default: 'bg-muted text-muted-foreground border-border',
};

export function StatusBadge({ children, variant = 'default', className }: StatusBadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold', variantClasses[variant], className)}>
      {children}
    </span>
  );
} 