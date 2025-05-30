import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BadgeCheck, MessageSquare, User } from "lucide-react";
import Link from "next/link";

interface RecentConversationsProps {
  className?: string;
}

// Mock data for recent conversations
const recentConversations = [
  {
    id: "conv-1",
    title: "Customer Inquiry Analysis",
    projectName: "Sales Assistant",
    model: "gpt-4",
    date: "2 hours ago",
    messages: 32,
  },
  {
    id: "conv-2",
    title: "Content Creation Workflow",
    projectName: "Marketing Bot",
    model: "claude-3-opus",
    date: "Yesterday",
    messages: 47,
  },
  {
    id: "conv-3",
    title: "Code Review Assistant",
    projectName: "Developer Tools",
    model: "gpt-4",
    date: "2 days ago",
    messages: 28,
  },
  {
    id: "conv-4",
    title: "Market Research Summary",
    projectName: "Research Assistant",
    model: "claude-3-sonnet",
    date: "3 days ago",
    messages: 64,
  },
];

export function RecentConversations({ className }: RecentConversationsProps) {
  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>Recent Conversations</CardTitle>
        <CardDescription>
          Your most recent AI conversations across all projects
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-2">
          {recentConversations.map((conversation) => (
            <div
              key={conversation.id}
              className="flex items-center justify-between rounded-md border p-3 text-sm transition-all hover:bg-muted/50"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <Link
                    href={`/conversations/${conversation.id}`}
                    className="font-medium hover:underline"
                  >
                    {conversation.title}
                  </Link>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {conversation.projectName}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        {conversation.model}
                      </span>
                      <BadgeCheck className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-muted-foreground">
                  {conversation.date}
                </span>
                <span className="text-xs font-medium">
                  {conversation.messages} messages
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button asChild variant="outline" className="w-full">
          <Link href="/conversations">View All Conversations</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}