import React from 'react';
import { cn } from '@/lib/utils';

/**
 * PageContainer provides consistent horizontal padding and max-width for pages.
 * @param {object} props
 * @param {React.ReactNode} props.children - Content to render inside the container.
 * @param {string} [props.className] - Additional class names.
 */
export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn('px-4 md:px-8 max-w-7xl mx-auto w-full', className)}>
      {children}
    </div>
  );
} 