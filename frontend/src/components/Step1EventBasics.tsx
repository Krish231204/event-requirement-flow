'use client';

import React from 'react';
import {
  Calendar,
  MapPin,
  Building,
  Sparkles,
  Music,
  Users,
  Check,
  AlertCircle,
} from 'lucide-react';
import { RequirementFormData, CategoryType, VenueType } from '../types/requirement';
import { EVENT_TYPES } from '../lib/constants';

interface Step1Props {
  data: RequirementFormData;
  updateData: (fields: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
}

export default function Step1EventBasics({ data, updateData, errors }: Step1Props) {
  const handleCategorySelect = (category: CategoryType) => {
    updateData({ category });
  };

  const categories: Array<{
    id: CategoryType;
    title: string;
    badge: string;
    desc: string;
    examples: string;
    icon: React.ElementType;
    activeBorder: string;
    activeBg: string;
    activeBadge: string;
    iconBg: string;
    checkBg: string;
  }> = [
    {
      id: 'planner',
      title: 'Event Planner',
      badge: 'Full Coordination',
      desc: 'Hire professional planners for full-scale orchestration, guest management, aesthetics & vendor direction.',
      examples: 'Weddings, Corporate Galas, Anniversaries, Experiential Launches',
      icon: Sparkles,
      activeBorder: 'border-[#FF4C18] ring-2 ring-[#FF4C18]/20',
      activeBg: 'bg-orange-50/50',
      activeBadge: 'bg-[#FF4C18]/10 text-[#FF4C18] border-[#FF4C18]/20',
      iconBg: 'bg-[#FF4C18] text-white',
      checkBg: 'bg-[#FF4C18] border-[#FF4C18] text-white',
    },
    {
      id: 'performer',
      title: 'Performer & Artist',
      badge: 'Live Entertainment',
      desc: 'Book live musicians, headline DJs, solo vocalists, bands, comedians, magicians & stage acts.',
      examples: 'Concerts, Festivals, Club Nights, Private Celebrations, Keynote MCs',
      icon: Music,
      activeBorder: 'border-purple-600 ring-2 ring-purple-500/20',
      activeBg: 'bg-purple-50/50',
      activeBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      iconBg: 'bg-purple-600 text-white',
      checkBg: 'bg-purple-600 border-purple-600 text-white',
    },
    {
      id: 'crew',
      title: 'Production Crew',
      badge: 'Technical & Support',
      desc: 'Staff your event with sound engineers, lighting technicians, camera operators, stagehands & security.',
      examples: 'AV Setup, Broadcast Streaming, Stage Rigging, Crowd Management',
      icon: Users,
      activeBorder: 'border-blue-600 ring-2 ring-blue-500/20',
      activeBg: 'bg-blue-50/50',
      activeBadge: 'bg-blue-100 text-blue-700 border-blue-200',
      iconBg: 'bg-blue-600 text-white',
      checkBg: 'bg-blue-600 border-blue-600 text-white',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Event Fundamentals</span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Step 1 of 4
          </span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Tell us about your event context and choose the specific category of talent or support you need.
        </p>
      </div>

      {/* Part A: Category Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          What type of requirement are you posting? <span className="text-[#FF4C18]">*</span>
        </label>
        <p className="text-xs text-slate-500">
          Steps 2 and 3 will automatically adapt to surface questions tailored to your chosen category.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {categories.map((cat) => {
            const isSelected = data.category === cat.id;
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`relative rounded-2xl p-5 cursor-pointer border-2 transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? `${cat.activeBorder} ${cat.activeBg} shadow-md`
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? cat.iconBg : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                      isSelected
                        ? cat.checkBg
                        : 'border-slate-300 bg-slate-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-bold text-slate-900 text-base tracking-tight">{cat.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cat.activeBadge}`}>
                      {cat.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{cat.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Ideal for: </span>
                  {cat.examples}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part B: Event Name & Event Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {/* Event Name */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-slate-800">
              Event Name <span className="text-[#FF4C18]">*</span>
            </label>
            <span className="text-xs text-slate-400 font-medium">
              {data.eventName.length}/140
            </span>
          </div>
          <input
            type="text"
            value={data.eventName}
            maxLength={140}
            onChange={(e) => updateData({ eventName: e.target.value })}
            placeholder="e.g. Neon Horizons Music Fest 2026"
            className={`w-full px-4 py-2.5 rounded-xl bg-white border text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors shadow-xs ${
              errors.eventName
                ? 'border-rose-500 focus:border-rose-500 ring-2 ring-rose-500/20'
                : 'border-slate-300 focus:border-[#FF4C18] focus:ring-2 focus:ring-[#FF4C18]/15'
            }`}
          />
          {errors.eventName && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.eventName}
            </p>
          )}
        </div>

        {/* Event Type */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-800">
            Event Type <span className="text-[#FF4C18]">*</span>
          </label>
          <select
            value={data.eventType}
            onChange={(e) => updateData({ eventType: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] focus:ring-2 focus:ring-[#FF4C18]/15 transition-colors shadow-xs"
          >
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.eventType}
            </p>
          )}
        </div>
      </div>

      {/* Part C: Dates & Timings */}
      <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF4C18]" />
              <span>Event Date & Timings</span>
            </h3>
            <p className="text-xs text-slate-500">Specify when the event or engagement occurs.</p>
          </div>

          {/* Single vs Range Toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => updateData({ dateType: 'single' })}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                data.dateType === 'single'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Single Day
            </button>
            <button
              type="button"
              onClick={() => updateData({ dateType: 'range' })}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                data.dateType === 'range'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Date Range (Multi-day)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Start Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {data.dateType === 'range' ? 'Start Date' : 'Event Date'}{' '}
              <span className="text-[#FF4C18]">*</span>
            </label>
            <input
              type="date"
              value={data.startDate}
              onChange={(e) => updateData({ startDate: e.target.value })}
              className={`w-full px-3.5 py-2 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none transition-colors shadow-xs ${
                errors.startDate ? 'border-rose-500' : 'border-slate-300 focus:border-[#FF4C18]'
              }`}
            />
            {errors.startDate && (
              <p className="text-xs text-rose-600 font-medium mt-1">{errors.startDate}</p>
            )}
          </div>

          {/* End Date (if range) */}
          {data.dateType === 'range' ? (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">End Date</label>
              <input
                type="date"
                min={data.startDate}
                value={data.endDate || ''}
                onChange={(e) => updateData({ endDate: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Call / Start Time</label>
              <input
                type="time"
                value={data.startTime || ''}
                onChange={(e) => updateData({ startTime: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
              />
            </div>
          )}

          {data.dateType === 'range' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Daily Start Time</label>
                <input
                  type="time"
                  value={data.startTime || ''}
                  onChange={(e) => updateData({ startTime: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Daily Wrap Time</label>
                <input
                  type="time"
                  value={data.endTime || ''}
                  onChange={(e) => updateData({ endTime: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
                />
              </div>
            </>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Expected Wrap Time</label>
              <input
                type="time"
                value={data.endTime || ''}
                onChange={(e) => updateData({ endTime: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
              />
            </div>
          )}
        </div>
      </div>

      {/* Part D: Location & Venue */}
      <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#FF4C18]" />
            <span>Event Location & Venue</span>
          </h3>
          <p className="text-xs text-slate-500">Where will this requirement take place?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* City */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              City <span className="text-[#FF4C18]">*</span>
            </label>
            <input
              type="text"
              value={data.location.city}
              onChange={(e) =>
                updateData({
                  location: { ...data.location, city: e.target.value },
                })
              }
              placeholder="e.g. Mumbai, Bangalore, Delhi"
              className={`w-full px-3.5 py-2 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none transition-colors shadow-xs ${
                errors['location.city']
                  ? 'border-rose-500'
                  : 'border-slate-300 focus:border-[#FF4C18]'
              }`}
            />
            {errors['location.city'] && (
              <p className="text-xs text-rose-600 font-medium mt-1">{errors['location.city']}</p>
            )}
          </div>

          {/* State */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">State / Region</label>
            <input
              type="text"
              value={data.location.state || ''}
              onChange={(e) =>
                updateData({
                  location: { ...data.location, state: e.target.value },
                })
              }
              placeholder="e.g. Maharashtra, Karnataka"
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
            />
          </div>

          {/* Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Country</label>
            <input
              type="text"
              value={data.location.country}
              onChange={(e) =>
                updateData({
                  location: { ...data.location, country: e.target.value },
                })
              }
              placeholder="e.g. India"
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Street Address / Landmark (Optional)</label>
          <input
            type="text"
            value={data.location.address || ''}
            onChange={(e) =>
              updateData({
                location: { ...data.location, address: e.target.value },
              })
            }
            placeholder="e.g. Bandra Kurla Complex, Hall 4"
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
          />
        </div>

        {/* Venue specifics */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Venue Name (Optional)</span>
            </label>
            <input
              type="text"
              value={data.venue.name || ''}
              onChange={(e) =>
                updateData({
                  venue: { ...data.venue, name: e.target.value },
                })
              }
              placeholder="e.g. Grand Hyatt Ballroom"
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Setting Environment</label>
            <select
              value={data.venue.venueType}
              onChange={(e) =>
                updateData({
                  venue: { ...data.venue, venueType: e.target.value as VenueType },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
            >
              <option value="Indoor">Indoor (Air Conditioned)</option>
              <option value="Outdoor">Outdoor / Open Air</option>
              <option value="Hybrid">Hybrid (Indoor & Outdoor)</option>
              <option value="TBD">TBD / Scouting in Progress</option>
            </select>
          </div>

          <div className="flex items-center pt-5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={data.venue.isVenueBooked}
                onChange={(e) =>
                  updateData({
                    venue: { ...data.venue, isVenueBooked: e.target.checked },
                  })
                }
                className="w-4 h-4 rounded border-slate-300 text-[#FF4C18] focus:ring-[#FF4C18]"
              />
              <span className="text-xs font-semibold text-slate-700">
                Venue is already booked & confirmed
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
