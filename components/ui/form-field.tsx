import React from 'react';
import { cn } from '@/lib/utils';

/**
 * FormField wrapper for label, input, error, and description.
 * @param {object} props
 * @param {string} props.label - Field label.
 * @param {React.ReactNode} props.children - Input element.
 * @param {string} [props.error] - Error message.
 * @param {string} [props.description] - Field description.
 * @param {string} [props.className] - Additional class names.
 */
export interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  description?: string;
  className?: string;
}

export function FormField({ label, children, error, description, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {children}
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
} 