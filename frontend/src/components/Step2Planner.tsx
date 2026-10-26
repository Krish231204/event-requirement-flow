'use client';

import React from 'react';
import { Users, Palette, Check, AlertCircle } from 'lucide-react';
import { RequirementFormData, PlanningServiceLevel } from '../types/requirement';
import { PLANNER_SERVICE_LEVELS, DECOR_OPTIONS } from '../lib/constants';

interface Step2PlannerProps {
  data: RequirementFormData;
  updateData: (fields: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
}

export default function Step2Planner({ data, updateData, errors }: Step2PlannerProps) {
  const planner = data.plannerDetails;

  const updatePlanner = (fields: Partial<typeof planner>) => {
    updateData({
      plannerDetails: {
        ...planner,
        ...fields,
      },
    });
  };

  const toggleDecor = (item: string) => {
    const current = planner.decorRequirements || [];
    if (current.includes(item)) {
      updatePlanner({ decorRequirements: current.filter((i) => i !== item) });
    } else {
      updatePlanner({ decorRequirements: [...current, item] });
    }
  };

  const guestCountPresets = [50, 150, 300, 500, 1000];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Category: Event Planner
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Planning Scope & Event Dynamics</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            Step 2 of 4
          </span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Define the level of planning support you need and the scale of the guest experience.
        </p>
      </div>

      {/* Part A: Planning Service Level */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-200">
          Planning Service Level <span className="text-rose-400">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {PLANNER_SERVICE_LEVELS.map((service) => {
            const isSelected = planner.serviceLevel === service.value;
            return (
              <div
                key={service.value}
                onClick={() =>
                  updatePlanner({ serviceLevel: service.value as PlanningServiceLevel })
                }
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/20 ring-1 ring-emerald-500/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-sm text-white">{service.label}</span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-slate-700 bg-slate-800'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        {errors['plannerDetails.serviceLevel'] && (
          <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors['plannerDetails.serviceLevel']}
          </p>
        )}
      </div>

      {/* Part B: Guest Count */}
      <div className="space-y-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Estimated Guest Count</span> <span className="text-rose-400">*</span>
            </label>
            <p className="text-xs text-slate-400">
              Crucial for venue capacity, catering ratios, and coordination team size.
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-emerald-400">
              {planner.estimatedGuests || 0}
            </span>
            <span className="text-xs text-slate-400 ml-1">guests</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="range"
            min={10}
            max={2000}
            step={10}
            value={planner.estimatedGuests || 100}
            onChange={(e) => updatePlanner({ estimatedGuests: parseInt(e.target.value, 10) })}
            className="flex-1 accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <input
            type="number"
            min={1}
            value={planner.estimatedGuests || ''}
            onChange={(e) =>
              updatePlanner({ estimatedGuests: Math.max(1, parseInt(e.target.value, 10) || 1) })
            }
            className="w-24 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm text-center focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Quick select pills */}
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <span className="text-xs text-slate-400">Popular sizes:</span>
          {guestCountPresets.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => updatePlanner({ estimatedGuests: count })}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                planner.estimatedGuests === count
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold'
                  : 'bg-slate-800 text-slate-400 border-slate-700/60 hover:text-white'
              }`}
            >
              {count} {count === 1000 ? '+' : ''}
            </button>
          ))}
        </div>
        {errors['plannerDetails.estimatedGuests'] && (
          <p className="text-xs text-rose-400 mt-1">{errors['plannerDetails.estimatedGuests']}</p>
        )}
      </div>

      {/* Part C: Theme Aesthetic & Decor Requirements */}
      <div className="space-y-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-emerald-400" />
            <span>Theme Aesthetic & Decor Requirements</span>
          </h3>
          <p className="text-xs text-slate-400">
            Guide the planner on visual direction and atmosphere desires.
          </p>
        </div>

        {/* Theme Aesthetic */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Event Aesthetic / Visual Theme
          </label>
          <input
            type="text"
            value={planner.themeAesthetic || ''}
            onChange={(e) => updatePlanner({ themeAesthetic: e.target.value })}
            placeholder="e.g. Royal Rajputana Elegance & Warm Candlelight, or Cyberpunk Neon Luxe"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Decor Requirements Tags */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-medium text-slate-300 block">
            Desired Decor & Staging Elements (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {DECOR_OPTIONS.map((decor) => {
              const isChecked = (planner.decorRequirements || []).includes(decor);
              return (
                <button
                  key={decor}
                  type="button"
                  onClick={() => toggleDecor(decor)}
                  className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                    isChecked
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-medium'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{decor}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
