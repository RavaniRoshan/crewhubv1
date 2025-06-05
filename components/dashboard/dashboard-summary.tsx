import { StatCard } from "@/components/dashboard/stat-card";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Stat {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface DashboardSummaryProps {
  stats: Stat[];
  loading?: boolean;
}

export function DashboardSummary({ stats, loading }: DashboardSummaryProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-28 mb-2" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 via-accent/5 to-transparent opacity-30"></div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <StatCard
          key={item.title}
          label={item.title}
          value={item.value}
          icon={item.icon}
          change={item.change}
          trend={item.trend}
        />
      ))}
    </div>
  );
}