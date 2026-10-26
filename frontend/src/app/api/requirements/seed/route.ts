import { NextResponse } from 'next/server';
import { resetSeedRequirements } from '../../../../lib/serverStore';

export async function POST() {
  const seeded = resetSeedRequirements();
  return NextResponse.json(
    {
      success: true,
      message: `Successfully seeded ${seeded.length} benchmark requirements.`,
      data: seeded,
    },
    { status: 201 }
  );
}
