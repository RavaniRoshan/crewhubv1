import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Flex provides a flexible box layout container.
 * @param {object} props
 * @param {React.ReactNode} props.children - Flex items.
 * @param {string} [props.className] - Additional class names.
 * @param {string} [props.direction] - flex-row, flex-col, etc.
 * @param {string} [props.align] - items-center, items-start, etc.
 * @param {string} [props.justify] - justify-center, justify-between, etc.
 * @param {string} [props.gap] - gap-2, gap-4, etc.
 */
export interface FlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: string;
  align?: string;
  justify?: string;
  gap?: string;
}

export function Flex({ children, className, direction = 'flex-row', align = '', justify = '', gap = '' }: FlexProps) {
  return (
    <div className={cn('flex', direction, align, justify, gap, className)}>
      {children}
    </div>
  );
} 