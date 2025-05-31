import React, { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Sidebar with collapsible sections for navigation.
 * @param {object} props
 * @param {SidebarSection[]} props.sections - Array of sidebar sections.
 * @param {string} [props.className] - Additional class names.
 */
export interface SidebarSection {
  title: string;
  items: { label: string; href: string; icon?: React.ReactNode }[];
  defaultOpen?: boolean;
}

export interface SidebarProps {
  sections: SidebarSection[];
  className?: string;
}

export function Sidebar({ sections, className }: SidebarProps) {
  const [openSections, setOpenSections] = useState(() =>
    sections.map((s) => !!s.defaultOpen)
  );

  const toggleSection = (idx: number) => {
    setOpenSections((prev) => prev.map((open, i) => (i === idx ? !open : open)));
  };

  return (
    <aside className={cn('w-64 border-r bg-background h-full', className)}>
      <nav className="py-4">
        {sections.map((section, idx) => (
          <div key={section.title} className="mb-2">
            <button
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold hover:bg-muted rounded transition"
              onClick={() => toggleSection(idx)}
              aria-expanded={openSections[idx]}
              aria-controls={`sidebar-section-${idx}`}
            >
              <span>{section.title}</span>
              <span className={cn('transition-transform', openSections[idx] ? 'rotate-90' : '')}>
                ▶
              </span>
            </button>
            <div
              id={`sidebar-section-${idx}`}
              className={cn('pl-4', openSections[idx] ? 'block' : 'hidden')}
            >
              {section.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 py-1.5 px-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded"
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
} 