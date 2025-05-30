"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface ModelSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const models = [
  {
    id: "gpt-4",
    name: "GPT-4",
    description: "Most capable model, best for complex tasks",
    provider: "OpenAI",
    tokensPerMinute: 40000,
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "Fast and cost-effective",
    provider: "OpenAI",
    tokensPerMinute: 90000,
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    description: "Highest capability model from Anthropic",
    provider: "Anthropic",
    tokensPerMinute: 50000,
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    description: "Balanced performance and efficiency",
    provider: "Anthropic",
    tokensPerMinute: 70000,
  },
];

export function ModelSelector({ value, onValueChange }: ModelSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem
            key={model.id}
            value={model.id}
            className="space-y-2 py-2"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{model.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {model.provider}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {model.description}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {(model.tokensPerMinute / 1000).toFixed(0)}k TPM
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}