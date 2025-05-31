import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * FileUpload with drag-and-drop and file list.
 * @param {object} props
 * @param {(files: File[]) => void} props.onFiles - Callback when files are selected.
 * @param {string} [props.accept] - Accepted file types.
 * @param {boolean} [props.multiple] - Allow multiple files.
 * @param {string} [props.className] - Additional class names.
 */
export interface FileUploadProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

export function FileUpload({ onFiles, accept, multiple = false, className }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setFileNames(arr.map(f => f.name));
    onFiles(arr);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={cn('border-2 border-dashed rounded p-4 text-center cursor-pointer transition', dragActive ? 'border-primary bg-primary/10' : 'border-muted', className)}
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
      onDrop={handleDrop}
      tabIndex={0}
      role="button"
      aria-label="Upload files"
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
      <div className="text-sm text-muted-foreground">
        Drag and drop files here or <span className="text-primary underline">browse</span>
      </div>
      {fileNames.length > 0 && (
        <ul className="mt-2 text-xs text-left">
          {fileNames.map((name) => <li key={name}>{name}</li>)}
        </ul>
      )}
    </div>
  );
} 