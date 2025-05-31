import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * SelectAsync loads options asynchronously and supports controlled/uncontrolled modes.
 * @param {object} props
 * @param {() => Promise<{label: string, value: string}[]>} props.loadOptions - Async loader.
 * @param {string} [props.value] - Controlled value.
 * @param {(value: string) => void} [props.onChange] - Change handler.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string} [props.className] - Additional class names.
 */
export interface SelectAsyncProps {
  loadOptions: () => Promise<{ label: string; value: string }[]>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SelectAsync({ loadOptions, value, onChange, placeholder = 'Select...', className }: SelectAsyncProps) {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [internal, setInternal] = useState(value || '');

  useEffect(() => {
    setLoading(true);
    loadOptions().then((opts) => {
      setOptions(opts);
      setLoading(false);
    });
  }, [loadOptions]);

  useEffect(() => {
    setInternal(value || '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInternal(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <select
      className={cn('border rounded px-3 py-2 w-full text-sm', className)}
      value={internal}
      onChange={handleChange}
      disabled={loading}
      aria-label="Select"
    >
      <option value="" disabled>{loading ? 'Loading...' : placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
} 