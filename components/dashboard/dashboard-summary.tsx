import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Stat {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
}

interface DashboardSummaryProps {
  stats: Stat[];
  loading?: boolean;
}

export function DashboardSummary({ stats, loading }: DashboardSummaryProps) {
  if (loading) {
    return (
      <>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-16 mt-2" />
            </CardContent>
          </Card>
        ))}
      </>
    );
  }
  return (
    <>
      {stats.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            {item.change && (
              <p className="text-xs text-muted-foreground">{item.change} from last month</p>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );
}