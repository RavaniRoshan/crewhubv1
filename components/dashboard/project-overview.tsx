"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Zap } from "lucide-react";
import Link from "next/link";

interface RecentChat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  model: string;
}

interface ProjectOverviewProps {
  projectId: string;
  recentChats: RecentChat[];
}

export function ProjectOverview({ projectId, recentChats }: ProjectOverviewProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Conversations</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {recentChats.map((chat) => (
              <Link
                key={chat.id}
                href={`/projects/${projectId}/chat/${chat.id}`}
                className="block"
              >
                <div className="flex items-start space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                  <div className="rounded-full bg-primary/10 p-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{chat.title}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Zap className="h-3 w-3" />
                          <span>{chat.model}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {chat.lastMessage}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(chat.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}