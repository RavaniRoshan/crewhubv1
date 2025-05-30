"use client";

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useSearchParams } from "next/navigation";

interface ProjectTabsProps {
  projectId: string;
  activeTab?: string;
}

export function ProjectTabs({ projectId, activeTab = "conversations" }: ProjectTabsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Create a new URLSearchParams instance to modify and preserve other params
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  };

  return (
    <Tabs defaultValue={activeTab} className="mb-6">
      <TabsList className="grid grid-cols-3 w-[400px]">
        <TabsTrigger 
          value="conversations" 
          asChild
        >
          <Link
            href={`${pathname}?${createQueryString("tab", "conversations")}`}
            className="w-full"
          >
            Conversations
          </Link>
        </TabsTrigger>
        <TabsTrigger 
          value="analytics" 
          asChild
        >
          <Link
            href={`${pathname}?${createQueryString("tab", "analytics")}`}
            className="w-full"
          >
            Analytics
          </Link>
        </TabsTrigger>
        <TabsTrigger 
          value="settings" 
          asChild
        >
          <Link
            href={`${pathname}?${createQueryString("tab", "settings")}`}
            className="w-full"
          >
            Settings
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}