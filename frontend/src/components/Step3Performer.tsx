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
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
            Category: Performer & Artist
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Compensation, Hospitality Rider & Logistics</span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Step 3 of 4
          </span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Specify artist compensation terms, rehearsal windows, green room hospitality, and travel provisions.
        </p>
      </div>

      {/* Part A: Performance Fee & Compensation */}
      <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-purple-600" />
              <span>Artist Compensation & Fee Structure</span>
            </h3>
            <p className="text-xs text-slate-500">Guaranteed fee or performance honorarium.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => updateCompensation({ rateType: 'fixed' })}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  performer.compensation?.rateType === 'fixed'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Fixed Fee
              </button>
              <button
                type="button"
                onClick={() => updateCompensation({ rateType: 'hourly' })}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  performer.compensation?.rateType === 'hourly'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hourly Rate
              </button>
            </div>

            <select
              value={performer.compensation?.currency || 'USD'}
              onChange={(e) => updateCompensation({ currency: e.target.value })}
              className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
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
            <label className="text-xs font-bold text-slate-700">
              Compensation Amount ({performer.compensation?.currency || 'USD'})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-bold">
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
                className="w-full pl-14 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-purple-600 shadow-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>Sound Check / Call Window</span>
            </label>
            <input
              type="text"
              value={performer.soundCheckTime || ''}
              onChange={(e) => updatePerformer({ soundCheckTime: e.target.value })}
              placeholder="e.g. 16:00 - 17:30 (prior to guest arrival)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-purple-600 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Part B: Hospitality Rider & Amenities */}
      <div className="space-y-3 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Coffee className="w-4 h-4 text-purple-600" />
            <span>Hospitality & Rider Provisions</span>
          </h3>
          <p className="text-xs text-slate-500">
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
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  isChecked
                    ? 'border-purple-600 bg-purple-50/50 text-slate-900 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    isChecked
                      ? 'border-purple-600 bg-purple-600 text-white'
                      : 'border-slate-300 bg-slate-50'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-xs">{item}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part C: Travel Policy & Audience Notes */}
      <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <Plane className="w-3.5 h-3.5 text-purple-600" />
            <span>Travel & Accommodation Policy</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {travelPolicies.map((policy) => {
              const isSelected = performer.travelAccommodation === policy;
              return (
                <div
                  key={policy}
                  onClick={() => updatePerformer({ travelAccommodation: policy })}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span>{policy}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-purple-600" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <HeartHandshake className="w-3.5 h-3.5 text-purple-600" />
            <span>Audience Vibe & Special Engagement Requests</span>
          </label>
          <textarea
            rows={2}
            value={performer.audienceVibeNotes || ''}
            onChange={(e) => updatePerformer({ audienceVibeNotes: e.target.value })}
            placeholder="e.g. High-energy festival crowd, looking for strong stage interaction during the climax drop, clean edits for corporate segment."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-purple-600 shadow-xs"
          />
        </div>
      </div>
    </div>
  );
}
