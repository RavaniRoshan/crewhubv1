import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardSummary } from "@/components/dashboard/dashboard-summary";
import { ProjectList } from "@/components/dashboard/project-list";
import { RecentConversations } from "@/components/dashboard/recent-conversations";
import { UsageStats } from "@/components/dashboard/usage-stats";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Manage your AI projects and monitor usage"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardSummary />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <UsageStats className="col-span-4" />
        <RecentConversations className="col-span-3" />
      </div>
      <ProjectList />
    </DashboardShell>
  );
}