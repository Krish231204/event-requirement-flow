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
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Category: Production Crew
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Rates, Equipment Policy & Crew Logistics</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            Step 3 of 4
          </span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Define pay structure, shift dress code, certifications, and crew amenities.
        </p>
      </div>

      {/* Part A: Pay Structure */}
      <div className="space-y-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>Compensation Model & Pay Terms</span>
            </h3>
            <p className="text-xs text-slate-400">Specify hourly or daily wage standards.</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Rate Type Pill */}
            <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700/60">
              <button
                type="button"
                onClick={() => updatePayStructure({ rateType: 'flat_day' })}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  crew.payStructure?.rateType === 'flat_day'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Flat Day Rate
              </button>
              <button
                type="button"
                onClick={() => updatePayStructure({ rateType: 'hourly' })}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  crew.payStructure?.rateType === 'hourly'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Hourly Rate
              </button>
            </div>

            {/* Currency */}
            <select
              value={crew.payStructure?.currency || 'USD'}
              onChange={(e) => updatePayStructure({ currency: e.target.value })}
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
              Rate Amount ({crew.payStructure?.currency || 'USD'}/
              {crew.payStructure?.rateType === 'hourly' ? 'hr' : 'day'})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs text-slate-400">
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
                className="w-full pl-14 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Overtime Terms</label>
            <input
              type="text"
              value={crew.payStructure?.overtimeTerms || ''}
              onChange={(e) => updatePayStructure({ overtimeTerms: e.target.value })}
              placeholder="e.g. 1.5x regular rate after 9 hours on-site"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Part B: Dress Code & Equipment Policy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dress Code */}
        <div className="space-y-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Shirt className="w-4 h-4 text-amber-400" />
            <span>Dress Code / Uniform</span>
          </h3>
          <div className="space-y-2 pt-1">
            {dressCodes.map((dc) => {
              const isSelected = crew.uniformDressCode === dc.value;
              return (
                <div
                  key={dc.value}
                  onClick={() => updateCrew({ uniformDressCode: dc.value })}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'border-amber-500 bg-amber-950/20 text-white font-medium'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span>{dc.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Equipment Policy */}
        <div className="space-y-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-amber-400" />
            <span>Tool & Equipment Policy</span>
          </h3>
          <div className="space-y-2 pt-1">
            {equipmentPolicies.map((ep) => {
              const isSelected = crew.equipmentPolicy === ep.value;
              return (
                <div
                  key={ep.value}
                  onClick={() => updateCrew({ equipmentPolicy: ep.value })}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between text-xs ${
                    isSelected
                      ? 'border-amber-500 bg-amber-950/20 text-white font-medium'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold">{ep.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <span className="text-[11px] text-slate-400">{ep.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Part C: Certifications & Perks */}
      <div className="space-y-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
        {/* Certifications Required */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
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
                  className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                    isChecked
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-medium'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:text-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{cert}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Crew Perks */}
        <div className="space-y-2 pt-3 border-t border-slate-800/80">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
            <Utensils className="w-3.5 h-3.5 text-amber-400" />
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
                  className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                    isChecked
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-medium'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:text-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 text-amber-400" />}
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
