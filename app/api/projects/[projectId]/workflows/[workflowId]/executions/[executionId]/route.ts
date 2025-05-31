import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateSchema = z.object({
  status: z.enum(['RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED']).optional(),
  outputData: z.any().optional(),
  errorMessage: z.string().optional(),
});

export async function GET(req: NextRequest, { params }: { params: { projectId: string, workflowId: string, executionId: string } }) {
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
  const workflow = await prisma.workflow.findUnique({ where: { id: params.workflowId, projectId: project.id } });
  if (!workflow) {
    return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
  }
  const execution = await prisma.execution.findUnique({ where: { id: params.executionId, workflowId: workflow.id } });
  if (!execution) {
    return NextResponse.json({ error: 'Execution not found' }, { status: 404 });
  }
  return NextResponse.json(execution);
}

export async function PATCH(req: NextRequest, { params }: { params: { projectId: string, workflowId: string, executionId: string } }) {
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
  const workflow = await prisma.workflow.findUnique({ where: { id: params.workflowId, projectId: project.id } });
  if (!workflow) {
    return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
  }
  const execution = await prisma.execution.findUnique({ where: { id: params.executionId, workflowId: workflow.id } });
  if (!execution) {
    return NextResponse.json({ error: 'Execution not found' }, { status: 404 });
  }
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.errors }, { status: 400 });
  }
  const updated = await prisma.execution.update({
    where: { id: params.executionId, workflowId: workflow.id },
    data: parsed.data,
  });
  return NextResponse.json(updated);
} 