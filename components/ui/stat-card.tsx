/**
 * StatCard displays a metric with icon, label, value, and optional change.
 * @param {object} props
 * @param {React.ReactNode} props.icon - Icon to display.
 * @param {string} props.label - Label for the stat.
 * @param {string|number} props.value - Value to display.
 * @param {string} [props.change] - Change indicator.
 * @param {string} [props.className] - Additional class names.
 */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  className?: string;
}

export function StatCard({ icon, label, value, change, className }: StatCardProps) {
  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">{icon}{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && <p className="text-xs text-muted-foreground">{change}</p>}
      </CardContent>
    </Card>
  );
} 