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
    color: string;
    activeBorder: string;
    activeBg: string;
    activeBadge: string;
  }> = [
    {
      id: 'planner',
      title: 'Event Planner',
      badge: 'Coordination & Design',
      desc: 'Hire professional planners for full-scale orchestration, guest management, aesthetics & vendor direction.',
      examples: 'Weddings, Corporate Galas, Anniversaries, Experiential Launches',
      icon: Sparkles,
      color: 'emerald',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20',
      activeBg: 'bg-emerald-950/20',
      activeBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'performer',
      title: 'Performer & Artist',
      badge: 'Live Entertainment',
      desc: 'Book live musicians, headline DJs, solo vocalists, bands, comedians, magicians & stage acts.',
      examples: 'Concerts, Festivals, Club Nights, Private Celebrations, Keynote MCs',
      icon: Music,
      color: 'purple',
      activeBorder: 'border-purple-500 ring-2 ring-purple-500/20',
      activeBg: 'bg-purple-950/20',
      activeBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    {
      id: 'crew',
      title: 'Production Crew',
      badge: 'Technical & Support Staff',
      desc: 'Staff your event with sound engineers, lighting technicians, camera operators, stagehands & security.',
      examples: 'AV Setup, Broadcast Streaming, Stage Rigging, Crowd Management',
      icon: Users,
      color: 'amber',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/20',
      activeBg: 'bg-amber-950/20',
      activeBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Event Fundamentals</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            Step 1 of 4
          </span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Tell us about the event context and choose the specific category of talent or support you need.
        </p>
      </div>

      {/* Part A: Category Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-200">
          What type of requirement are you posting? <span className="text-rose-400">*</span>
        </label>
        <p className="text-xs text-slate-400">
          Steps 2 and 3 will automatically configure to surface category-tailored questions for your selection.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {categories.map((cat) => {
            const isSelected = data.category === cat.id;
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`relative rounded-2xl p-5 cursor-pointer border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? `${cat.activeBorder} ${cat.activeBg} shadow-lg shadow-${cat.color}-500/5`
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                {/* Check pill top right */}
                <div className="flex items-start justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? cat.id === 'planner'
                          ? 'bg-emerald-500 text-white'
                          : cat.id === 'performer'
                          ? 'bg-purple-600 text-white'
                          : 'bg-amber-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                      isSelected
                        ? cat.id === 'planner'
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : cat.id === 'performer'
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'bg-amber-500 border-amber-500 text-white'
                        : 'border-slate-700 bg-slate-800/50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-bold text-white text-base tracking-tight">{cat.title}</h3>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${cat.activeBadge}`}>
                      {cat.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{cat.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="text-slate-400 font-medium">Ideal for: </span>
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
            <label className="text-sm font-medium text-slate-200">
              Event Name <span className="text-rose-400">*</span>
            </label>
            <span className="text-xs text-slate-400">
              {data.eventName.length}/140
            </span>
          </div>
          <input
            type="text"
            value={data.eventName}
            maxLength={140}
            onChange={(e) => updateData({ eventName: e.target.value })}
            placeholder="e.g. Neon Horizons Music Fest 2026"
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-white placeholder-slate-400 text-sm focus:outline-none transition-colors ${
              errors.eventName
                ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20'
                : 'border-slate-800 focus:border-indigo-500'
            }`}
          />
          {errors.eventName && (
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.eventName}
            </p>
          )}
        </div>

        {/* Event Type */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200">
            Event Type <span className="text-rose-400">*</span>
          </label>
          <select
            value={data.eventType}
            onChange={(e) => updateData({ eventType: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          >
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-slate-900 text-white">
                {type}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.eventType}
            </p>
          )}
        </div>
      </div>

      {/* Part C: Dates & Timings */}
      <div className="space-y-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Event Date & Timings</span>
            </h3>
            <p className="text-xs text-slate-400">Specify when the event or engagement occurs.</p>
          </div>

          {/* Single vs Range Toggle */}
          <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700/60">
            <button
              type="button"
              onClick={() => updateData({ dateType: 'single' })}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                data.dateType === 'single'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Single Day
            </button>
            <button
              type="button"
              onClick={() => updateData({ dateType: 'range' })}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                data.dateType === 'range'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Date Range (Multi-day)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Start Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              {data.dateType === 'range' ? 'Start Date' : 'Event Date'}{' '}
              <span className="text-rose-400">*</span>
            </label>
            <input
              type="date"
              value={data.startDate}
              onChange={(e) => updateData({ startDate: e.target.value })}
              className={`w-full px-3.5 py-2 rounded-xl bg-slate-900 border text-white text-sm focus:outline-none transition-colors ${
                errors.startDate ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
              }`}
            />
            {errors.startDate && (
              <p className="text-xs text-rose-400 mt-1">{errors.startDate}</p>
            )}
          </div>

          {/* End Date (if range) */}
          {data.dateType === 'range' ? (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">End Date</label>
              <input
                type="date"
                min={data.startDate}
                value={data.endDate || ''}
                onChange={(e) => updateData({ endDate: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Call / Start Time</label>
              <div className="relative">
                <input
                  type="time"
                  value={data.startTime || ''}
                  onChange={(e) => updateData({ startTime: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Start Time for range, or End Time for single */}
          {data.dateType === 'range' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Daily Start Time</label>
                <input
                  type="time"
                  value={data.startTime || ''}
                  onChange={(e) => updateData({ startTime: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Daily Wrap Time</label>
                <input
                  type="time"
                  value={data.endTime || ''}
                  onChange={(e) => updateData({ endTime: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Expected Wrap Time</label>
              <input
                type="time"
                value={data.endTime || ''}
                onChange={(e) => updateData({ endTime: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Part D: Location & Venue */}
      <div className="space-y-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Event Location & Venue</span>
          </h3>
          <p className="text-xs text-slate-400">Where will this requirement be fulfilled?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* City */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              City <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={data.location.city}
              onChange={(e) =>
                updateData({
                  location: { ...data.location, city: e.target.value },
                })
              }
              placeholder="e.g. Mumbai, Austin, London"
              className={`w-full px-3.5 py-2 rounded-xl bg-slate-900 border text-white text-sm focus:outline-none transition-colors ${
                errors['location.city']
                  ? 'border-rose-500'
                  : 'border-slate-800 focus:border-indigo-500'
              }`}
            />
            {errors['location.city'] && (
              <p className="text-xs text-rose-400 mt-1">{errors['location.city']}</p>
            )}
          </div>

          {/* State / Province */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">State / Region</label>
            <input
              type="text"
              value={data.location.state || ''}
              onChange={(e) =>
                updateData({
                  location: { ...data.location, state: e.target.value },
                })
              }
              placeholder="e.g. Maharashtra, TX, England"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Country</label>
            <input
              type="text"
              value={data.location.country}
              onChange={(e) =>
                updateData({
                  location: { ...data.location, country: e.target.value },
                })
              }
              placeholder="e.g. India, United States"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Address / Landmark */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">Street Address / Landmark (Optional)</label>
          <input
            type="text"
            value={data.location.address || ''}
            onChange={(e) =>
              updateData({
                location: { ...data.location, address: e.target.value },
              })
            }
            placeholder="e.g. Bandra Kurla Complex, Hall 4 or Private Beach Estate"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Venue specifics */}
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
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
              placeholder="e.g. The Grand Ballroom"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Setting Environment</label>
            <select
              value={data.venue.venueType}
              onChange={(e) =>
                updateData({
                  venue: { ...data.venue, venueType: e.target.value as VenueType },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
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
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-medium text-slate-300">
                Venue is already booked & confirmed
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
