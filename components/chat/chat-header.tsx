"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Archive,
  Download,
  MoreHorizontal,
  Pencil,
  Share,
  Trash,
  X,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  projectId: string;
  chatId: string;
  isNewChat: boolean;
  title?: string;
}

export function ChatHeader({
  projectId,
  chatId,
  isNewChat,
  title = "New Conversation",
}: ChatHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [conversationTitle, setConversationTitle] = useState(title);
  const [tempTitle, setTempTitle] = useState(title);

  const handleStartEditing = () => {
    setTempTitle(conversationTitle);
    setIsEditing(true);
  };

  const handleSaveTitle = () => {
    if (tempTitle.trim()) {
      setConversationTitle(tempTitle);
      // In a real app, save this to the database
    }
    setIsEditing(false);
  };

  const handleCancelEditing = () => {
    setTempTitle(conversationTitle);
    setIsEditing(false);
  };

  return (
    <div className="border-b px-4 py-3 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center gap-2 max-w-[50%]">
        <Link href={`/projects/${projectId}`}>
          <Button size="sm" variant="ghost" className="h-8">
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </Link>
        <div className="h-4 w-px bg-muted" />
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              className="h-8 text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveTitle();
                if (e.key === "Escape") handleCancelEditing();
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              className="h-8"
              onClick={handleSaveTitle}
            >
              Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8"
              onClick={handleCancelEditing}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h2 className={cn(
              "font-semibold truncate max-w-[300px]",
              isNewChat && "text-muted-foreground"
            )}>
              {conversationTitle}
            </h2>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={handleStartEditing}
            >
              <Pencil className="h-3.5 w-3.5" />
              <span className="sr-only">Edit title</span>
            </Button>
          </div>
        )}
      </div>
      {!isNewChat && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Share className="mr-2 h-4 w-4" />
              <span>Share conversation</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              <span>Export as PDF</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              <span>Archive conversation</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete conversation</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}