'use client';

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Building,
  Edit2,
  Send,
  Loader2,
  Sparkles,
  Music,
  Users,
  AlertCircle,
  Phone,
  Mail,
  User,
} from 'lucide-react';
import { RequirementFormData, CategoryType } from '../types/requirement';

interface Step4ReviewSubmitProps {
  data: RequirementFormData;
  updateData: (fields: Partial<RequirementFormData>) => void;
  onJumpToStep: (step: number) => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  errors: Record<string, string>;
  serverError: string | null;
}

export default function Step4ReviewSubmit({
  data,
  updateData,
  onJumpToStep,
  onSubmit,
  isSubmitting,
  errors,
  serverError,
}: Step4ReviewSubmitProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const updateContact = (fields: Partial<typeof data.contact>) => {
    updateData({
      contact: {
        ...data.contact,
        ...fields,
      },
    });
  };

  const getCategoryMeta = (cat: CategoryType) => {
    switch (cat) {
      case 'planner':
        return {
          title: 'Event Planner Requirement',
          icon: Sparkles,
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          border: 'border-emerald-500/40',
          accentColor: 'text-emerald-400',
        };
      case 'performer':
        return {
          title: 'Performer & Artist Requirement',
          icon: Music,
          badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          border: 'border-purple-500/40',
          accentColor: 'text-purple-400',
        };
      case 'crew':
        return {
          title: 'Production Crew Requirement',
          icon: Users,
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          border: 'border-amber-500/40',
          accentColor: 'text-amber-400',
        };
    }
  };

  const catMeta = getCategoryMeta(data.category);
  const CatIcon = catMeta.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;
    await onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Final Step: Review & Post
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Review Requirement & Confirm Posting</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            Step 4 of 4
          </span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Verify all event specifications, supply your contact details, and publish to the backend database.
        </p>
      </div>

      {serverError && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <div>
            <p className="font-semibold">Submission Error</p>
            <p className="text-rose-400">{serverError}</p>
          </div>
        </div>
      )}

      {/* Structured Review Card */}
      <div className={`rounded-2xl bg-slate-900/60 border ${catMeta.border} p-5 sm:p-6 space-y-6 shadow-xl`}>
        {/* Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
              <CatIcon className={`w-5 h-5 ${catMeta.accentColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-white">{data.eventName || 'Untitled Event'}</h3>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${catMeta.badgeBg}`}>
                  {catMeta.title}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{data.eventType}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="self-start sm:self-center text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 flex items-center gap-1.5 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Basics</span>
          </button>
        </div>

        {/* Section 1 Review: Basics & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Date & Schedule
            </span>
            <p className="font-medium text-white">
              {data.startDate}
              {data.dateType === 'range' && data.endDate ? ` → ${data.endDate}` : ''}
            </p>
            <p className="text-[11px] text-slate-400">
              {data.startTime ? `${data.startTime}` : ''}
              {data.endTime ? ` - ${data.endTime}` : ''}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Location
            </span>
            <p className="font-medium text-white">
              {data.location.city}
              {data.location.state ? `, ${data.location.state}` : ''}
            </p>
            <p className="text-[11px] text-slate-400">
              {data.location.address || data.location.country}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-purple-400" /> Venue & Setting
            </span>
            <p className="font-medium text-white">
              {data.venue.name || 'Venue TBD'} ({data.venue.venueType})
            </p>
            <p className="text-[11px] text-slate-400">
              {data.venue.isVenueBooked ? '✓ Venue secured' : 'Scouting in progress'}
            </p>
          </div>
        </div>

        {/* Section 2 Review: Category-Specific Details */}
        <div className="pt-4 border-t border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Category Specifications ({data.category.toUpperCase()})
            </span>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" /> Edit Specs
            </button>
          </div>

          {/* Planner Details */}
          {data.category === 'planner' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
              <div>
                <span className="text-slate-400 block text-[11px]">Service Level</span>
                <span className="font-semibold text-white">{data.plannerDetails.serviceLevel}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Estimated Guests</span>
                <span className="font-semibold text-emerald-400">
                  {data.plannerDetails.estimatedGuests} attendees
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Budget Range</span>
                <span className="font-semibold text-white">
                  {data.plannerDetails.budgetRange?.currency || 'USD'}{' '}
                  {data.plannerDetails.budgetRange?.min?.toLocaleString()} -{' '}
                  {data.plannerDetails.budgetRange?.max?.toLocaleString()}
                </span>
              </div>
              {data.plannerDetails.themeAesthetic && (
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[11px]">Theme / Aesthetic</span>
                  <span className="text-white">{data.plannerDetails.themeAesthetic}</span>
                </div>
              )}
              <div className="sm:col-span-3">
                <span className="text-slate-400 block text-[11px] mb-1">Services Needed</span>
                <div className="flex flex-wrap gap-1.5">
                  {(data.plannerDetails.servicesNeeded || []).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Performer Details */}
          {data.category === 'performer' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
              <div>
                <span className="text-slate-400 block text-[11px]">Performer Type</span>
                <span className="font-semibold text-white">{data.performerDetails.performerType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Format / Duration</span>
                <span className="font-semibold text-purple-400">
                  {data.performerDetails.performanceFormat}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Compensation</span>
                <span className="font-semibold text-white">
                  {data.performerDetails.compensation?.currency || 'USD'}{' '}
                  {data.performerDetails.compensation?.amount?.toLocaleString()} (
                  {data.performerDetails.compensation?.rateType})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">PA System & Tech</span>
                <span className="text-white">
                  {data.performerDetails.soundTechNeeds?.paSystemProvided
                    ? 'Venue PA Provided'
                    : 'Artist PA Required'}
                  , {data.performerDetails.soundTechNeeds?.microphonesNeeded || 0} Mics
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-[11px]">Travel Policy</span>
                <span className="text-white">{data.performerDetails.travelAccommodation}</span>
              </div>
              <div className="sm:col-span-3">
                <span className="text-slate-400 block text-[11px] mb-1">Rider Provisions</span>
                <div className="flex flex-wrap gap-1.5">
                  {(data.performerDetails.hospitalityRider || []).map((h) => (
                    <span
                      key={h}
                      className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Crew Details */}
          {data.category === 'crew' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
              <div>
                <span className="text-slate-400 block text-[11px]">Total Crew Headcount</span>
                <span className="font-semibold text-amber-400">
                  {data.crewDetails.totalCrewCount || data.crewDetails.rolesNeeded?.reduce((a, b) => a + (b.headcount || 1), 0)} Crew Members
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Pay Structure</span>
                <span className="font-semibold text-white">
                  {data.crewDetails.payStructure?.currency || 'USD'}{' '}
                  {data.crewDetails.payStructure?.rateAmount} /{' '}
                  {data.crewDetails.payStructure?.rateType === 'hourly' ? 'hour' : 'day'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Proficiency Level</span>
                <span className="text-white">{data.crewDetails.experienceLevel}</span>
              </div>
              <div className="sm:col-span-3">
                <span className="text-slate-400 block text-[11px] mb-1">Staffing Roles</span>
                <div className="space-y-1.5">
                  {(data.crewDetails.rolesNeeded || []).map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
                    >
                      <span className="font-semibold text-white">{r.roleName}</span>
                      <span className="text-slate-400">
                        <strong className="text-amber-400">{r.headcount}</strong> heads • Shift:{' '}
                        {r.callTime || '07:30'} - {r.wrapTime || '18:00'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Part B: Poster & Contact Information */}
      <div className="space-y-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5 sm:p-6">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" />
            <span>Poster Contact & Organization Details</span> <span className="text-rose-400">*</span>
          </h3>
          <p className="text-xs text-slate-400">
            Who should qualified candidates or agencies contact regarding this posting?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Your Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={data.contact.fullName}
              onChange={(e) => updateContact({ fullName: e.target.value })}
              placeholder="e.g. Vikramaditya Rathore"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-white text-sm focus:outline-none transition-colors ${
                errors['contact.fullName']
                  ? 'border-rose-500'
                  : 'border-slate-800 focus:border-indigo-500'
              }`}
            />
            {errors['contact.fullName'] && (
              <p className="text-xs text-rose-400 mt-1">{errors['contact.fullName']}</p>
            )}
          </div>

          {/* Organization */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Organization / Company (Optional)
            </label>
            <input
              type="text"
              value={data.contact.organization || ''}
              onChange={(e) => updateContact({ organization: e.target.value })}
              placeholder="e.g. Rathore Heritage Estates"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Email Address</span> <span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              value={data.contact.email}
              onChange={(e) => updateContact({ email: e.target.value })}
              placeholder="e.g. contact@domain.com"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-white text-sm focus:outline-none transition-colors ${
                errors['contact.email']
                  ? 'border-rose-500'
                  : 'border-slate-800 focus:border-indigo-500'
              }`}
            />
            {errors['contact.email'] && (
              <p className="text-xs text-rose-400 mt-1">{errors['contact.email']}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>Phone / WhatsApp</span> <span className="text-rose-400">*</span>
            </label>
            <input
              type="tel"
              value={data.contact.phone}
              onChange={(e) => updateContact({ phone: e.target.value })}
              placeholder="e.g. +91 98290 12345"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-white text-sm focus:outline-none transition-colors ${
                errors['contact.phone']
                  ? 'border-rose-500'
                  : 'border-slate-800 focus:border-indigo-500'
              }`}
            />
            {errors['contact.phone'] && (
              <p className="text-xs text-rose-400 mt-1">{errors['contact.phone']}</p>
            )}
          </div>
        </div>

        {/* Preferred Channel */}
        <div className="pt-2 border-t border-slate-800/80">
          <label className="text-xs font-medium text-slate-300 block mb-2">
            Preferred Response Method
          </label>
          <div className="flex gap-4">
            {(['email', 'phone', 'whatsapp'] as const).map((method) => (
              <label key={method} className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="radio"
                  name="preferredContact"
                  checked={data.contact.preferredContactMethod === method}
                  onChange={() => updateContact({ preferredContactMethod: method })}
                  className="w-3.5 h-3.5 text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                />
                <span className="capitalize">{method}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Part C: Terms Agreement */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-3">
        <input
          type="checkbox"
          id="terms"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="terms" className="text-xs text-slate-400 select-none cursor-pointer">
          I confirm that the requirement details provided above are accurate and grant StageSync permission to publish and store this event requirement in the database.
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || !agreedToTerms}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
            isSubmitting || !agreedToTerms
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01]'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving Requirement to MongoDB...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Post Requirement Now</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
