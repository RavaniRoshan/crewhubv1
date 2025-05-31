import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * LoadingSpinner for indicating loading state.
 * @param {object} props
 * @param {"sm"|"md"|"lg"} [props.size] - Spinner size.
 * @param {string} [props.className] - Additional class names.
 */
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
};

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <Loader2 className={cn('animate-spin text-muted-foreground', sizeMap[size], className)} />
  );
} 