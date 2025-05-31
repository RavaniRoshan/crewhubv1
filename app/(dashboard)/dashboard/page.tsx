"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardSummary } from "@/components/dashboard/dashboard-summary";
import { ProjectList } from "@/components/dashboard/project-list";
import { RecentConversations } from "@/components/dashboard/recent-conversations";
import { UsageStats } from "@/components/dashboard/usage-stats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Sparkles, BarChart2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  id: string;
  name: string;
  description?: string;
  status: string;
  model?: string;
  conversations?: number;
  members?: number;
  progress?: number;
  createdAt?: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter and search logic
  const filteredProjects = (projects || []).filter((p) => {
    if (filter !== "all" && p.status !== filter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Stats (replace with real API usage/costs as needed)
  const stats = [
    {
      title: "Active Projects",
      value: projects ? projects.filter((p) => p.status === "active").length : "-",
      icon: <Plus className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Projects",
      value: projects ? projects.length : "-",
      icon: <Sparkles className="h-4 w-4 text-muted-foreground" />,
    },
    // Add API usage/costs here if available
  ];

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Welcome${session?.user?.name ? ", " + session.user.name : ""}!`}
        text="Manage your AI projects and monitor usage"
      >
        <div className="flex gap-2">
          <Button variant="default" size="sm">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
          <Button variant="outline" size="sm">
            <Sparkles className="mr-2 h-4 w-4" /> Browse Templates
          </Button>
          <Button variant="outline" size="sm">
            <BarChart2 className="mr-2 h-4 w-4" /> View Usage
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardSummary stats={stats} loading={loading} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8 mb-4">
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64"
            startIcon={<Search className="h-4 w-4 text-muted-foreground" />}
          />
          <select
            className="border rounded-md px-2 py-1 text-sm bg-background"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter projects"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">No projects found.</div>
      ) : (
        <ProjectList projects={filteredProjects} />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <UsageStats className="col-span-4" />
        <RecentConversations className="col-span-3" />
      </div>
    </DashboardShell>
  );
}