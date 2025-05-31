import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

export interface ActivityItem {
  id: string;
  type: 'project' | 'workflow' | 'execution' | 'user';
  title: string;
  description?: string;
  timestamp: string;
  status?: string;
}

interface RecentActivityTimelineProps {
  activities: ActivityItem[];
}

export function RecentActivityTimeline({ activities }: RecentActivityTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-muted-foreground/20 ml-2">
          {activities.length === 0 && (
            <div className="text-muted-foreground text-sm py-4">No recent activity.</div>
          )}
          {activities.map((item) => (
            <li key={item.id} className="mb-8 ml-4">
              <div className="absolute -left-1.5 flex items-center justify-center w-3 h-3 bg-primary rounded-full ring-4 ring-background" />
              <div className="flex items-center gap-2">
                {/** @ts-expect-error temporary type workaround */}
                <Badge variant="secondary">{item.type}</Badge>
                <span className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</span>
              </div>
              <h3 className="font-semibold text-base mt-1">{item.title}</h3>
              {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
              {item.status && <span className="text-xs text-muted-foreground">Status: {item.status}</span>}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
} 