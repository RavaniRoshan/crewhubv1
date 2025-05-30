import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ProjectTabs } from "@/components/projects/project-tabs";
import { ProjectConversations } from "@/components/projects/project-conversations";
import { ProjectSettings } from "@/components/projects/project-settings";
import { ProjectAnalytics } from "@/components/projects/project-analytics";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
  searchParams: {
    tab?: string;
  };
}

export default function ProjectPage({ params, searchParams }: ProjectPageProps) {
  const { projectId } = params;
  const tab = searchParams.tab || "conversations";

  // Mock project data - in a real app, this would be fetched from the database
  const project = {
    id: projectId,
    name: "Customer Support Assistant",
    description: "An AI agent to handle customer support inquiries",
    model: "gpt-4",
    conversations: 124,
    members: 3,
    progress: 80,
    status: "active",
  };

  return (
    <DashboardShell>
      <DashboardHeader heading={project.name} text={project.description}>
        <Link href={`/projects/${projectId}/chat/new`}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Conversation
          </Button>
        </Link>
      </DashboardHeader>

      <ProjectTabs projectId={projectId} activeTab={tab} />

      {tab === "conversations" && (
        <ProjectConversations projectId={projectId} />
      )}
      {tab === "analytics" && (
        <ProjectAnalytics projectId={projectId} />
      )}
      {tab === "settings" && (
        <ProjectSettings projectId={projectId} project={project} />
      )}
    </DashboardShell>
  );
}