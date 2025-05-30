"use client";

import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  sidebarContent?: React.ReactNode;
}

export function ResponsiveContainer({
  children,
  className,
  sidebarContent,
}: ResponsiveContainerProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <div className="flex">
        {/* Sidebar - hidden on mobile, visible on desktop */}
        {sidebarContent && (
          <div className="hidden lg:block w-64 min-h-screen border-r">
            {sidebarContent}
          </div>
        )}
        
        {/* Main content area */}
        <main className="flex-1 min-h-screen">
          <div className="container py-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}