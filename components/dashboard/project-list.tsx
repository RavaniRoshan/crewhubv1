import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BrainCircuit,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for projects
const projects = [
  {
    id: "proj-1",
    name: "Customer Support Assistant",
    description: "An AI agent to handle customer support inquiries",
    model: "gpt-4",
    conversations: 124,
    members: 3,
    progress: 80,
    status: "active",
  },
  {
    id: "proj-2",
    name: "Content Creation Bot",
    description: "AI-powered content creation and idea generation",
    model: "claude-3-opus",
    conversations: 87,
    members: 5,
    progress: 65,
    status: "active",
  },
  {
    id: "proj-3",
    name: "Market Research Analyzer",
    description: "Analyze market trends and generate insights",
    model: "gpt-4",
    conversations: 56,
    members: 2,
    progress: 40,
    status: "active",
  },
  {
    id: "proj-4",
    name: "Code Assistant",
    description: "AI pair programmer for developers",
    model: "claude-3-sonnet",
    conversations: 92,
    members: 4,
    progress: 70,
    status: "paused",
  },
];

export function ProjectList() {
  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Your Projects</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <Link href={`/projects/${project.id}`}>
                    <CardTitle className="text-base hover:underline">
                      {project.name}
                    </CardTitle>
                  </Link>
                  <CardDescription className="line-clamp-2 text-xs">
                    {project.description}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit project</DropdownMenuItem>
                    <DropdownMenuItem>View analytics</DropdownMenuItem>
                    <DropdownMenuItem>Share project</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Delete project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BrainCircuit className="h-3 w-3" />
                  <span>{project.model}</span>
                </div>
                <span>•</span>
                <Badge
                  variant={project.status === "active" ? "default" : "outline"}
                  className="text-[10px] px-1 py-0 h-5"
                >
                  {project.status}
                </Badge>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-1" />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{project.conversations} conversations</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{project.members} members</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}