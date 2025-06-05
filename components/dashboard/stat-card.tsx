import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatCard({ icon, label, value, change, trend, className }: StatCardProps) {
  return (
    <Card className={cn(
      'flex flex-col overflow-hidden transition-all hover:border-primary/50 group relative',
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <div className="relative">
            <div className="text-primary group-hover:text-accent transition-colors">
              {icon}
            </div>
            <div className="absolute inset-0 -z-10 blur-lg opacity-50 bg-primary group-hover:bg-accent transition-colors"></div>
          </div>
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {value}
        </div>
        {change && (
          <p className={cn(
            "text-xs flex items-center gap-1 mt-1",
            trend === 'up' && "text-green-500",
            trend === 'down' && "text-red-500",
            trend === 'neutral' && "text-muted-foreground"
          )}>
            {change}
          </p>
        )}
      </CardContent>
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </Card>
  );
}