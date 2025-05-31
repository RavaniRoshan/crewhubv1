/**
 * ConfirmDialog for destructive or confirmation actions.
 * @param {object} props
 * @param {boolean} props.open - Whether the dialog is open.
 * @param {() => void} props.onConfirm - Confirm callback.
 * @param {() => void} props.onCancel - Cancel callback.
 * @param {string} props.title - Dialog title.
 * @param {string} [props.description] - Dialog description.
 * @param {string} [props.confirmLabel] - Confirm button label.
 * @param {string} [props.cancelLabel] - Cancel button label.
 * @param {boolean} [props.loading] - Loading state.
 */
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
}

export function ConfirmDialog({ open, onConfirm, onCancel, title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', loading }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(open: boolean) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          {/* @ts-expect-error temporary type workaround */}
          <Button variant="outline" onClick={onCancel} disabled={loading}>{cancelLabel}</Button>
          {/* @ts-expect-error temporary type workaround */}
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? 'Processing...' : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ConfirmDialog as ConfirmationModal }; 