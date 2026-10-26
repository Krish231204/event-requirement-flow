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
          badgeBg: 'bg-orange-50 text-[#FF4C18] border-[#FF4C18]/30',
          border: 'border-[#FF4C18]/40',
          accentColor: 'text-[#FF4C18]',
        };
      case 'performer':
        return {
          title: 'Performer & Artist Requirement',
          icon: Music,
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          border: 'border-purple-300',
          accentColor: 'text-purple-600',
        };
      case 'crew':
        return {
          title: 'Production Crew Requirement',
          icon: Users,
          badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
          border: 'border-blue-300',
          accentColor: 'text-blue-600',
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
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF4C18]" />
          <span className="text-xs font-bold text-[#FF4C18] uppercase tracking-wider">
            Final Step: Review & Post
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Review Requirement & Confirm Posting</span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Step 4 of 4
          </span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Verify all event specifications, supply your contact details, and publish to GoPratle.
        </p>
      </div>

      {serverError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <div>
            <p className="font-bold">Submission Error</p>
            <p className="text-rose-700">{serverError}</p>
          </div>
        </div>
      )}

      {/* Structured Review Card */}
      <div className={`rounded-2xl bg-white border-2 ${catMeta.border} p-5 sm:p-6 space-y-6 shadow-sm`}>
        {/* Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
              <CatIcon className={`w-5 h-5 ${catMeta.accentColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-slate-900">{data.eventName || 'Untitled Event'}</h3>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${catMeta.badgeBg}`}>
                  {catMeta.title}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{data.eventType}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="self-start sm:self-center text-xs px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Basics</span>
          </button>
        </div>

        {/* Section 1 Review: Basics & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#FF4C18]" /> Date & Schedule
            </span>
            <p className="font-bold text-slate-900">
              {data.startDate}
              {data.dateType === 'range' && data.endDate ? ` → ${data.endDate}` : ''}
            </p>
            <p className="text-[11px] text-slate-500">
              {data.startTime ? `${data.startTime}` : ''}
              {data.endTime ? ` - ${data.endTime}` : ''}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#FF4C18]" /> Location
            </span>
            <p className="font-bold text-slate-900">
              {data.location.city}
              {data.location.state ? `, ${data.location.state}` : ''}
            </p>
            <p className="text-[11px] text-slate-500">
              {data.location.address || data.location.country}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-[#FF4C18]" /> Venue & Setting
            </span>
            <p className="font-bold text-slate-900">
              {data.venue.name || 'Venue TBD'} ({data.venue.venueType})
            </p>
            <p className="text-[11px] text-slate-500">
              {data.venue.isVenueBooked ? '✓ Venue secured' : 'Scouting in progress'}
            </p>
          </div>
        </div>

        {/* Section 2 Review: Category-Specific Details */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Category Specifications ({data.category.toUpperCase()})
            </span>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="text-xs font-bold text-[#FF4C18] hover:text-[#ea580c] flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" /> Edit Specs
            </button>
          </div>

          {/* Planner Details */}
          {data.category === 'planner' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs bg-orange-50/30 p-4 rounded-xl border border-orange-100">
              <div>
                <span className="text-slate-500 block text-[11px]">Service Level</span>
                <span className="font-bold text-slate-900">{data.plannerDetails.serviceLevel}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Estimated Guests</span>
                <span className="font-bold text-[#FF4C18]">
                  {data.plannerDetails.estimatedGuests} attendees
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Budget Range</span>
                <span className="font-bold text-slate-900">
                  {data.plannerDetails.budgetRange?.currency || 'USD'}{' '}
                  {data.plannerDetails.budgetRange?.min?.toLocaleString()} -{' '}
                  {data.plannerDetails.budgetRange?.max?.toLocaleString()}
                </span>
              </div>
              {data.plannerDetails.themeAesthetic && (
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block text-[11px]">Theme / Aesthetic</span>
                  <span className="text-slate-800 font-medium">{data.plannerDetails.themeAesthetic}</span>
                </div>
              )}
              <div className="sm:col-span-3">
                <span className="text-slate-500 block text-[11px] mb-1 font-semibold">Services Needed</span>
                <div className="flex flex-wrap gap-1.5">
                  {(data.plannerDetails.servicesNeeded || []).map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-0.5 rounded-md bg-white text-[#FF4C18] border border-orange-200 text-[11px] font-semibold shadow-xs"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs bg-purple-50/30 p-4 rounded-xl border border-purple-100">
              <div>
                <span className="text-slate-500 block text-[11px]">Performer Type</span>
                <span className="font-bold text-slate-900">{data.performerDetails.performerType}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Format / Duration</span>
                <span className="font-bold text-purple-700">
                  {data.performerDetails.performanceFormat}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Compensation</span>
                <span className="font-bold text-slate-900">
                  {data.performerDetails.compensation?.currency || 'USD'}{' '}
                  {data.performerDetails.compensation?.amount?.toLocaleString()} (
                  {data.performerDetails.compensation?.rateType})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">PA System & Tech</span>
                <span className="text-slate-800 font-medium">
                  {data.performerDetails.soundTechNeeds?.paSystemProvided
                    ? 'Venue PA Provided'
                    : 'Artist PA Required'}
                  , {data.performerDetails.soundTechNeeds?.microphonesNeeded || 0} Mics
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block text-[11px]">Travel Policy</span>
                <span className="text-slate-800 font-medium">{data.performerDetails.travelAccommodation}</span>
              </div>
              <div className="sm:col-span-3">
                <span className="text-slate-500 block text-[11px] mb-1 font-semibold">Rider Provisions</span>
                <div className="flex flex-wrap gap-1.5">
                  {(data.performerDetails.hospitalityRider || []).map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-0.5 rounded-md bg-white text-purple-700 border border-purple-200 text-[11px] font-semibold shadow-xs"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs bg-blue-50/30 p-4 rounded-xl border border-blue-100">
              <div>
                <span className="text-slate-500 block text-[11px]">Total Crew Headcount</span>
                <span className="font-bold text-blue-700">
                  {data.crewDetails.totalCrewCount || data.crewDetails.rolesNeeded?.reduce((a, b) => a + (b.headcount || 1), 0)} Crew Members
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Pay Structure</span>
                <span className="font-bold text-slate-900">
                  {data.crewDetails.payStructure?.currency || 'USD'}{' '}
                  {data.crewDetails.payStructure?.rateAmount} /{' '}
                  {data.crewDetails.payStructure?.rateType === 'hourly' ? 'hour' : 'day'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Proficiency Level</span>
                <span className="text-slate-800 font-medium">{data.crewDetails.experienceLevel}</span>
              </div>
              <div className="sm:col-span-3">
                <span className="text-slate-500 block text-[11px] mb-1 font-semibold">Staffing Roles</span>
                <div className="space-y-1.5">
                  {(data.crewDetails.rolesNeeded || []).map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs"
                    >
                      <span className="font-bold text-slate-900">{r.roleName}</span>
                      <span className="text-slate-600 font-medium">
                        <strong className="text-blue-700">{r.headcount}</strong> heads • Shift:{' '}
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
      <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-[#FF4C18]" />
            <span>Poster Contact & Organization Details</span> <span className="text-[#FF4C18]">*</span>
          </h3>
          <p className="text-xs text-slate-500">
            Who should qualified candidates or agencies contact regarding this posting?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Your Full Name <span className="text-[#FF4C18]">*</span>
            </label>
            <input
              type="text"
              value={data.contact.fullName}
              onChange={(e) => updateContact({ fullName: e.target.value })}
              placeholder="e.g. Vikramaditya Rathore"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none transition-colors shadow-xs ${
                errors['contact.fullName']
                  ? 'border-rose-500'
                  : 'border-slate-300 focus:border-[#FF4C18]'
              }`}
            />
            {errors['contact.fullName'] && (
              <p className="text-xs text-rose-600 font-medium mt-1">{errors['contact.fullName']}</p>
            )}
          </div>

          {/* Organization */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Organization / Company (Optional)
            </label>
            <input
              type="text"
              value={data.contact.organization || ''}
              onChange={(e) => updateContact({ organization: e.target.value })}
              placeholder="e.g. Rathore Heritage Estates"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Email Address</span> <span className="text-[#FF4C18]">*</span>
            </label>
            <input
              type="email"
              value={data.contact.email}
              onChange={(e) => updateContact({ email: e.target.value })}
              placeholder="e.g. contact@domain.com"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none transition-colors shadow-xs ${
                errors['contact.email']
                  ? 'border-rose-500'
                  : 'border-slate-300 focus:border-[#FF4C18]'
              }`}
            />
            {errors['contact.email'] && (
              <p className="text-xs text-rose-600 font-medium mt-1">{errors['contact.email']}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>Phone / WhatsApp</span> <span className="text-[#FF4C18]">*</span>
            </label>
            <input
              type="tel"
              value={data.contact.phone}
              onChange={(e) => updateContact({ phone: e.target.value })}
              placeholder="e.g. +91 98290 12345"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none transition-colors shadow-xs ${
                errors['contact.phone']
                  ? 'border-rose-500'
                  : 'border-slate-300 focus:border-[#FF4C18]'
              }`}
            />
            {errors['contact.phone'] && (
              <p className="text-xs text-rose-600 font-medium mt-1">{errors['contact.phone']}</p>
            )}
          </div>
        </div>

        {/* Preferred Channel */}
        <div className="pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 block mb-2">
            Preferred Response Method
          </label>
          <div className="flex gap-4">
            {(['email', 'phone', 'whatsapp'] as const).map((method) => (
              <label key={method} className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="radio"
                  name="preferredContact"
                  checked={data.contact.preferredContactMethod === method}
                  onChange={() => updateContact({ preferredContactMethod: method })}
                  className="w-3.5 h-3.5 text-[#FF4C18] focus:ring-[#FF4C18]"
                />
                <span className="capitalize">{method}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Part C: Terms Agreement */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs">
        <input
          type="checkbox"
          id="terms"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#FF4C18] focus:ring-[#FF4C18]"
        />
        <label htmlFor="terms" className="text-xs text-slate-600 select-none cursor-pointer">
          I confirm that the requirement details provided above are accurate and grant GoPratle permission to publish and store this event requirement in the database.
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || !agreedToTerms}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
            isSubmitting || !agreedToTerms
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-[#FF4C18] hover:bg-[#ea580c] text-white shadow-[#FF4C18]/30 hover:scale-[1.01]'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving Requirement to GoPratle...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Post Requirement to GoPratle</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
