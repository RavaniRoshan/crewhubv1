import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET: Get a single workflow by ID
export async function GET(req: NextRequest, { params }: { params: { projectId: string, workflowId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const workflow = await prisma.workflow.findUnique({
    where: { id: params.workflowId, projectId: params.projectId },
  });
  if (!workflow) {
    return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
  }
  return NextResponse.json(workflow);
}

// PATCH: Update a workflow
export async function PATCH(req: NextRequest, { params }: { params: { projectId: string, workflowId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const body = await req.json();
  const { name, description, configJson, status } = body;
  const workflow = await prisma.workflow.update({
    where: { id: params.workflowId, projectId: params.projectId },
    data: { name, description, configJson, status },
  });
  return NextResponse.json(workflow);
}

// DELETE: Delete a workflow
export async function DELETE(req: NextRequest, { params }: { params: { projectId: string, workflowId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  await prisma.workflow.delete({
    where: { id: params.workflowId, projectId: params.projectId },
  });
  return NextResponse.json({ success: true });
} 