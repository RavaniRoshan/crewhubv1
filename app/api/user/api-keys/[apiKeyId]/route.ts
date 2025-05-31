import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateSchema = z.object({
  isActive: z.boolean(),
});

export async function PATCH(req: NextRequest, { params }: { params: { apiKeyId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const apiKey = await prisma.apiKey.findUnique({ where: { id: params.apiKeyId, userId: user.id } });
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not found' }, { status: 404 });
  }
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.errors }, { status: 400 });
  }
  const updated = await prisma.apiKey.update({
    where: { id: params.apiKeyId, userId: user.id },
    data: parsed.data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { apiKeyId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const apiKey = await prisma.apiKey.findUnique({ where: { id: params.apiKeyId, userId: user.id } });
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not found' }, { status: 404 });
  }
  await prisma.apiKey.delete({ where: { id: params.apiKeyId, userId: user.id } });
  return NextResponse.json({ success: true });
} 