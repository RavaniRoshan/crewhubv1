import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BrainCircuit } from 'lucide-react';

interface ProjectCardProps {
  name: string;
  description?: string;
  status: 'active' | 'archived' | 'paused' | 'deleted';
  onClick?: () => void;
  className?: string;
}

const statusConfig = {
  active: { variant: 'default', class: 'bg-primary/10 text-primary border-primary/20' },
  archived: { variant: 'outline', class: 'bg-muted/50 text-muted-foreground border-muted/30' },
  paused: { variant: 'outline', class: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  deleted: { variant: 'outline', class: 'bg-destructive/10 text-destructive border-destructive/20' },
} as const;

export function ProjectCard({ name, description, status, onClick, className }: ProjectCardProps) {
  return (
    <Card 
      className={cn(
        'group cursor-pointer relative overflow-hidden transition-all hover:border-primary/50',
        className
      )} 
      onClick={onClick} 
      tabIndex={0} 
      role="button" 
      aria-label={`Open project ${name}`}
    > 
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="relative">
            <BrainCircuit className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
            <div className="absolute inset-0 -z-10 blur-lg opacity-50 bg-primary group-hover:bg-accent transition-colors"></div>
          </div>
          <CardTitle className="text-base font-semibold truncate">{name}</CardTitle>
        </div>
        <Badge className={cn(
          'transition-all',
          statusConfig[status].class
        )}>
          {status}
        </Badge>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2 text-xs">
          {description}
        </CardDescription>
      </CardContent>
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </Card>
  );
}