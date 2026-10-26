import { SavedRequirement, RequirementFormData, RequirementStats } from '../types/requirement';

// Initial benchmark requirements preloaded
const INITIAL_BENCHMARK_DATA: SavedRequirement[] = [
  {
    _id: 'req_seed_planner_001',
    referenceCode: 'PLA-2026-X8F2',
    eventName: 'Royal Heritage Wedding & Reception',
    eventType: 'Wedding & Reception',
    dateType: 'range',
    startDate: '2026-11-15',
    endDate: '2026-11-17',
    startTime: '16:00',
    endTime: '01:00',
    location: {
      city: 'Udaipur',
      state: 'Rajasthan',
      country: 'India',
      address: 'Lake Pichola Palace Enclave',
    },
    venue: {
      name: 'The Jagmandir Courtyard',
      isVenueBooked: true,
      venueType: 'Outdoor',
    },
    category: 'planner',
    plannerDetails: {
      serviceLevel: 'Full-Service Planning',
      estimatedGuests: 350,
      themeAesthetic: 'Regal Rajputana & Modern Candlelit Luxe',
      decorRequirements: ['Floral Canopy & Mandap', 'Ambient & Mood Lighting', 'Entrance Welcome Arches'],
      budgetRange: { min: 8000, max: 15000, currency: 'USD' },
      servicesNeeded: [
        'Vendor Sourcing & Contract Negotiation',
        'Comprehensive Budget Management',
        'Master Timeline & Run of Show',
        'On-Site Day-of Coordination',
      ],
      primaryPriorities: 'Flawless guest hospitality, seamless coordination between sangeet and royal dinner.',
      specialNotes: 'VIP guests arriving by private boat; need designated liaison.',
    },
    performerDetails: {
      performerType: 'Live Band',
      performanceFormat: '',
      genres: [],
      mustPlayGuidelines: '',
      soundTechNeeds: { paSystemProvided: false, microphonesNeeded: 0, inEarMonitorsNeeded: false, backlineRequired: [] },
      compensation: { amount: 0, rateType: 'fixed', currency: 'USD' },
      soundCheckTime: '',
      hospitalityRider: [],
      travelAccommodation: 'Negotiable',
      audienceVibeNotes: '',
    },
    crewDetails: {
      rolesNeeded: [],
      totalCrewCount: 0,
      experienceLevel: 'Intermediate (1-3 yrs experience)',
      payStructure: { rateType: 'flat_day', rateAmount: 0, currency: 'USD', overtimeTerms: '' },
      uniformDressCode: 'Event Blacks (All Black attire)',
      equipmentPolicy: 'All tools & equipment provided on-site',
      certificationsRequired: [],
      crewPerks: [],
    },
    contact: {
      fullName: 'Ananya Singhania',
      organization: 'Singhania Family Office',
      email: 'ananya@singhania.example.com',
      phone: '+91 98765 43210',
      preferredContactMethod: 'whatsapp',
    },
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'req_seed_performer_002',
    referenceCode: 'PER-2026-9BK4',
    eventName: 'Neon Horizons Music Fest 2026',
    eventType: 'Music Festival / Concert',
    dateType: 'single',
    startDate: '2026-12-05',
    endDate: '',
    startTime: '19:00',
    endTime: '23:30',
    location: {
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
      address: 'Whitefield Arena Grounds',
    },
    venue: {
      name: 'Main Stage Pavilion',
      isVenueBooked: true,
      venueType: 'Outdoor',
    },
    category: 'performer',
    plannerDetails: {
      serviceLevel: 'Full-Service Planning',
      estimatedGuests: 100,
      themeAesthetic: '',
      decorRequirements: [],
      budgetRange: { min: 0, max: 0, currency: 'USD' },
      servicesNeeded: [],
      primaryPriorities: '',
      specialNotes: '',
    },
    performerDetails: {
      performerType: 'DJ / Electronic Producer',
      performanceFormat: 'Headliner 90-min High Energy Set',
      genres: ['EDM / Electronic / House', 'Indie Rock / Alternative'],
      mustPlayGuidelines: 'Build up from 124 BPM melodic to peak 128 BPM festival anthems.',
      soundTechNeeds: {
        paSystemProvided: true,
        microphonesNeeded: 2,
        inEarMonitorsNeeded: true,
        backlineRequired: ['Pioneer CDJ-3000 x2 + DJM-900 Mixer', 'Stereo Stage Wedge Monitors'],
      },
      compensation: {
        amount: 4500,
        rateType: 'fixed',
        currency: 'USD',
      },
      soundCheckTime: '16:00 - 17:00',
      hospitalityRider: ['Dedicated Private Green Room', 'Hot Catered Meals & Beverage Rider', 'Guaranteed Reserved Parking Spot'],
      travelAccommodation: 'Flights & Hotel Covered',
      audienceVibeNotes: 'Anticipating 4,000+ vibrant electronic music fans.',
    },
    crewDetails: {
      rolesNeeded: [],
      totalCrewCount: 0,
      experienceLevel: 'Intermediate (1-3 yrs experience)',
      payStructure: { rateType: 'flat_day', rateAmount: 0, currency: 'USD', overtimeTerms: '' },
      uniformDressCode: 'Event Blacks (All Black attire)',
      equipmentPolicy: 'All tools & equipment provided on-site',
      certificationsRequired: [],
      crewPerks: [],
    },
    contact: {
      fullName: 'Rohan Mehta',
      organization: 'Horizon Live Entertainment',
      email: 'rohan@horizonlive.example.com',
      phone: '+91 91234 56789',
      preferredContactMethod: 'email',
    },
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'req_seed_crew_003',
    referenceCode: 'CRE-2026-4TR7',
    eventName: 'Global Tech Innovation Summit 2026',
    eventType: 'Conference / Summit',
    dateType: 'range',
    startDate: '2026-11-28',
    endDate: '2026-11-29',
    startTime: '08:00',
    endTime: '18:00',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      address: 'Bandra Kurla Complex (BKC)',
    },
    venue: {
      name: 'Jio World Convention Centre - Hall 3',
      isVenueBooked: true,
      venueType: 'Indoor',
    },
    category: 'crew',
    plannerDetails: {
      serviceLevel: 'Full-Service Planning',
      estimatedGuests: 100,
      themeAesthetic: '',
      decorRequirements: [],
      budgetRange: { min: 0, max: 0, currency: 'USD' },
      servicesNeeded: [],
      primaryPriorities: '',
      specialNotes: '',
    },
    performerDetails: {
      performerType: 'Live Band',
      performanceFormat: '',
      genres: [],
      mustPlayGuidelines: '',
      soundTechNeeds: { paSystemProvided: false, microphonesNeeded: 0, inEarMonitorsNeeded: false, backlineRequired: [] },
      compensation: { amount: 0, rateType: 'fixed', currency: 'USD' },
      soundCheckTime: '',
      hospitalityRider: [],
      travelAccommodation: 'Negotiable',
      audienceVibeNotes: '',
    },
    crewDetails: {
      rolesNeeded: [
        {
          roleName: 'Front of House (FOH) Audio Engineer',
          headcount: 2,
          callTime: '06:30',
          wrapTime: '19:00',
        },
        {
          roleName: 'Camera Operator / Live Streaming',
          headcount: 4,
          callTime: '07:00',
          wrapTime: '18:30',
        },
        {
          roleName: 'Usher & Guest Registration Staff',
          headcount: 6,
          callTime: '07:30',
          wrapTime: '17:00',
        },
      ],
      totalCrewCount: 12,
      experienceLevel: 'Senior / Certified Professional',
      payStructure: {
        rateType: 'flat_day',
        rateAmount: 260,
        currency: 'USD',
        overtimeTerms: '1.5x after 10 hours',
      },
      uniformDressCode: 'Event Blacks (All Black attire)',
      equipmentPolicy: 'All tools & equipment provided on-site',
      certificationsRequired: ['Electrical Safety & Power Distribution', 'First Aid / CPR / AED Certified'],
      crewPerks: ['Hot Catered Lunch / Dinner', 'Continuous Hydration & Snack Station', 'Local Travel Reimbursement'],
    },
    contact: {
      fullName: 'Vikram Joshi',
      organization: 'TechSummit Global Media',
      email: 'vikram.j@techsummit.example.com',
      phone: '+91 98888 77777',
      preferredContactMethod: 'phone',
    },
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// In-memory store that persists across serverless function invocations
declare global {
  // eslint-disable-next-line no-var
  var __GLOBAL_REQUIREMENTS_STORE__: SavedRequirement[] | undefined;
}

if (!globalThis.__GLOBAL_REQUIREMENTS_STORE__) {
  globalThis.__GLOBAL_REQUIREMENTS_STORE__ = [...INITIAL_BENCHMARK_DATA];
}

export function getAllRequirements(filters?: {
  category?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const store = globalThis.__GLOBAL_REQUIREMENTS_STORE__ || [];
  let result = [...store];

  if (filters?.category && ['planner', 'performer', 'crew'].includes(filters.category)) {
    result = result.filter((r) => r.category === filters.category);
  }

  if (filters?.status) {
    result = result.filter((r) => r.status === filters.status);
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.trim().toLowerCase();
    result = result.filter(
      (r) =>
        r.eventName.toLowerCase().includes(q) ||
        r.location.city.toLowerCase().includes(q) ||
        r.referenceCode.toLowerCase().includes(q) ||
        (r.venue.name && r.venue.name.toLowerCase().includes(q))
    );
  }

  const page = Math.max(1, filters?.page || 1);
  const limit = Math.max(1, Math.min(100, filters?.limit || 20));
  const total = result.length;
  const startIndex = (page - 1) * limit;
  const paginated = result.slice(startIndex, startIndex + limit);

  return {
    data: paginated,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export function getRequirementById(idOrRef: string) {
  const store = globalThis.__GLOBAL_REQUIREMENTS_STORE__ || [];
  return store.find(
    (r) => r._id === idOrRef || r.referenceCode.toUpperCase() === idOrRef.toUpperCase()
  );
}

export function addRequirement(payload: RequirementFormData): SavedRequirement {
  const year = new Date().getFullYear();
  const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
  const catCode = payload.category ? payload.category.substring(0, 3).toUpperCase() : 'REQ';
  const referenceCode = `${catCode}-${year}-${randomHex}`;
  const _id = 'req_' + Math.random().toString(36).substring(2, 11);

  // Partition payload strictly by category
  const item: SavedRequirement = {
    ...payload,
    _id,
    referenceCode,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const raw = item as unknown as Record<string, unknown>;
  if (item.category === 'planner') {
    delete raw.performerDetails;
    delete raw.crewDetails;
  } else if (item.category === 'performer') {
    delete raw.plannerDetails;
    delete raw.crewDetails;
  } else if (item.category === 'crew') {
    delete raw.plannerDetails;
    delete raw.performerDetails;
  }

  if (!globalThis.__GLOBAL_REQUIREMENTS_STORE__) {
    globalThis.__GLOBAL_REQUIREMENTS_STORE__ = [];
  }
  globalThis.__GLOBAL_REQUIREMENTS_STORE__.unshift(item);

  return item;
}

export function getStats(): RequirementStats {
  const store = globalThis.__GLOBAL_REQUIREMENTS_STORE__ || [];
  const stats: RequirementStats = {
    total: store.length,
    planner: store.filter((r) => r.category === 'planner').length,
    performer: store.filter((r) => r.category === 'performer').length,
    crew: store.filter((r) => r.category === 'crew').length,
  };
  return stats;
}

export function resetSeedRequirements(): SavedRequirement[] {
  globalThis.__GLOBAL_REQUIREMENTS_STORE__ = [...INITIAL_BENCHMARK_DATA];
  return globalThis.__GLOBAL_REQUIREMENTS_STORE__;
}
