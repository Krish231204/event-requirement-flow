'use client';

import React from 'react';
import { DollarSign, Clock, Coffee, Plane, HeartHandshake, Check } from 'lucide-react';
import { RequirementFormData, TravelAccommodation } from '../types/requirement';
import { HOSPITALITY_OPTIONS } from '../lib/constants';

interface Step3PerformerProps {
  data: RequirementFormData;
  updateData: (fields: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
}

export default function Step3Performer({ data, updateData }: Step3PerformerProps) {
  const performer = data.performerDetails;

  const updatePerformer = (fields: Partial<typeof performer>) => {
    updateData({
      performerDetails: {
        ...performer,
        ...fields,
      },
    });
  };

  const updateCompensation = (fields: Partial<typeof performer.compensation>) => {
    updateData({
      performerDetails: {
        ...performer,
        compensation: {
          ...performer.compensation,
          ...fields,
        },
      },
    });
  };

  const toggleHospitality = (item: string) => {
    const current = performer.hospitalityRider || [];
    if (current.includes(item)) {
      updatePerformer({ hospitalityRider: current.filter((h) => h !== item) });
    } else {
      updatePerformer({ hospitalityRider: [...current, item] });
    }
  };

  const travelPolicies: TravelAccommodation[] = [
    'Local Only (No travel needed)',
    'Travel Expenses Reimbursed',
    'Flights & Hotel Covered',
    'Negotiable',
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Category: Performer & Artist
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Compensation, Hospitality Rider & Logistics</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            Step 3 of 4
          </span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Specify artist compensation terms, rehearsal windows, green room hospitality, and travel provisions.
        </p>
      </div>

      {/* Part A: Performance Fee & Compensation */}
      <div className="space-y-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-purple-400" />
              <span>Artist Compensation & Fee Structure</span>
            </h3>
            <p className="text-xs text-slate-400">Guaranteed fee or performance honorarium.</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Rate Type Pill */}
            <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700/60">
              <button
                type="button"
                onClick={() => updateCompensation({ rateType: 'fixed' })}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  performer.compensation?.rateType === 'fixed'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Fixed Fee
              </button>
              <button
                type="button"
                onClick={() => updateCompensation({ rateType: 'hourly' })}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  performer.compensation?.rateType === 'hourly'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Hourly Rate
              </button>
            </div>

            {/* Currency */}
            <select
              value={performer.compensation?.currency || 'USD'}
              onChange={(e) => updateCompensation({ currency: e.target.value })}
              className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Compensation Amount ({performer.compensation?.currency || 'USD'})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs text-slate-400">
                {performer.compensation?.currency || 'USD'}
              </span>
              <input
                type="number"
                min={0}
                step={100}
                value={performer.compensation?.amount || ''}
                onChange={(e) =>
                  updateCompensation({ amount: parseInt(e.target.value, 10) || 0 })
                }
                placeholder="e.g. 3500"
                className="w-full pl-14 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>Sound Check / Call Window</span>
            </label>
            <input
              type="text"
              value={performer.soundCheckTime || ''}
              onChange={(e) => updatePerformer({ soundCheckTime: e.target.value })}
              placeholder="e.g. 16:00 - 17:30 (prior to guest arrival)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Part B: Hospitality Rider & Amenities */}
      <div className="space-y-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Coffee className="w-4 h-4 text-purple-400" />
            <span>Hospitality & Rider Provisions</span>
          </h3>
          <p className="text-xs text-slate-400">
            Confirm green room and comfort accommodations provided for the act.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {HOSPITALITY_OPTIONS.map((item) => {
            const isChecked = (performer.hospitalityRider || []).includes(item);
            return (
              <div
                key={item}
                onClick={() => toggleHospitality(item)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                  isChecked
                    ? 'border-purple-500/60 bg-purple-950/20 text-white'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    isChecked
                      ? 'border-purple-500 bg-purple-600 text-white'
                      : 'border-slate-700 bg-slate-800'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-xs font-medium">{item}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part C: Travel Policy & Audience Notes */}
      <div className="space-y-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
            <Plane className="w-3.5 h-3.5 text-purple-400" />
            <span>Travel & Accommodation Policy</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {travelPolicies.map((policy) => {
              const isSelected = performer.travelAccommodation === policy;
              return (
                <div
                  key={policy}
                  onClick={() => updatePerformer({ travelAccommodation: policy })}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'border-purple-500 bg-purple-950/20 text-white font-medium'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span>{policy}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-purple-400" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
            <HeartHandshake className="w-3.5 h-3.5 text-purple-400" />
            <span>Audience Vibe & Special Engagement Requests</span>
          </label>
          <textarea
            rows={2}
            value={performer.audienceVibeNotes || ''}
            onChange={(e) => updatePerformer({ audienceVibeNotes: e.target.value })}
            placeholder="e.g. High-energy festival crowd, looking for strong stage interaction during the climax drop, clean edits for corporate segment."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
