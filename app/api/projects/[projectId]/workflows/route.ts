import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const workflowSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  configJson: z.any().optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'PAUSED']).optional(),
});

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const project = await prisma.project.findUnique({ where: { id: params.projectId, userId: user.id } });
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  const workflows = await prisma.workflow.findMany({
    where: { projectId: project.id },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(workflows);
}

export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const project = await prisma.project.findUnique({ where: { id: params.projectId, userId: user.id } });
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  const body = await req.json();
  const parsed = workflowSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.errors }, { status: 400 });
  }
  const { name, description, configJson, status } = parsed.data;
  const workflow = await prisma.workflow.create({
    data: {
      projectId: project.id,
      name,
      description,
      configJson,
      status: status || 'DRAFT',
    },
  });
  return NextResponse.json(workflow, { status: 201 });
} 