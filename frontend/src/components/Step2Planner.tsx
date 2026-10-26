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
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF4C18]" />
          <span className="text-xs font-bold text-[#FF4C18] uppercase tracking-wider">
            Category: Event Planner
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Planning Scope & Event Dynamics</span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Step 2 of 4
          </span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Define the level of planning support you need and the scale of the guest experience.
        </p>
      </div>

      {/* Part A: Planning Service Level */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          Planning Service Level <span className="text-[#FF4C18]">*</span>
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
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#FF4C18] bg-orange-50/50 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-slate-900">{service.label}</span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'border-[#FF4C18] bg-[#FF4C18] text-white'
                          : 'border-slate-300 bg-slate-50'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        {errors['plannerDetails.serviceLevel'] && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors['plannerDetails.serviceLevel']}
          </p>
        )}
      </div>

      {/* Part B: Guest Count */}
      <div className="space-y-3 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#FF4C18]" />
              <span>Estimated Guest Count</span> <span className="text-[#FF4C18]">*</span>
            </label>
            <p className="text-xs text-slate-500">
              Crucial for venue capacity, catering ratios, and coordination team size.
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-[#FF4C18]">
              {planner.estimatedGuests || 0}
            </span>
            <span className="text-xs text-slate-500 ml-1 font-semibold">guests</span>
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
            className="flex-1 accent-[#FF4C18] cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <input
            type="number"
            min={1}
            value={planner.estimatedGuests || ''}
            onChange={(e) =>
              updatePlanner({ estimatedGuests: Math.max(1, parseInt(e.target.value, 10) || 1) })
            }
            className="w-24 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm text-center font-bold focus:outline-none focus:border-[#FF4C18]"
          />
        </div>

        {/* Quick select pills */}
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <span className="text-xs text-slate-500 font-medium">Popular sizes:</span>
          {guestCountPresets.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => updatePlanner({ estimatedGuests: count })}
              className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-colors ${
                planner.estimatedGuests === count
                  ? 'bg-orange-100 text-[#FF4C18] border-[#FF4C18]/40'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900'
              }`}
            >
              {count} {count === 1000 ? '+' : ''}
            </button>
          ))}
        </div>
        {errors['plannerDetails.estimatedGuests'] && (
          <p className="text-xs text-rose-600 font-medium mt-1">{errors['plannerDetails.estimatedGuests']}</p>
        )}
      </div>

      {/* Part C: Theme Aesthetic & Decor Requirements */}
      <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#FF4C18]" />
            <span>Theme Aesthetic & Decor Requirements</span>
          </h3>
          <p className="text-xs text-slate-500">
            Guide the planner on visual direction and atmosphere desires.
          </p>
        </div>

        {/* Theme Aesthetic */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Event Aesthetic / Visual Theme
          </label>
          <input
            type="text"
            value={planner.themeAesthetic || ''}
            onChange={(e) => updatePlanner({ themeAesthetic: e.target.value })}
            placeholder="e.g. Royal Rajputana Elegance & Warm Candlelight, or Cyberpunk Neon Luxe"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
          />
        </div>

        {/* Decor Requirements Tags */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-700 block">
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
                  className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all font-semibold ${
                    isChecked
                      ? 'bg-orange-50 text-[#FF4C18] border-[#FF4C18]/40 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 text-[#FF4C18]" />}
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
