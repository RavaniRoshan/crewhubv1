"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat/chat-message";
import { ChatControls } from "@/components/chat/chat-controls";
import { PlaneIcon as PaperPlaneIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  projectId: string;
  chatId: string;
  isNewChat: boolean;
  initialModel: string;
}

export function ChatInterface({
  projectId,
  chatId,
  isNewChat,
  initialModel,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(initialModel);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate fetching messages for an existing chat
  useEffect(() => {
    if (!isNewChat) {
      // In a real app, this would fetch messages from the API
      setMessages([
        {
          id: "1",
          role: "system",
          content: "You are a helpful assistant.",
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
        },
        {
          id: "2",
          role: "user",
          content:
            "I'm thinking about adding a new feature to our product that allows users to categorize their projects. What do you think?",
          timestamp: new Date(Date.now() - 1000 * 60 * 4),
        },
        {
          id: "3",
          role: "assistant",
          content:
            "Adding categorization to projects sounds like a valuable feature! It would help users organize their work more effectively, especially as they create more projects over time. Here are some thoughts:\n\n**Benefits:**\n\n- Improved organization for users with many projects\n- Easier navigation and filtering\n- Better visual hierarchy in the UI\n- Opportunity for analytics based on categories\n\n**Implementation considerations:**\n\n1. Keep the category system simple at first - perhaps just allow a single category per project\n2. Consider using color coding for quick visual identification\n3. Allow custom categories as well as preset ones\n4. Make categorization optional so it doesn't add friction for new users\n\nWould you like me to explore any specific aspect of this feature in more depth?",
          timestamp: new Date(Date.now() - 1000 * 60 * 3),
        },
      ]);
    }
  }, [isNewChat, chatId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Thank you for your message! This is a simulated response. In a real implementation, this would connect to OpenAI or Anthropic's API to generate a proper response based on your input.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex flex-col p-4 gap-6">
            {messages.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center p-8">
                <div className="w-full max-w-md space-y-4">
                  <h3 className="text-xl font-semibold">Start a new conversation</h3>
                  <p className="text-muted-foreground">
                    Send a message to start chatting with the AI assistant.
                  </p>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>AI is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={cn(
                "resize-none pr-20",
                "min-h-20 max-h-60",
                "focus-visible:ring-1 focus-visible:ring-offset-0"
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              size="sm"
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute bottom-3 right-3"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <PaperPlaneIcon className="h-4 w-4" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </div>
          <ChatControls 
            selectedModel={selectedModel} 
            onModelChange={setSelectedModel} 
          />
        </form>
      </div>
    </div>
  );
}