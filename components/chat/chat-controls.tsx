"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, Zap } from "lucide-react";

interface ChatControlsProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function ChatControls({
  selectedModel,
  onModelChange,
}: ChatControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger className="w-[180px] h-8 text-xs">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4">GPT-4</SelectItem>
            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
            <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
            <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
          </SelectContent>
        </Select>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline" className="h-8">
                <Upload className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Attach</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Attach files (Coming soon)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline" className="h-8">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Use GPT-4</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Use GPT-4 for this message only</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline" className="h-8">
                <Zap className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Advanced</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Advanced options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}