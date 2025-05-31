import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  name: string;
  description?: string;
  status: 'active' | 'archived' | 'paused' | 'deleted';
  onClick?: () => void;
  className?: string;
}

export function ProjectCard({ name, description, status, onClick, className }: ProjectCardProps) {
  return (
    <Card className={cn('cursor-pointer hover:shadow-md transition-shadow', className)} onClick={onClick} tabIndex={0} role="button" aria-label={`Open project ${name}`}> 
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold truncate">{name}</CardTitle>
        {/** @ts-expect-error temporary type workaround */}
        <Badge variant={status === 'active' ? 'default' : 'outline'}>{status}</Badge>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2 text-xs">{description}</CardDescription>
      </CardContent>
    </Card>
  );
} 