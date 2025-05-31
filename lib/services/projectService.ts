import { prisma } from '@/lib/prisma';
import { Project, User, ProjectVersion, ProjectActivityLog, ProjectType, ProjectStatus } from '@/lib/types';
import { Prisma } from '@prisma/client';

interface CreateProjectData {
  userId: string;
  name: string;
  description?: string;
  type?: ProjectType;
}

interface GetProjectsOptions {
  userId: string;
  page?: number;
  pageSize?: number;
  filter?: { status?: ProjectStatus; type?: ProjectType };
  sort?: { field: keyof Project; direction: 'asc' | 'desc' };
  includeDeleted?: boolean;
}

interface UpdateProjectData {
  name?: string;
  description?: string;
  type?: ProjectType;
  status?: ProjectStatus;
  // For optimistic locking
  updatedAt?: Date;
}

export async function createProject(data: CreateProjectData): Promise<Project> {
  try {
    const project = await prisma.project.create({
      data: {
        userId: data.userId,
        name: data.name,
        description: data.description,
        type: data.type || 'INTERNAL',
        status: 'ACTIVE',
        isDeleted: false,
      },
    });
    // TODO: Map Prisma project to Project interface
    return project as Project;
  } catch (error) {
    console.error('Error creating project:', error);
    // TODO: Handle specific errors
    throw new Error('Failed to create project');
  }
}

export async function getProjectsByUser(options: GetProjectsOptions): Promise<Project[]> {
  const { userId, page = 1, pageSize = 10, filter, sort, includeDeleted = false } = options;
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const where: Prisma.ProjectWhereInput = {
    userId,
    ...filter,
    ...(includeDeleted ? {} : { isDeleted: false }),
  };

  const orderBy: any = sort ? { [sort.field]: sort.direction } : { createdAt: 'desc' };

  try {
    const projects = await prisma.project.findMany({
      where,
      skip,
      take,
      orderBy,
      // TODO: Include relations if needed
    });
    // TODO: Map Prisma projects to Project interface
    return projects as Project[];
  } catch (error) {
    console.error('Error fetching user projects:', error);
    throw new Error('Failed to fetch user projects');
  }
}

export async function getProjectById(projectId: string, userId: string): Promise<Project | null> {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId, userId },
      // TODO: Include necessary relations (workflows, members, etc.)
    });
    // TODO: Map Prisma project to Project interface
    return project as Project | null;
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    throw new Error('Failed to fetch project');
  }
}

export async function updateProject(projectId: string, userId: string, data: UpdateProjectData): Promise<Project> {
  const { updatedAt, ...updateData } = data;
  try {
    // TODO: Implement optimistic locking check using `updatedAt`
    const project = await prisma.project.update({
      where: { id: projectId, userId },
      data: { ...updateData, updatedAt: new Date() },
    });
    // TODO: Add ProjectActivityLog entry
    // TODO: Map Prisma project to Project interface
    return project as Project;
  } catch (error) {
    console.error('Error updating project:', error);
    // TODO: Handle specific errors (e.g., project not found, optimistic locking failure)
    throw new Error('Failed to update project');
  }
}

export async function deleteProject(projectId: string, userId: string): Promise<Project> {
  try {
    // TODO: Implement cascade deletion or handle relations appropriately
    const project = await prisma.project.delete({
      where: { id: projectId, userId },
    });
    // TODO: Add ProjectActivityLog entry
    // TODO: Map Prisma project to Project interface
    return project as Project;
  } catch (error) {
    console.error('Error deleting project:', error);
    // TODO: Handle specific errors (e.g., project not found)
    throw new Error('Failed to delete project');
  }
}

export async function archiveProject(projectId: string, userId: string): Promise<Project> {
  try {
    const project = await prisma.project.update({
      where: { id: projectId, userId },
      data: { status: 'ARCHIVED' },
    });
    // TODO: Add ProjectActivityLog entry
    // TODO: Map Prisma project to Project interface
    return project as Project;
  } catch (error) {
    console.error('Error archiving project:', error);
    throw new Error('Failed to archive project');
  }
}

export async function restoreProject(projectId: string, userId: string): Promise<Project> {
  try {
    const project = await prisma.project.update({
      where: { id: projectId, userId },
      data: { status: 'ACTIVE', isDeleted: false, deletedAt: null, deletedBy: null },
    });
    // TODO: Add ProjectActivityLog entry
    // TODO: Map Prisma project to Project interface
    return project as Project;
  } catch (error) {
    console.error('Error restoring project:', error);
    throw new Error('Failed to restore project');
  }
}

// TODO: Define return type for project stats/analytics
export async function getProjectStats(projectId: string, userId: string): Promise<any> {
  try {
    // This is a placeholder. Real implementation would aggregate related data (conversations, executions, usage).
    const stats = await prisma.project.findUnique({
        where: { id: projectId, userId },
        select: {
            _count: {
                select: {
                    conversations: true,
                    workflows: true,
                }
            }
        }
    })
    // TODO: Fetch and aggregate APIUsage related to this project
    // TODO: Format stats data
    return stats;
  } catch (error) {
    console.error('Error fetching project stats:', error);
    throw new Error('Failed to fetch project stats');
  }
} 