import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * SearchInput with debounced onChange handler.
 * @param {object} props
 * @param {string} [props.value] - Controlled value.
 * @param {(value: string) => void} props.onChange - Debounced change handler.
 * @param {number} [props.debounceMs] - Debounce delay in ms.
 * @param {string} [props.placeholder] - Input placeholder.
 * @param {string} [props.className] - Additional class names.
 */
export interface SearchInputProps {
  value?: string;
  onChange: (value: string) => void;
  debounceMs?: number;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, debounceMs = 300, placeholder = 'Search...', className }: SearchInputProps) {
  const [internal, setInternal] = useState(value || '');

  useEffect(() => {
    setInternal(value || '');
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(internal);
    }, debounceMs);
    return () => clearTimeout(handler);
  }, [internal, onChange, debounceMs]);

  return (
    <input
      type="search"
      className={cn('border rounded px-3 py-2 w-full text-sm', className)}
      value={internal}
      onChange={(e) => setInternal(e.target.value)}
      placeholder={placeholder}
      aria-label="Search"
    />
  );
} 