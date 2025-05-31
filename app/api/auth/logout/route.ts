import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // For JWT session, logout is handled client-side by removing the token.
  // This endpoint is a placeholder for future session invalidation if needed.
  return NextResponse.json({ success: true });
} 