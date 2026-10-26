import { NextResponse } from 'next/server';
import { getStats } from '../../../../lib/serverStore';

export async function GET() {
  const stats = getStats();
  return NextResponse.json({
    success: true,
    data: stats,
  });
}
