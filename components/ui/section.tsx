import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Section component for grouping content with optional header and description.
 * @param {object} props
 * @param {string} [props.title] - Section title.
 * @param {string} [props.description] - Section description.
 * @param {React.ReactNode} props.children - Section content.
 * @param {string} [props.className] - Additional class names.
 */
export interface SectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, description, children, className }: SectionProps) {
  return (
    <section className={cn('py-8', className)}>
      {(title || description) && (
        <header className="mb-4">
          {title && <h2 className="text-xl font-bold mb-1">{title}</h2>}
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </header>
      )}
      {children}
    </section>
  );
} 