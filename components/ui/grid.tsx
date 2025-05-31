import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Grid provides a responsive grid layout.
 * @param {object} props
 * @param {React.ReactNode} props.children - Grid items.
 * @param {string} [props.className] - Additional class names.
 * @param {string} [props.cols] - Tailwind grid-cols classes (e.g. '1 sm:2 md:3').
 */
export interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: string; // e.g. '1 sm:2 md:3'
}

export function Grid({ children, className, cols = '1 sm:2 md:3' }: GridProps) {
  // Convert cols prop to Tailwind classes
  const gridCols = cols
    .split(' ')
    .map((c) => `grid-cols-${c}`)
    .join(' ');
  return (
    <div className={cn('grid gap-6', gridCols, className)}>{children}</div>
  );
} 