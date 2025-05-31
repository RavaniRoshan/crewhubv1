import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Upload, File, Folder } from 'lucide-react';
import { Card, CardContent } from './card';

/**
 * File Manager component with drag-and-drop upload and file listing.
 * @param {object} props
 * @param {(files: File[]) => void} [props.onFileUpload] - Callback for file uploads.
 * @param {string} [props.className] - Additional class names.
 */
export interface FileManagerProps {
  onFileUpload?: (files: File[]) => void;
  className?: string;
  // TODO: Add props for displaying existing files/folders
}

export function FileManager({
  onFileUpload,
  className,
}: FileManagerProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]); // State to hold uploaded files

  // Handle drag events
  const handleDrag = useCallback(function(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle drop event
  const handleDrop = useCallback(function(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const uploadedFiles = Array.from(e.dataTransfer.files);
      setFiles(prevFiles => [...prevFiles, ...uploadedFiles]); // Add to current files
      onFileUpload?.(uploadedFiles);
      e.dataTransfer.clearData();
    }
  }, [onFileUpload]);

  // Handle file input change
  const handleFileChange = useCallback(function(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...uploadedFiles]); // Add to current files
      onFileUpload?.(uploadedFiles);
      e.target.value = ''; // Clear input for subsequent uploads
    }
  }, [onFileUpload]);

  // Input ref for triggering file selection dialog
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className={cn('p-0', className)}>
      <CardContent className="p-4">
        {/* Drag and Drop Area */}
        <div
          className={cn(
            "border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition",
            dragActive ? "border-primary bg-primary/10" : "border-muted"
          )}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Drag and drop files or click to upload"
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            // TODO: Add accept and multiple attributes based on props
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag and drop files here or click to upload
            </p>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-2">
            <h4 className="text-md font-semibold">Uploaded Files</h4>
            <ul className="space-y-1">
              {files.map((file, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <File className="h-4 w-4 flex-shrink-0" />
                  <span>{file.name} ({Math.round(file.size / 1024)} KB)</span>
                  {/* TODO: Add delete/rename actions */}
                  {/* TODO: Add progress indicator */}
                </li>
              ))}
            </ul>
            {/* TODO: Add Folder structure UI */}
          </div>
        )}

        {/* TODO: Implement file type validation and size limits */}
        {/* TODO: Implement file preview (images, PDFs, etc.) */}
        {/* TODO: Implement batch upload capabilities (handled by browser input for now) */}
        {/* TODO: Implement backend integration for file storage */}

      </CardContent>
    </Card>
  );
} 