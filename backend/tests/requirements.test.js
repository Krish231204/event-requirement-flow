import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/server.js';
import { Requirement } from '../src/models/Requirement.js';

let mongod;

before(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

after(async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
});

test('GET /api/health should return 200 healthy', async () => {
  const res = await request(app).get('/api/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'healthy');
});

test('POST /api/requirements creates a Planner requirement', async () => {
  const payload = {
    eventName: 'Grand Summer Gala 2026',
    eventType: 'Corporate Gala',
    dateType: 'single',
    startDate: '2026-08-20',
    startTime: '18:00',
    endTime: '23:00',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      address: '700 Montgomery St',
    },
    venue: {
      name: 'The Julia Morgan Ballroom',
      isVenueBooked: true,
      venueType: 'Indoor',
    },
    category: 'planner',
    plannerDetails: {
      serviceLevel: 'Full-Service Planning',
      estimatedGuests: 250,
      themeAesthetic: 'Art Deco Luxury',
      decorRequirements: ['Custom Chandelier Lighting', 'Floral Arch'],
      budgetRange: { min: 5000, max: 10000, currency: 'USD' },
      servicesNeeded: ['Vendor Sourcing & Negotiation', 'Timeline & Schedule Management'],
      primaryPriorities: 'Ensure smooth keynote transition and dinner flow.',
      specialNotes: 'Catering requires kosher and vegan options.',
    },
    contact: {
      fullName: 'Sarah Jenkins',
      organization: 'TechVision Global',
      email: 'sarah.j@techvision.example.com',
      phone: '+1 415-555-0199',
      preferredContactMethod: 'email',
    },
  };

  const res = await request(app).post('/api/requirements').send(payload);
  assert.equal(res.status, 201);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.category, 'planner');
  assert.equal(res.body.data.eventName, 'Grand Summer Gala 2026');
  assert.ok(res.body.data.referenceCode);
  assert.ok(res.body.data.referenceCode.startsWith('PLA-'));
  assert.equal(res.body.data.plannerDetails.serviceLevel, 'Full-Service Planning');
  assert.equal(res.body.data.performerDetails, undefined);
  assert.equal(res.body.data.crewDetails, undefined);
});

test('POST /api/requirements creates a Performer requirement', async () => {
  const payload = {
    eventName: 'Sunset Acoustic Sessions',
    eventType: 'Music Festival / Concert',
    dateType: 'single',
    startDate: '2026-09-12',
    startTime: '17:00',
    location: {
      city: 'Austin',
      state: 'TX',
      country: 'USA',
    },
    venue: {
      name: 'Zilker Park Pavilion',
      venueType: 'Outdoor',
    },
    category: 'performer',
    performerDetails: {
      performerType: 'Live Band',
      performanceFormat: '2 sets x 45 mins',
      genres: ['Indie Rock', 'Folk'],
      soundTechNeeds: {
        paSystemProvided: true,
        microphonesNeeded: 4,
        inEarMonitorsNeeded: false,
        backlineRequired: ['Drum Kit', 'Bass Amp'],
      },
      compensation: {
        amount: 2500,
        rateType: 'fixed',
        currency: 'USD',
      },
      soundCheckTime: '15:30',
      hospitalityRider: ['Private Green Room', 'Hot Meals & Beverages'],
      travelAccommodation: 'Local Only (No travel needed)',
    },
    contact: {
      fullName: 'Marcus Vance',
      organization: 'Austin Live Sounds',
      email: 'marcus@austinlivesounds.example.com',
      phone: '+1 512-555-8833',
    },
  };

  const res = await request(app).post('/api/requirements').send(payload);
  assert.equal(res.status, 201);
  assert.equal(res.body.data.category, 'performer');
  assert.ok(res.body.data.referenceCode.startsWith('PER-'));
  assert.equal(res.body.data.performerDetails.performerType, 'Live Band');
});

test('POST /api/requirements creates a Crew requirement', async () => {
  const payload = {
    eventName: 'Annual Robotics Expo 2026',
    eventType: 'Exhibition / Showcase',
    dateType: 'range',
    startDate: '2026-10-10',
    endDate: '2026-10-12',
    location: {
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
    },
    venue: {
      name: 'McCormick Place Hall B',
      venueType: 'Indoor',
    },
    category: 'crew',
    crewDetails: {
      rolesNeeded: [
        {
          roleName: 'Front of House Audio Engineer',
          headcount: 2,
          callTime: '07:00',
          wrapTime: '18:00',
        },
        {
          roleName: 'Camera Operator / Live Streaming',
          headcount: 3,
          callTime: '07:30',
          wrapTime: '18:00',
        },
      ],
      totalCrewCount: 5,
      experienceLevel: 'Intermediate (1-3 yrs experience)',
      payStructure: {
        rateType: 'hourly',
        rateAmount: 45,
        currency: 'USD',
        overtimeTerms: '1.5x after 8 hours',
      },
      uniformDressCode: 'Event Blacks (All Black attire)',
      equipmentPolicy: 'All tools & equipment provided on-site',
      certificationsRequired: ['Electrical Safety'],
      crewPerks: ['Catered Meals (Lunch/Dinner)'],
    },
    contact: {
      fullName: 'Elena Rostova',
      organization: 'RoboExpo Inc',
      email: 'elena@roboexpo.example.com',
      phone: '+1 312-555-0921',
    },
  };

  const res = await request(app).post('/api/requirements').send(payload);
  assert.equal(res.status, 201);
  assert.equal(res.body.data.category, 'crew');
  assert.ok(res.body.data.referenceCode.startsWith('CRE-'));
  assert.equal(res.body.data.crewDetails.rolesNeeded.length, 2);
});

test('POST /api/requirements returns 400 when missing required Step 1 fields', async () => {
  const invalidPayload = {
    category: 'planner',
    location: { city: '' },
    contact: { email: 'invalid-email' },
  };

  const res = await request(app).post('/api/requirements').send(invalidPayload);
  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.ok(Array.isArray(res.body.errors));
});

test('GET /api/requirements supports category filtering', async () => {
  const res = await request(app).get('/api/requirements?category=planner');
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body.data));
  assert.ok(res.body.data.every((r) => r.category === 'planner'));
});

test('GET /api/requirements/stats returns breakdown by category', async () => {
  const res = await request(app).get('/api/requirements/stats');
  assert.equal(res.status, 200);
  assert.ok(res.body.data.total >= 3);
  assert.ok(res.body.data.planner >= 1);
  assert.ok(res.body.data.performer >= 1);
  assert.ok(res.body.data.crew >= 1);
});
