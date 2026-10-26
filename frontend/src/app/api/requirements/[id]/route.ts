import { NextRequest, NextResponse } from 'next/server';
import { getRequirementById } from '../../../../lib/serverStore';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const item = getRequirementById(params.id);

  if (!item) {
    return NextResponse.json(
      {
        success: false,
        message: `Requirement not found with identifier '${params.id}'.`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: item,
  });
}
