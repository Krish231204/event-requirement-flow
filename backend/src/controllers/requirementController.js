import { Requirement } from '../models/Requirement.js';

/**
 * Create a new event requirement
 */
export async function createRequirement(req, res, next) {
  try {
    const payload = { ...req.body };

    // Enforce clean data partitioning based on selected category
    if (payload.category === 'planner') {
      delete payload.performerDetails;
      delete payload.crewDetails;
    } else if (payload.category === 'performer') {
      delete payload.plannerDetails;
      delete payload.crewDetails;
    } else if (payload.category === 'crew') {
      delete payload.plannerDetails;
      delete payload.performerDetails;
    }

    const requirement = new Requirement(payload);
    await requirement.save();

    return res.status(201).json({
      success: true,
      message: `Requirement successfully created under '${requirement.category}' category.`,
      data: requirement,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get all requirements with category filtering, search, and pagination
 */
export async function getRequirements(req, res, next) {
  try {
    const { category, search, status, page = 1, limit = 20 } = req.query;

    const query = {};

    if (category && ['planner', 'performer', 'crew'].includes(category)) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { eventName: regex },
        { 'location.city': regex },
        { 'venue.name': regex },
        { referenceCode: regex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [total, requirements] = await Promise.all([
      Requirement.countDocuments(query),
      Requirement.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
    ]);

    return res.status(200).json({
      success: true,
      data: requirements,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get a single requirement by ID or referenceCode
 */
export async function getRequirementById(req, res, next) {
  try {
    const { id } = req.params;

    let requirement;
    // Check if valid ObjectId or referenceCode
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      requirement = await Requirement.findById(id).lean();
    } else {
      requirement = await Requirement.findOne({ referenceCode: id.toUpperCase() }).lean();
    }

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: `Requirement not found with identifier '${id}'.`,
      });
    }

    return res.status(200).json({
      success: true,
      data: requirement,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Delete a requirement by ID
 */
export async function deleteRequirement(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Requirement.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Requirement not found to delete.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Requirement deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Aggregate metrics across categories
 */
export async function getStats(req, res, next) {
  try {
    const [counts, total] = await Promise.all([
      Requirement.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]),
      Requirement.countDocuments(),
    ]);

    const stats = {
      total,
      planner: 0,
      performer: 0,
      crew: 0,
    };

    counts.forEach((item) => {
      if (item._id && stats[item._id] !== undefined) {
        stats[item._id] = item.count;
      }
    });

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Seed realistic initial demo data
 */
export async function seedRequirements(req, res, next) {
  try {
    const sampleData = [
      {
        eventName: 'Royal Heritage Wedding & Reception',
        eventType: 'Wedding',
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
          decorRequirements: ['Floral Mandap & Canopy', 'Fairy Light Tunnel', 'Ambient Heritage Staging'],
          budgetRange: { min: 8000, max: 15000, currency: 'USD' },
          servicesNeeded: [
            'Vendor Sourcing & Negotiation',
            'Budget & Payment Management',
            'Timeline & Schedule Management',
            'On-Site Run of Show',
          ],
          primaryPriorities: 'Flawless guest hospitality, seamless coordination between sangeet and wedding.',
          specialNotes: 'VIP guests arriving by private boat; need designated liaison.',
        },
        contact: {
          fullName: 'Ananya Singhania',
          organization: 'Singhania Family Office',
          email: 'ananya@singhania.example.com',
          phone: '+91 98765 43210',
          preferredContactMethod: 'whatsapp',
        },
        status: 'active',
      },
      {
        eventName: 'Neon Horizons Music Fest 2026',
        eventType: 'Music Festival / Concert',
        dateType: 'single',
        startDate: '2026-12-05',
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
        performerDetails: {
          performerType: 'DJ / Electronic Producer',
          performanceFormat: 'Headliner 90-min High Energy Set',
          genres: ['EDM / House', 'Melodic Techno', 'Progressive Bass'],
          mustPlayGuidelines: 'Build up from 124 BPM melodic to peak 128 BPM festival anthems.',
          soundTechNeeds: {
            paSystemProvided: true,
            microphonesNeeded: 2,
            inEarMonitorsNeeded: true,
            backlineRequired: ['Pioneer CDJ-3000 x3', 'DJM-V10 Mixer', 'Stereo Booth Monitors'],
          },
          compensation: {
            amount: 4500,
            rateType: 'fixed',
            currency: 'USD',
          },
          soundCheckTime: '16:00 - 17:00',
          hospitalityRider: ['Private Green Room', 'Hot Meals & Beverages', 'Guaranteed Parking Pass'],
          travelAccommodation: 'Flights & Hotel Covered',
          audienceVibeNotes: 'Anticipating 4,000+ vibrant electronic music fans.',
        },
        contact: {
          fullName: 'Rohan Mehta',
          organization: 'Horizon Live Entertainment',
          email: 'rohan@horizonlive.example.com',
          phone: '+91 91234 56789',
          preferredContactMethod: 'email',
        },
        status: 'active',
      },
      {
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
        crewDetails: {
          rolesNeeded: [
            {
              roleName: 'Front of House Audio Engineer',
              headcount: 2,
              callTime: '06:30',
              wrapTime: '19:00',
            },
            {
              roleName: 'Camera Operator / Live Streaming',
              headcount: 3,
              callTime: '07:00',
              wrapTime: '18:30',
            },
            {
              roleName: 'Usher & Registration Staff',
              headcount: 6,
              callTime: '07:30',
              wrapTime: '17:00',
            },
          ],
          totalCrewCount: 11,
          experienceLevel: 'Senior / Certified Professional',
          payStructure: {
            rateType: 'flat_day',
            rateAmount: 250,
            currency: 'USD',
            overtimeTerms: '1.5x after 10 hours',
          },
          uniformDressCode: 'Event Blacks (All Black attire)',
          equipmentPolicy: 'All tools & equipment provided on-site',
          certificationsRequired: ['Electrical Safety', 'First Aid / CPR'],
          crewPerks: ['Catered Meals (Lunch/Dinner)', 'Hydration & Snack Station', 'Travel Allowance'],
        },
        contact: {
          fullName: 'Vikram Joshi',
          organization: 'TechSummit Global Media',
          email: 'vikram.j@techsummit.example.com',
          phone: '+91 98888 77777',
          preferredContactMethod: 'phone',
        },
        status: 'active',
      },
    ];

    const year = new Date().getFullYear();
    const sampleDataWithCodes = sampleData.map((item, idx) => ({
      ...item,
      referenceCode: `${item.category.substring(0, 3).toUpperCase()}-${year}-SEED${idx + 1}`,
    }));

    await Requirement.deleteMany({});
    const inserted = await Requirement.insertMany(sampleDataWithCodes);

    return res.status(201).json({
      success: true,
      message: `Successfully seeded ${inserted.length} requirements across all categories.`,
      data: inserted,
    });
  } catch (err) {
    next(err);
  }
}
