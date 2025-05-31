/**
 * EmptyState for displaying empty or no data messages.
 * @param {object} props
 * @param {React.ReactNode} [props.icon] - Optional icon.
 * @param {string} props.title - Title message.
 * @param {string} [props.description] - Description message.
 * @param {React.ReactNode} [props.action] - Optional action button.
 * @param {string} [props.className] - Additional class names.
 */
import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className || ''}`} role="status" aria-live="polite">
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && <p className="text-muted-foreground mb-4">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
} 