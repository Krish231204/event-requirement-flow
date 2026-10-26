export type CategoryType = 'planner' | 'performer' | 'crew';

export type DateType = 'single' | 'range';

export type VenueType = 'Indoor' | 'Outdoor' | 'Hybrid' | 'TBD';

export type PlanningServiceLevel =
  | 'Full-Service Planning'
  | 'Partial / Month-of Coordination'
  | 'Day-of Coordination Only'
  | 'Design & Styling Only';

export type PerformerType =
  | 'Live Band'
  | 'DJ / Electronic Producer'
  | 'Solo Vocalist / Acoustic'
  | 'Magician / Illusionist'
  | 'Stand-up Comedian'
  | 'Dance Troupe'
  | 'MC / Anchor / Host'
  | 'Classical Ensemble'
  | 'Other';

export type TravelAccommodation =
  | 'Local Only (No travel needed)'
  | 'Travel Expenses Reimbursed'
  | 'Flights & Hotel Covered'
  | 'Negotiable';

export type ExperienceLevel =
  | 'Entry Level / Hands-on'
  | 'Intermediate (1-3 yrs experience)'
  | 'Senior / Certified Professional';

export type RateType = 'hourly' | 'flat_day';

export type UniformDressCode =
  | 'Event Blacks (All Black attire)'
  | 'Smart Casual'
  | 'Formal / Suit'
  | 'Branded Uniform provided on-site'
  | 'Casual / Practical';

export type EquipmentPolicy =
  | 'Crew must bring own basic tools/belt'
  | 'All tools & equipment provided on-site'
  | 'Specialized gear required';

export interface CrewRoleItem {
  roleName: string;
  headcount: number;
  callTime?: string;
  wrapTime?: string;
}

export interface PlannerDetails {
  serviceLevel: PlanningServiceLevel;
  estimatedGuests: number;
  themeAesthetic: string;
  decorRequirements: string[];
  budgetRange: {
    min: number;
    max: number;
    currency: string;
  };
  servicesNeeded: string[];
  primaryPriorities: string;
  specialNotes: string;
}

export interface PerformerDetails {
  performerType: PerformerType;
  performanceFormat: string;
  genres: string[];
  mustPlayGuidelines: string;
  soundTechNeeds: {
    paSystemProvided: boolean;
    microphonesNeeded: number;
    inEarMonitorsNeeded: boolean;
    backlineRequired: string[];
  };
  compensation: {
    amount: number;
    rateType: 'fixed' | 'hourly';
    currency: string;
  };
  soundCheckTime: string;
  hospitalityRider: string[];
  travelAccommodation: TravelAccommodation;
  audienceVibeNotes: string;
}

export interface CrewDetails {
  rolesNeeded: CrewRoleItem[];
  totalCrewCount: number;
  experienceLevel: ExperienceLevel;
  payStructure: {
    rateType: RateType;
    rateAmount: number;
    currency: string;
    overtimeTerms: string;
  };
  uniformDressCode: UniformDressCode;
  equipmentPolicy: EquipmentPolicy;
  certificationsRequired: string[];
  crewPerks: string[];
}

export interface RequirementContact {
  fullName: string;
  organization?: string;
  email: string;
  phone: string;
  preferredContactMethod: 'email' | 'phone' | 'whatsapp';
}

export interface RequirementFormData {
  // Step 1
  eventName: string;
  eventType: string;
  dateType: DateType;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  location: {
    city: string;
    state?: string;
    country: string;
    address?: string;
  };
  venue: {
    name?: string;
    isVenueBooked: boolean;
    venueType: VenueType;
  };
  category: CategoryType;

  // Step 2 & 3
  plannerDetails: PlannerDetails;
  performerDetails: PerformerDetails;
  crewDetails: CrewDetails;

  // Step 4
  contact: RequirementContact;
}

export interface SavedRequirement extends RequirementFormData {
  _id: string;
  referenceCode: string;
  status: 'draft' | 'active' | 'in_review' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface RequirementStats {
  total: number;
  planner: number;
  performer: number;
  crew: number;
}
