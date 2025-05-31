import React, { ReactNode, useState } from 'react';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { UserNav } from '@/components/dashboard/user-nav';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbLink, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function MainLayout({ children, breadcrumbs }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Open sidebar">
              <Menu className="h-6 w-6" />
            </button>
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs?.map((crumb, i) => (
                  <React.Fragment key={crumb.label}>
                    <BreadcrumbItem>
                      {crumb.href ? (
                        <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {i < (breadcrumbs.length - 1) && <BreadcrumbSeparator />} 
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <UserNav />
        </div>
      </header>
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-30 w-64 bg-background border-r transition-transform lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:static lg:block'
      )}>
        <DashboardNav />
      </aside>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar" />
      )}
      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        <div className="container py-6 md:py-8">{children}</div>
      </main>
    </div>
  );
}

export default MainLayout; 