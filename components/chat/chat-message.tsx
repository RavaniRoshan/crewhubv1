"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Copy, 
  Check, 
  ThumbsUp, 
  ThumbsDown, 
  MoreVertical,
  User,
  Bot
} from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Format code blocks in the message
  const formatContent = (content: string) => {
    // This is a simplified example - in a real app, you'd use a proper markdown renderer
    const formattedContent = content
      .split("\n")
      .map((line, i) => <div key={i}>{line || " "}</div>);
    
    return formattedContent;
  };

  if (message.role === "system") {
    return (
      <div className="rounded-md bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
        {formatContent(message.content)}
      </div>
    );
  }

  return (
    <div className={cn(
      "flex gap-4 group",
      message.role === "assistant" ? "items-start" : "items-start"
    )}>
      <Avatar className={cn(
        "h-8 w-8 mt-1",
        message.role === "assistant" 
          ? "bg-primary/10 text-primary" 
          : "bg-muted"
      )}>
        <AvatarFallback>
          {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {message.role === "assistant" ? "AI Assistant" : "You"}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
        </div>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm">
          {formatContent(message.content)}
        </div>
        
        {message.role === "assistant" && (
          <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="sm" 
              variant="ghost" 
              className={cn(
                "h-7 px-2 text-muted-foreground hover:text-foreground",
                feedback === "up" && "text-green-500 hover:text-green-600"
              )}
              onClick={() => setFeedback(feedback === "up" ? null : "up")}
            >
              <ThumbsUp className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Helpful</span>
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className={cn(
                "h-7 px-2 text-muted-foreground hover:text-foreground",
                feedback === "down" && "text-red-500 hover:text-red-600"
              )}
              onClick={() => setFeedback(feedback === "down" ? null : "down")}
            >
              <ThumbsDown className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Not helpful</span>
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-7 px-2 text-muted-foreground hover:text-foreground"
              onClick={copyToClipboard}
            >
              {isCopied ? (
                <Check className="h-3.5 w-3.5 mr-1" />
              ) : (
                <Copy className="h-3.5 w-3.5 mr-1" />
              )}
              <span className="text-xs">{isCopied ? "Copied" : "Copy"}</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 px-2 text-muted-foreground hover:text-foreground"
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Regenerate response</DropdownMenuItem>
                <DropdownMenuItem>Edit message</DropdownMenuItem>
                <DropdownMenuItem>Report issue</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}