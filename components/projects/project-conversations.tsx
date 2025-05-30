import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Archive, MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";

interface ProjectConversationsProps {
  projectId: string;
}

// Mock data for conversations
const conversations = [
  {
    id: "conv-1",
    title: "New product feature discussion",
    model: "gpt-4",
    date: "2 hours ago",
    messages: 32,
    tokens: 12450,
    cost: 0.25,
    status: "active",
  },
  {
    id: "conv-2",
    title: "Customer onboarding workflow",
    model: "claude-3-opus",
    date: "Yesterday",
    messages: 47,
    tokens: 18320,
    cost: 0.37,
    status: "active",
  },
  {
    id: "conv-3",
    title: "Support ticket analysis",
    model: "gpt-4",
    date: "2 days ago",
    messages: 28,
    tokens: 9840,
    cost: 0.20,
    status: "archived",
  },
  {
    id: "conv-4",
    title: "User feedback review",
    model: "claude-3-sonnet",
    date: "3 days ago",
    messages: 64,
    tokens: 24680,
    cost: 0.49,
    status: "active",
  },
  {
    id: "conv-5",
    title: "Marketing campaign ideas",
    model: "gpt-4",
    date: "5 days ago",
    messages: 42,
    tokens: 15760,
    cost: 0.32,
    status: "active",
  },
];

export function ProjectConversations({ projectId }: ProjectConversationsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Conversations</CardTitle>
          <CardDescription>
            Manage your AI conversations in this project
          </CardDescription>
        </div>
        <Link href={`/projects/${projectId}/chat/new`}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Conversation
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Messages</TableHead>
              <TableHead>Tokens</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conversations.map((conversation) => (
              <TableRow key={conversation.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/conversations/${conversation.id}`}
                    className="hover:underline"
                  >
                    {conversation.title}
                  </Link>
                </TableCell>
                <TableCell>{conversation.model}</TableCell>
                <TableCell>{conversation.messages}</TableCell>
                <TableCell>{conversation.tokens.toLocaleString()}</TableCell>
                <TableCell>${conversation.cost}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      conversation.status === "active" ? "default" : "outline"
                    }
                  >
                    {conversation.status}
                  </Badge>
                </TableCell>
                <TableCell>{conversation.date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View conversation</DropdownMenuItem>
                      <DropdownMenuItem>Share conversation</DropdownMenuItem>
                      <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Archive className="mr-2 h-4 w-4" />
                        Archive conversation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}