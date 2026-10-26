import { RequirementFormData } from '../types/requirement';

export const EVENT_TYPES = [
  'Wedding & Reception',
  'Music Festival / Concert',
  'Corporate Gala & Dinner',
  'Conference / Summit',
  'Private Party / Birthday',
  'Charity Fundraiser',
  'Exhibition / Showcase',
  'Award Ceremony',
  'Other',
];

export const PLANNER_SERVICE_LEVELS = [
  {
    value: 'Full-Service Planning',
    label: 'Full-Service Planning',
    desc: 'End-to-end event conceptualization, vendor management, budget tracking, and day-of orchestration.',
  },
  {
    value: 'Partial / Month-of Coordination',
    label: 'Partial / Month-of Coordination',
    desc: 'Final month vendor alignment, timeline construction, and day-of execution oversight.',
  },
  {
    value: 'Day-of Coordination Only',
    label: 'Day-of Coordination Only',
    desc: 'On-site execution management to ensure the master schedule and vendors stay synchronized.',
  },
  {
    value: 'Design & Styling Only',
    label: 'Design & Styling Only',
    desc: 'Creative direction, theme aesthetic, floral curation, and staging visual design.',
  },
];

export const DECOR_OPTIONS = [
  'Floral Canopy & Mandap',
  'Ambient & Mood Lighting',
  'Custom Photo Backdrop',
  'Stage Design & Rigging',
  'VIP Lounge & Furniture',
  'Table Centerpieces & Tableware',
  'Architectural Projection Mapping',
  'Entrance Welcome Arches',
];

export const PLANNER_SERVICES_LIST = [
  'Vendor Sourcing & Contract Negotiation',
  'Comprehensive Budget Management',
  'Master Timeline & Run of Show',
  'On-Site Day-of Coordination',
  'RSVP Tracking & Guest Logistics',
  'Permits & Venue Compliance',
  'Design & Moodboard Creation',
  'Rehearsal Direction',
];

export const PERFORMER_TYPES = [
  { value: 'Live Band', label: 'Live Band', desc: 'Full band ensemble (Drums, Bass, Guitar, Vocals)' },
  { value: 'DJ / Electronic Producer', label: 'DJ / Producer', desc: 'Club, festival, or open-format electronic artist' },
  { value: 'Solo Vocalist / Acoustic', label: 'Solo Vocalist / Acoustic', desc: 'Acoustic guitar/keyboard and vocals' },
  { value: 'Classical Ensemble', label: 'Classical Ensemble', desc: 'String quartet, pianist, or harpist' },
  { value: 'Stand-up Comedian', label: 'Stand-up Comedian', desc: 'Live comedy set tailored for your audience' },
  { value: 'Magician / Illusionist', label: 'Magician / Illusionist', desc: 'Stage magic or roving close-up illusion' },
  { value: 'Dance Troupe', label: 'Dance Troupe', desc: 'Choreographed dance act or cultural showcase' },
  { value: 'MC / Anchor / Host', label: 'MC / Anchor / Host', desc: 'Stage host keeping energy and agenda moving' },
];

export const MUSIC_GENRES = [
  'Pop / Top 40',
  'EDM / Electronic / House',
  'Indie Rock / Alternative',
  'Jazz / Soul / Blues',
  'Bollywood / Filmi / Sufi',
  'Hip Hop / R&B',
  'Classical / Instrumental',
  'Retro / 80s / 90s',
];

export const BACKLINE_EQUIPMENT_OPTIONS = [
  'Acoustic Drum Kit with Cymbals',
  'Bass Guitar Amplifier & Cabinet',
  'Guitar Tube Amp (e.g. Fender/Marshall)',
  '88-Key Weighted Keyboard & Stand',
  'Pioneer CDJ-3000 x2 + DJM-900 Mixer',
  'Wireless Handheld Microphones (Shure/Sennheiser)',
  'In-Ear Monitor Transmitter System',
  'Stereo Stage Wedge Monitors',
];

export const HOSPITALITY_OPTIONS = [
  'Dedicated Private Green Room',
  'Hot Catered Meals & Beverage Rider',
  'Secure Lockable Gear Storage Area',
  'Guaranteed Reserved Parking Spot',
  'Mirror, Ironing Board & Clean Towels',
  'Security Escort to/from Stage',
];

export const CREW_ROLES_PRESETS = [
  'Front of House (FOH) Audio Engineer',
  'Stagehand & Cable Puller',
  'Lighting Designer / Board Operator',
  'Camera Operator / Live Streaming',
  'Stage Manager / Deck Coordinator',
  'Event Security & Access Control',
  'Usher & Guest Registration Staff',
  'Bartender / Hospitality Runner',
];

export const CERTIFICATIONS_LIST = [
  'Electrical Safety & Power Distribution',
  'Rigging & Truss Certification',
  'Working at Heights / Boom Lift',
  'First Aid / CPR / AED Certified',
  'Licensed Event Security Guard',
  'Pyrotechnics / Special Effects',
  'Crowd Management & Fire Marshal',
];

export const CREW_PERKS_LIST = [
  'Hot Catered Lunch / Dinner',
  'Continuous Hydration & Snack Station',
  'Dedicated Crew Rest Area',
  'Local Travel Reimbursement',
  'Shift Overtime Pay (1.5x)',
];

export const DEFAULT_REQUIREMENT_FORM: RequirementFormData = {
  eventName: '',
  eventType: 'Wedding & Reception',
  dateType: 'single',
  startDate: '',
  endDate: '',
  startTime: '18:00',
  endTime: '23:00',
  location: {
    city: '',
    state: '',
    country: 'India',
    address: '',
  },
  venue: {
    name: '',
    isVenueBooked: false,
    venueType: 'Indoor',
  },
  category: 'planner',

  plannerDetails: {
    serviceLevel: 'Full-Service Planning',
    estimatedGuests: 200,
    themeAesthetic: '',
    decorRequirements: ['Ambient & Mood Lighting', 'Floral Canopy & Mandap'],
    budgetRange: {
      min: 5000,
      max: 12000,
      currency: 'USD',
    },
    servicesNeeded: [
      'Vendor Sourcing & Contract Negotiation',
      'Comprehensive Budget Management',
      'Master Timeline & Run of Show',
      'On-Site Day-of Coordination',
    ],
    primaryPriorities: '',
    specialNotes: '',
  },

  performerDetails: {
    performerType: 'DJ / Electronic Producer',
    performanceFormat: '1 x 90-minute headline set',
    genres: ['EDM / Electronic / House', 'Pop / Top 40'],
    mustPlayGuidelines: '',
    soundTechNeeds: {
      paSystemProvided: true,
      microphonesNeeded: 1,
      inEarMonitorsNeeded: true,
      backlineRequired: ['Pioneer CDJ-3000 x2 + DJM-900 Mixer', 'Stereo Stage Wedge Monitors'],
    },
    compensation: {
      amount: 3000,
      rateType: 'fixed',
      currency: 'USD',
    },
    soundCheckTime: '16:00',
    hospitalityRider: ['Dedicated Private Green Room', 'Hot Catered Meals & Beverage Rider'],
    travelAccommodation: 'Flights & Hotel Covered',
    audienceVibeNotes: '',
  },

  crewDetails: {
    rolesNeeded: [
      {
        roleName: 'Front of House (FOH) Audio Engineer',
        headcount: 1,
        callTime: '07:00',
        wrapTime: '22:00',
      },
      {
        roleName: 'Lighting Designer / Board Operator',
        headcount: 1,
        callTime: '08:00',
        wrapTime: '22:00',
      },
      {
        roleName: 'Stagehand & Cable Puller',
        headcount: 2,
        callTime: '07:30',
        wrapTime: '23:00',
      },
    ],
    totalCrewCount: 4,
    experienceLevel: 'Intermediate (1-3 yrs experience)',
    payStructure: {
      rateType: 'flat_day',
      rateAmount: 300,
      currency: 'USD',
      overtimeTerms: '1.5x rate after 10 hours',
    },
    uniformDressCode: 'Event Blacks (All Black attire)',
    equipmentPolicy: 'All tools & equipment provided on-site',
    certificationsRequired: ['Electrical Safety & Power Distribution'],
    crewPerks: ['Hot Catered Lunch / Dinner', 'Continuous Hydration & Snack Station'],
  },

  contact: {
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    preferredContactMethod: 'email',
  },
};

export const DEMO_PRESETS: Record<string, { label: string; desc: string; data: Partial<RequirementFormData> }> = {
  planner: {
    label: '✨ Palace Royal Wedding',
    desc: '350 Guests, Full-Service Planning, Floral Heritage Decor',
    data: {
      eventName: 'Grand Palace Royal Wedding & Sangeet',
      eventType: 'Wedding & Reception',
      dateType: 'range',
      startDate: '2026-11-20',
      endDate: '2026-11-22',
      startTime: '16:00',
      endTime: '02:00',
      location: {
        city: 'Jaipur',
        state: 'Rajasthan',
        country: 'India',
        address: 'Amer Heritage Road',
      },
      venue: {
        name: 'The Jai Mahal Palace Gardens',
        isVenueBooked: true,
        venueType: 'Outdoor',
      },
      category: 'planner',
      plannerDetails: {
        serviceLevel: 'Full-Service Planning',
        estimatedGuests: 350,
        themeAesthetic: 'Regal Rajputana Elegance & Warm Candlelit Glow',
        decorRequirements: ['Floral Canopy & Mandap', 'Ambient & Mood Lighting', 'Entrance Welcome Arches'],
        budgetRange: { min: 8000, max: 15000, currency: 'USD' },
        servicesNeeded: [
          'Vendor Sourcing & Contract Negotiation',
          'Comprehensive Budget Management',
          'Master Timeline & Run of Show',
          'On-Site Day-of Coordination',
        ],
        primaryPriorities: 'Ensure seamless transition between outdoor Sangeet and royal dinner banquet.',
        specialNotes: 'Require dedicated VIP liaison team for high-profile delegates.',
      },
      contact: {
        fullName: 'Vikramaditya Rathore',
        organization: 'Rathore Heritage Estates',
        email: 'vikram@rathoreestates.example.com',
        phone: '+91 98290 12345',
        preferredContactMethod: 'whatsapp',
      },
    },
  },
  performer: {
    label: '🎵 Sunwave Electronic Fest DJ',
    desc: 'Headliner DJ 90-min set, Pioneer CDJs, 5,000 attendees',
    data: {
      eventName: 'Sunwave Electronic Beach Festival 2026',
      eventType: 'Music Festival / Concert',
      dateType: 'single',
      startDate: '2026-12-19',
      startTime: '20:00',
      endTime: '01:00',
      location: {
        city: 'Goa',
        state: 'Goa',
        country: 'India',
        address: 'Vagator Beach Arena',
      },
      venue: {
        name: 'Hilltop Sunwave Amphitheatre',
        isVenueBooked: true,
        venueType: 'Outdoor',
      },
      category: 'performer',
      performerDetails: {
        performerType: 'DJ / Electronic Producer',
        performanceFormat: '1 x 90-minute prime headline set (22:30 - 00:00)',
        genres: ['EDM / Electronic / House', 'Indie Rock / Alternative'],
        mustPlayGuidelines: 'High octane melodic house and progressive techno build-ups.',
        soundTechNeeds: {
          paSystemProvided: true,
          microphonesNeeded: 2,
          inEarMonitorsNeeded: true,
          backlineRequired: [
            'Pioneer CDJ-3000 x2 + DJM-900 Mixer',
            'Stereo Stage Wedge Monitors',
            'In-Ear Monitor Transmitter System',
          ],
        },
        compensation: {
          amount: 5500,
          rateType: 'fixed',
          currency: 'USD',
        },
        soundCheckTime: '17:00 - 18:00',
        hospitalityRider: [
          'Dedicated Private Green Room',
          'Hot Catered Meals & Beverage Rider',
          'Guaranteed Reserved Parking Spot',
          'Security Escort to/from Stage',
        ],
        travelAccommodation: 'Flights & Hotel Covered',
        audienceVibeNotes: 'High-energy crowd expected, festival lighting and pyro synchronization required.',
      },
      contact: {
        fullName: 'Kavita Nair',
        organization: 'Sunwave Live Events',
        email: 'kavita@sunwavelive.example.com',
        phone: '+91 98111 22334',
        preferredContactMethod: 'email',
      },
    },
  },
  crew: {
    label: '⚡ Tech Summit AV Production Crew',
    desc: 'Audio, Lighting & Camera operators for 2-day conference',
    data: {
      eventName: 'FutureTech Global Summit 2026',
      eventType: 'Conference / Summit',
      dateType: 'range',
      startDate: '2026-11-10',
      endDate: '2026-11-11',
      startTime: '07:30',
      endTime: '19:00',
      location: {
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        address: 'Electronic City Phase 1',
      },
      venue: {
        name: 'The Grand Convention Center - Auditorium A',
        isVenueBooked: true,
        venueType: 'Indoor',
      },
      category: 'crew',
      crewDetails: {
        rolesNeeded: [
          {
            roleName: 'Front of House (FOH) Audio Engineer',
            headcount: 2,
            callTime: '06:30',
            wrapTime: '19:30',
          },
          {
            roleName: 'Camera Operator / Live Streaming',
            headcount: 4,
            callTime: '07:00',
            wrapTime: '19:00',
          },
          {
            roleName: 'Stagehand & Cable Puller',
            headcount: 3,
            callTime: '06:30',
            wrapTime: '20:00',
          },
          {
            roleName: 'Usher & Guest Registration Staff',
            headcount: 6,
            callTime: '07:15',
            wrapTime: '17:30',
          },
        ],
        totalCrewCount: 15,
        experienceLevel: 'Senior / Certified Professional',
        payStructure: {
          rateType: 'flat_day',
          rateAmount: 280,
          currency: 'USD',
          overtimeTerms: '1.5x after 9 hours on-site',
        },
        uniformDressCode: 'Event Blacks (All Black attire)',
        equipmentPolicy: 'All tools & equipment provided on-site',
        certificationsRequired: [
          'Electrical Safety & Power Distribution',
          'First Aid / CPR / AED Certified',
        ],
        crewPerks: [
          'Hot Catered Lunch / Dinner',
          'Continuous Hydration & Snack Station',
          'Dedicated Crew Rest Area',
          'Local Travel Reimbursement',
        ],
      },
      contact: {
        fullName: 'Arjun Sen',
        organization: 'Apex Technical Operations',
        email: 'arjun.sen@apextechops.example.com',
        phone: '+91 99000 88776',
        preferredContactMethod: 'phone',
      },
    },
  },
};
