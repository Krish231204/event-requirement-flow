import { NextRequest, NextResponse } from 'next/server';
import {
  getAllRequirements,
  addRequirement,
} from '../../../lib/serverStore';
import { RequirementFormData } from '../../../types/requirement';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const status = searchParams.get('status') || undefined;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : undefined;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;

  const result = getAllRequirements({ category, search, status, page, limit });

  return NextResponse.json({
    success: true,
    data: result.data,
    pagination: result.pagination,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: RequirementFormData = await request.json();

    // Validation
    const errors: Array<{ field: string; message: string }> = [];

    if (!body.eventName || body.eventName.trim().length < 2) {
      errors.push({ field: 'eventName', message: 'Event name is required (min 2 characters).' });
    }
    if (!body.eventType) {
      errors.push({ field: 'eventType', message: 'Event type is required.' });
    }
    if (!body.startDate) {
      errors.push({ field: 'startDate', message: 'Start date is required.' });
    }
    if (!body.location?.city) {
      errors.push({ field: 'location.city', message: 'City is required.' });
    }
    if (!['planner', 'performer', 'crew'].includes(body.category)) {
      errors.push({ field: 'category', message: 'Category must be planner, performer, or crew.' });
    }

    if (body.category === 'planner') {
      if (!body.plannerDetails?.serviceLevel) {
        errors.push({ field: 'plannerDetails.serviceLevel', message: 'Planning service level is required.' });
      }
      if (!body.plannerDetails?.estimatedGuests || body.plannerDetails.estimatedGuests < 1) {
        errors.push({ field: 'plannerDetails.estimatedGuests', message: 'Estimated guest count must be at least 1.' });
      }
    } else if (body.category === 'performer') {
      if (!body.performerDetails?.performerType) {
        errors.push({ field: 'performerDetails.performerType', message: 'Performer type is required.' });
      }
      if (!body.performerDetails?.performanceFormat?.trim()) {
        errors.push({ field: 'performerDetails.performanceFormat', message: 'Performance format is required.' });
      }
    } else if (body.category === 'crew') {
      if (!body.crewDetails?.rolesNeeded || body.crewDetails.rolesNeeded.length === 0) {
        errors.push({ field: 'crewDetails.rolesNeeded', message: 'At least one crew role is required.' });
      }
    }

    if (!body.contact?.fullName?.trim()) {
      errors.push({ field: 'contact.fullName', message: 'Full name is required.' });
    }
    if (!body.contact?.email?.trim()) {
      errors.push({ field: 'contact.email', message: 'Email address is required.' });
    }
    if (!body.contact?.phone?.trim()) {
      errors.push({ field: 'contact.phone', message: 'Phone number is required.' });
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors,
        },
        { status: 400 }
      );
    }

    const created = addRequirement(body);

    return NextResponse.json(
      {
        success: true,
        message: `Requirement successfully created under '${created.category}' category.`,
        data: created,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error processing requirement';
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}
