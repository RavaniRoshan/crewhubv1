"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart,
  BrainCircuit,
  Building,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

export function DashboardNav() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: <BrainCircuit className="mr-2 h-4 w-4" />,
    },
    {
      title: "Conversations",
      href: "/conversations",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart className="mr-2 h-4 w-4" />,
    },
    {
      title: "Teams",
      href: "/teams",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: "Documents",
      href: "/documents",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Organization",
      href: "/organization",
      icon: <Building className="mr-2 h-4 w-4" />,
    },
    {
      title: "Billing",
      href: "/billing",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <nav className="grid items-start gap-2 p-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-primary/10",
              isActive
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <div className="relative">
              {item.icon}
              {isActive && (
                <div className="absolute inset-0 -z-10 blur-sm opacity-50 bg-primary"></div>
              )}
            </div>
            <span>{item.title}</span>
            {isActive && (
              <div className="ml-auto h-1 w-1 rounded-full bg-primary"></div>
            )}
          </Link>
        );
      })}
    </nav>
  );
}