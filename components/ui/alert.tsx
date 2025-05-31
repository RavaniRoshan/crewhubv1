/**
 * Alert for feedback messages with severity levels.
 * @param {object} props
 * @param {React.ReactNode} props.children - Alert content.
 * @param {"info"|"success"|"warning"|"error"|"default"} [props.severity] - Alert severity.
 * @param {string} [props.className] - Additional class names.
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      severity: {
        default: 'bg-background text-foreground',
        info: 'bg-blue-50 text-blue-900 border-blue-200',
        success: 'bg-green-50 text-green-900 border-green-200',
        warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
        error: 'bg-red-50 text-red-900 border-red-200',
      },
    },
    defaultVariants: {
      severity: 'default',
    },
  }
);

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  severity?: 'info' | 'success' | 'warning' | 'error' | 'default';
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, severity = 'default', ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ severity }), className)}
      {...props}
    />
  )
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { AlertTitle, AlertDescription };
