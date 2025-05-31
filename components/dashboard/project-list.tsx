import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BrainCircuit,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Users,
  List,
  LayoutGrid,
  Trash2,
  Archive,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SearchInput } from "@/components/ui/search-input";
import { Pagination } from "@/components/ui/pagination";

interface Project {
  id: string;
  name: string;
  description?: string;
  status: string;
  type?: string;
  model?: string;
  conversations?: number;
  members?: number;
  progress?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectListProps {
  projects: Project[];
}

const PAGE_SIZES = [8, 16, 32];

export function ProjectList({ projects }: ProjectListProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('createdAt-desc');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  // Filter, search, sort
  let filtered = projects.filter((p) => {
    if (status !== 'all' && p.status !== status) return false;
    if (type !== 'all' && p.type !== type) return false;
    if (search && !(`${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });
  if (sort === 'name-asc') filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'name-desc') filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
  if (sort === 'createdAt-asc') filtered = filtered.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
  if (sort === 'createdAt-desc') filtered = filtered.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

  // Pagination
  const total = filtered.length;
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const allSelected = paged.length > 0 && paged.every((p) => selected.includes(p.id));

  // Bulk actions
  const toggleSelect = (id: string) => setSelected((sel) => sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]);
  const selectAll = () => setSelected(allSelected ? selected.filter(id => !paged.some(p => p.id === id)) : [...selected, ...paged.map(p => p.id).filter(id => !selected.includes(id))]);
  const clearSelected = () => setSelected([]);

  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex gap-2 items-center">
          <Button variant={view === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setView('grid')} aria-label="Grid view"><LayoutGrid className="h-4 w-4" /></Button>
          <Button variant={view === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setView('list')} aria-label="List view"><List className="h-4 w-4" /></Button>
          <SearchInput value={search} onChange={setSearch} className="ml-2 w-48" placeholder="Search projects..." />
          <select className="border rounded px-2 py-1 text-sm ml-2" value={status} onChange={e => setStatus(e.target.value)} aria-label="Filter by status">
            <option value="all">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="ARCHIVED">Archived</option>
            <option value="DELETED">Deleted</option>
          </select>
          <select className="border rounded px-2 py-1 text-sm ml-2" value={type} onChange={e => setType(e.target.value)} aria-label="Filter by type">
            <option value="all">All Types</option>
            <option value="INTERNAL">Internal</option>
            <option value="CLIENT">Client</option>
            <option value="DEMO">Demo</option>
            <option value="OTHER">Other</option>
          </select>
          <select className="border rounded px-2 py-1 text-sm ml-2" value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort by">
            <option value="createdAt-desc">Newest</option>
            <option value="createdAt-asc">Oldest</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          {selected.length > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={clearSelected}>Clear</Button>
              <Button variant="outline" size="sm"><Archive className="mr-2 h-4 w-4" />Archive</Button>
              <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" />Delete</Button>
            </>
          )}
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
      </div>
      {view === 'grid' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="flex items-center px-2">
            <input type="checkbox" checked={allSelected} onChange={selectAll} aria-label="Select all" />
          </div>
          {paged.map((project) => (
            <Card key={project.id} className="overflow-hidden relative group">
              <div className="absolute top-2 left-2">
                <input type="checkbox" checked={selected.includes(project.id)} onChange={() => toggleSelect(project.id)} aria-label="Select project" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Link href={`/projects/${project.id}`}>
                      <CardTitle className="text-base hover:underline">
                        {project.name}
                      </CardTitle>
                    </Link>
                    <CardDescription className="line-clamp-2 text-xs">
                      {project.description}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit project</DropdownMenuItem>
                      <DropdownMenuItem>View analytics</DropdownMenuItem>
                      <DropdownMenuItem>Share project</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Delete project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BrainCircuit className="h-3 w-3" />
                    <span>{project.type}</span>
                  </div>
                  <span>•</span>
                  <Badge
                    variant={project.status === "ACTIVE" ? "default" : "outline"}
                    className="text-[10px] px-1 py-0 h-5"
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{project.progress ?? 0}%</span>
                  </div>
                  <Progress value={project.progress ?? 0} className="h-1" />
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{project.conversations ?? 0} conversations</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{project.members ?? 1} members</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th><input type="checkbox" checked={allSelected} onChange={selectAll} aria-label="Select all" /></th>
                <th>Name</th>
                <th>Description</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((project) => (
                <tr key={project.id} className="border-b">
                  <td><input type="checkbox" checked={selected.includes(project.id)} onChange={() => toggleSelect(project.id)} aria-label="Select project" /></td>
                  <td><Link href={`/projects/${project.id}`} className="hover:underline font-medium">{project.name}</Link></td>
                  <td>{project.description}</td>
                  <td>{project.type}</td>
                  <td>{project.status}</td>
                  <td>{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ''}</td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit project</DropdownMenuItem>
                        <DropdownMenuItem>View analytics</DropdownMenuItem>
                        <DropdownMenuItem>Share project</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex items-center justify-between mt-4">
        <Pagination
          page={page}
          pageCount={Math.ceil(total / pageSize) || 1}
          onPageChange={setPage}
          pageSizes={PAGE_SIZES}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <div className="text-xs text-muted-foreground">{total} projects</div>
      </div>
    </div>
  );
}