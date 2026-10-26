import mongoose from 'mongoose';

const plannerDetailsSchema = new mongoose.Schema(
  {
    serviceLevel: {
      type: String,
      enum: [
        'Full-Service Planning',
        'Partial / Month-of Coordination',
        'Day-of Coordination Only',
        'Design & Styling Only',
      ],
      required: true,
    },
    estimatedGuests: {
      type: Number,
      required: true,
      min: [1, 'Guest count must be at least 1'],
    },
    themeAesthetic: {
      type: String,
      trim: true,
      default: '',
    },
    decorRequirements: {
      type: [String],
      default: [],
    },
    budgetRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
    },
    servicesNeeded: {
      type: [String],
      default: [],
    },
    primaryPriorities: {
      type: String,
      trim: true,
      default: '',
    },
    specialNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: false }
);

const performerDetailsSchema = new mongoose.Schema(
  {
    performerType: {
      type: String,
      enum: [
        'Live Band',
        'DJ / Electronic Producer',
        'Solo Vocalist / Acoustic',
        'Magician / Illusionist',
        'Stand-up Comedian',
        'Dance Troupe',
        'MC / Anchor / Host',
        'Classical Ensemble',
        'Other',
      ],
      required: true,
    },
    performanceFormat: {
      type: String,
      trim: true,
      required: true,
    },
    genres: {
      type: [String],
      default: [],
    },
    mustPlayGuidelines: {
      type: String,
      trim: true,
      default: '',
    },
    soundTechNeeds: {
      paSystemProvided: { type: Boolean, default: false },
      microphonesNeeded: { type: Number, default: 1 },
      inEarMonitorsNeeded: { type: Boolean, default: false },
      backlineRequired: { type: [String], default: [] },
    },
    compensation: {
      amount: { type: Number, default: 0 },
      rateType: { type: String, enum: ['fixed', 'hourly'], default: 'fixed' },
      currency: { type: String, default: 'USD' },
    },
    soundCheckTime: {
      type: String,
      trim: true,
      default: '',
    },
    hospitalityRider: {
      type: [String],
      default: [],
    },
    travelAccommodation: {
      type: String,
      enum: [
        'Local Only (No travel needed)',
        'Travel Expenses Reimbursed',
        'Flights & Hotel Covered',
        'Negotiable',
      ],
      default: 'Negotiable',
    },
    audienceVibeNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: false }
);

const crewRoleSchema = new mongoose.Schema(
  {
    roleName: { type: String, required: true },
    headcount: { type: Number, default: 1, min: 1 },
    callTime: { type: String, default: '' },
    wrapTime: { type: String, default: '' },
  },
  { _id: false }
);

const crewDetailsSchema = new mongoose.Schema(
  {
    rolesNeeded: {
      type: [crewRoleSchema],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'At least one crew role must be specified',
      },
    },
    totalCrewCount: {
      type: Number,
      default: 1,
      min: 1,
    },
    experienceLevel: {
      type: String,
      enum: [
        'Entry Level / Hands-on',
        'Intermediate (1-3 yrs experience)',
        'Senior / Certified Professional',
      ],
      default: 'Intermediate (1-3 yrs experience)',
    },
    payStructure: {
      rateType: { type: String, enum: ['hourly', 'flat_day'], default: 'flat_day' },
      rateAmount: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
      overtimeTerms: { type: String, default: '' },
    },
    uniformDressCode: {
      type: String,
      enum: [
        'Event Blacks (All Black attire)',
        'Smart Casual',
        'Formal / Suit',
        'Branded Uniform provided on-site',
        'Casual / Practical',
      ],
      default: 'Event Blacks (All Black attire)',
    },
    equipmentPolicy: {
      type: String,
      enum: [
        'Crew must bring own basic tools/belt',
        'All tools & equipment provided on-site',
        'Specialized gear required',
      ],
      default: 'All tools & equipment provided on-site',
    },
    certificationsRequired: {
      type: [String],
      default: [],
    },
    crewPerks: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const requirementSchema = new mongoose.Schema(
  {
    // Step 1: Event Basics
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
      minlength: [2, 'Event name must be at least 2 characters'],
      maxlength: [140, 'Event name cannot exceed 140 characters'],
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      trim: true,
    },
    dateType: {
      type: String,
      enum: ['single', 'range'],
      default: 'single',
    },
    startDate: {
      type: String,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: String,
      default: '',
    },
    startTime: {
      type: String,
      default: '',
    },
    endTime: {
      type: String,
      default: '',
    },
    location: {
      city: { type: String, required: [true, 'City is required'], trim: true },
      state: { type: String, trim: true, default: '' },
      country: { type: String, trim: true, default: 'India' },
      address: { type: String, trim: true, default: '' },
    },
    venue: {
      name: { type: String, trim: true, default: '' },
      isVenueBooked: { type: Boolean, default: false },
      venueType: {
        type: String,
        enum: ['Indoor', 'Outdoor', 'Hybrid', 'TBD'],
        default: 'TBD',
      },
    },

    // Selected category discriminator
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['planner', 'performer', 'crew'],
        message: '{VALUE} is not a valid category. Must be planner, performer, or crew.',
      },
      index: true,
    },

    // Steps 2 & 3: Category-specific objects
    plannerDetails: {
      type: plannerDetailsSchema,
      required: function () {
        return this.category === 'planner';
      },
    },
    performerDetails: {
      type: performerDetailsSchema,
      required: function () {
        return this.category === 'performer';
      },
    },
    crewDetails: {
      type: crewDetailsSchema,
      required: function () {
        return this.category === 'crew';
      },
    },

    // Step 4: Contact & Submission metadata
    contact: {
      fullName: { type: String, required: [true, 'Contact name is required'], trim: true },
      organization: { type: String, trim: true, default: '' },
      email: {
        type: String,
        required: [true, 'Contact email is required'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      },
      phone: { type: String, required: [true, 'Contact phone is required'], trim: true },
      preferredContactMethod: {
        type: String,
        enum: ['email', 'phone', 'whatsapp'],
        default: 'email',
      },
    },

    referenceCode: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'in_review', 'completed'],
      default: 'active',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: auto-generate human-readable reference code like REQ-2026-X8K9
requirementSchema.pre('save', function (next) {
  if (!this.referenceCode) {
    const year = new Date().getFullYear();
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const catCode = this.category ? this.category.substring(0, 3).toUpperCase() : 'REQ';
    this.referenceCode = `${catCode}-${year}-${randomHex}`;
  }
  next();
});

// Indexes for high performance filtering and search
requirementSchema.index({ category: 1, status: 1, createdAt: -1 });
requirementSchema.index({ eventName: 'text', 'location.city': 'text' });

export const Requirement = mongoose.model('Requirement', requirementSchema);
