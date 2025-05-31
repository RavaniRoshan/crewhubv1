import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { cn } from '@/lib/utils';

/**
 * Rich Text Editor component with WYSIWYG and Markdown support.
 * @param {object} props
 * @param {string} props.value - Editor content (controlled).
 * @param {(value: string) => void} props.onChange - Content change handler.
 * @param {number} [props.debounceMs] - Debounce delay for auto-save.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string} [props.className] - Additional class names.
 */
export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
  placeholder?: string;
  className?: string;
}

// Configure Quill modules and formats
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block'],
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'code-block',
];

export function RichTextEditor({
  value,
  onChange,
  debounceMs = 1000,
  placeholder,
  className,
}: RichTextEditorProps) {
  const [editorValue, setEditorValue] = useState(value);

  // Sync external value with internal state
  useEffect(() => {
    if (value !== editorValue) {
      setEditorValue(value);
    }
  }, [value]);

  // Debounce changes for auto-save
  useEffect(() => {
    const handler = setTimeout(() => {
      if (editorValue !== value) {
        onChange(editorValue);
      }
    }, debounceMs);
    return () => clearTimeout(handler);
  }, [editorValue, debounceMs, onChange, value]);

  const handleEditorChange = (content: string) => {
    setEditorValue(content);
    // onChange is called by the debounced effect
  };

  return (
    <div className={cn('react-quill-container', className)}>
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
      {/* TODO: Markdown support with live preview */}
      {/* TODO: Image upload and embedding */}
      {/* TODO: Table insertion */}
      {/* TODO: Auto-save indicator */}
    </div>
  );
} 