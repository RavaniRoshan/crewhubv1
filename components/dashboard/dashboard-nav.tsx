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
      title: "Billing",
      href: "/billing",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Documentation",
      href: "/documentation",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <nav className="grid items-start px-4 py-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
            item.disabled && "pointer-events-none opacity-60"
          )}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}