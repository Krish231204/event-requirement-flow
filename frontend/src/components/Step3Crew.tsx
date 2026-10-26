'use client';

import React from 'react';
import {
  DollarSign,
  Shirt,
  Wrench,
  ShieldCheck,
  Utensils,
  Check,
} from 'lucide-react';
import {
  RequirementFormData,
  UniformDressCode,
  EquipmentPolicy,
} from '../types/requirement';
import { CERTIFICATIONS_LIST, CREW_PERKS_LIST } from '../lib/constants';

interface Step3CrewProps {
  data: RequirementFormData;
  updateData: (fields: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
}

export default function Step3Crew({ data, updateData }: Step3CrewProps) {
  const crew = data.crewDetails;

  const updateCrew = (fields: Partial<typeof crew>) => {
    updateData({
      crewDetails: {
        ...crew,
        ...fields,
      },
    });
  };

  const updatePayStructure = (fields: Partial<typeof crew.payStructure>) => {
    updateData({
      crewDetails: {
        ...crew,
        payStructure: {
          ...crew.payStructure,
          ...fields,
        },
      },
    });
  };

  const toggleCertification = (cert: string) => {
    const current = crew.certificationsRequired || [];
    if (current.includes(cert)) {
      updateCrew({ certificationsRequired: current.filter((c) => c !== cert) });
    } else {
      updateCrew({ certificationsRequired: [...current, cert] });
    }
  };

  const togglePerk = (perk: string) => {
    const current = crew.crewPerks || [];
    if (current.includes(perk)) {
      updateCrew({ crewPerks: current.filter((p) => p !== perk) });
    } else {
      updateCrew({ crewPerks: [...current, perk] });
    }
  };

  const dressCodes: Array<{ value: UniformDressCode; label: string }> = [
    { value: 'Event Blacks (All Black attire)', label: 'Event Blacks (All Black attire)' },
    { value: 'Smart Casual', label: 'Smart Casual' },
    { value: 'Formal / Suit', label: 'Formal / Suit' },
    { value: 'Branded Uniform provided on-site', label: 'Branded Uniform / Hi-Vis provided on-site' },
    { value: 'Casual / Practical', label: 'Casual / Practical' },
  ];

  const equipmentPolicies: Array<{ value: EquipmentPolicy; label: string; desc: string }> = [
    {
      value: 'All tools & equipment provided on-site',
      label: 'All Equipment Provided on-site',
      desc: 'Venue / organizer supplies full toolkit, radios, PPE and gear.',
    },
    {
      value: 'Crew must bring own basic tools/belt',
      label: 'Crew Brings Tool Belt & Basic Tools',
      desc: 'Multitool, gaffer tape, gloves, flashlight, wrench.',
    },
    {
      value: 'Specialized gear required',
      label: 'Specialized Gear Required',
      desc: 'Must bring personal harness, certified meter or camera rig.',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Category: Production Crew
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Rates, Equipment Policy & Crew Logistics</span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Step 3 of 4
          </span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Define pay structure, shift dress code, certifications, and crew amenities.
        </p>
      </div>

      {/* Part A: Pay Structure */}
      <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span>Compensation Model & Pay Terms</span>
            </h3>
            <p className="text-xs text-slate-500">Specify hourly or daily wage standards.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => updatePayStructure({ rateType: 'flat_day' })}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  crew.payStructure?.rateType === 'flat_day'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Flat Day Rate
              </button>
              <button
                type="button"
                onClick={() => updatePayStructure({ rateType: 'hourly' })}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  crew.payStructure?.rateType === 'hourly'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hourly Rate
              </button>
            </div>

            <select
              value={crew.payStructure?.currency || 'USD'}
              onChange={(e) => updatePayStructure({ currency: e.target.value })}
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
              Rate Amount ({crew.payStructure?.currency || 'USD'}/
              {crew.payStructure?.rateType === 'hourly' ? 'hr' : 'day'})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-bold">
                {crew.payStructure?.currency || 'USD'}
              </span>
              <input
                type="number"
                min={0}
                step={10}
                value={crew.payStructure?.rateAmount || ''}
                onChange={(e) =>
                  updatePayStructure({ rateAmount: parseInt(e.target.value, 10) || 0 })
                }
                placeholder="e.g. 250"
                className="w-full pl-14 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-blue-600 shadow-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Overtime Terms</label>
            <input
              type="text"
              value={crew.payStructure?.overtimeTerms || ''}
              onChange={(e) => updatePayStructure({ overtimeTerms: e.target.value })}
              placeholder="e.g. 1.5x regular rate after 9 hours on-site"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Part B: Dress Code & Equipment Policy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dress Code */}
        <div className="space-y-3 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Shirt className="w-4 h-4 text-blue-600" />
            <span>Dress Code / Uniform</span>
          </h3>
          <div className="space-y-2 pt-1">
            {dressCodes.map((dc) => {
              const isSelected = crew.uniformDressCode === dc.value;
              return (
                <div
                  key={dc.value}
                  onClick={() => updateCrew({ uniformDressCode: dc.value })}
                  className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span>{dc.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Equipment Policy */}
        <div className="space-y-3 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-blue-600" />
            <span>Tool & Equipment Policy</span>
          </h3>
          <div className="space-y-2 pt-1">
            {equipmentPolicies.map((ep) => {
              const isSelected = crew.equipmentPolicy === ep.value;
              return (
                <div
                  key={ep.value}
                  onClick={() => updateCrew({ equipmentPolicy: ep.value })}
                  className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between text-xs ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold">{ep.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                  <span className="text-[11px] text-slate-500 font-normal">{ep.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Part C: Certifications & Perks */}
      <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        {/* Certifications Required */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Mandatory Licenses or Certifications</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {CERTIFICATIONS_LIST.map((cert) => {
              const isChecked = (crew.certificationsRequired || []).includes(cert);
              return (
                <button
                  key={cert}
                  type="button"
                  onClick={() => toggleCertification(cert)}
                  className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all font-semibold ${
                    isChecked
                      ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  <span>{cert}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Crew Perks */}
        <div className="space-y-2 pt-3 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <Utensils className="w-3.5 h-3.5 text-blue-600" />
            <span>Crew Perks, Catering & Welfare</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {CREW_PERKS_LIST.map((perk) => {
              const isChecked = (crew.crewPerks || []).includes(perk);
              return (
                <button
                  key={perk}
                  type="button"
                  onClick={() => togglePerk(perk)}
                  className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all font-semibold ${
                    isChecked
                      ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  <span>{perk}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
