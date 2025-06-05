import { cn } from "@/lib/utils";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import { ModeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/toaster";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({
  children,
  className,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <div className="relative">
                <BrainCircuit className="h-7 w-7 text-primary transition-colors group-hover:text-accent" />
                <div className="absolute inset-0 -z-10 blur-lg opacity-50 bg-primary group-hover:bg-accent transition-colors"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CrewHub
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r border-primary/10 bg-background/50 backdrop-blur-sm md:sticky md:block">
          <DashboardNav />
        </aside>
        <main className={cn("flex w-full flex-col overflow-hidden", className)}>
          <div className="relative flex-1 space-y-4 p-8 pt-6">
            {children}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] mask-image: linear-gradient(to bottom, transparent, white, transparent)"></div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}