'use client';

import React from 'react';
import { DollarSign, CheckSquare, Target, MessageSquare, Check } from 'lucide-react';
import { RequirementFormData } from '../types/requirement';
import { PLANNER_SERVICES_LIST } from '../lib/constants';

interface Step3PlannerProps {
  data: RequirementFormData;
  updateData: (fields: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
}

export default function Step3Planner({ data, updateData }: Step3PlannerProps) {
  const planner = data.plannerDetails;

  const updatePlanner = (fields: Partial<typeof planner>) => {
    updateData({
      plannerDetails: {
        ...planner,
        ...fields,
      },
    });
  };

  const toggleService = (service: string) => {
    const current = planner.servicesNeeded || [];
    if (current.includes(service)) {
      updatePlanner({ servicesNeeded: current.filter((s) => s !== service) });
    } else {
      updatePlanner({ servicesNeeded: [...current, service] });
    }
  };

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
          <span>Deliverables, Services & Planning Budget</span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Step 3 of 4
          </span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Specify the planner&apos;s scope of responsibilities, priority milestones, and target financial allocation.
        </p>
      </div>

      {/* Part A: Target Budget Allocation */}
      <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#FF4C18]" />
              <span>Target Planning Fee / Budget Allocation</span>
            </h3>
            <p className="text-xs text-slate-500">
              Estimated fee range dedicated to event management and planning services.
            </p>
          </div>
          <select
            value={planner.budgetRange?.currency || 'USD'}
            onChange={(e) =>
              updatePlanner({
                budgetRange: {
                  ...planner.budgetRange,
                  currency: e.target.value,
                },
              })
            }
            className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="USD">USD ($)</option>
            <option value="INR">INR (₹)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Minimum Budget</label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-bold">
                {planner.budgetRange?.currency || 'USD'}
              </span>
              <input
                type="number"
                min={0}
                step={500}
                value={planner.budgetRange?.min || ''}
                onChange={(e) =>
                  updatePlanner({
                    budgetRange: {
                      ...planner.budgetRange,
                      min: parseInt(e.target.value, 10) || 0,
                    },
                  })
                }
                placeholder="e.g. 5000"
                className="w-full pl-14 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-[#FF4C18] shadow-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Maximum Budget</label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-bold">
                {planner.budgetRange?.currency || 'USD'}
              </span>
              <input
                type="number"
                min={0}
                step={500}
                value={planner.budgetRange?.max || ''}
                onChange={(e) =>
                  updatePlanner({
                    budgetRange: {
                      ...planner.budgetRange,
                      max: parseInt(e.target.value, 10) || 0,
                    },
                  })
                }
                placeholder="e.g. 12000"
                className="w-full pl-14 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-[#FF4C18] shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Part B: Services & Deliverables Needed */}
      <div className="space-y-3 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#FF4C18]" />
            <span>Specific Services & Responsibilities</span>
          </h3>
          <p className="text-xs text-slate-500">
            Check the deliverables you expect the planner or planning agency to handle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {PLANNER_SERVICES_LIST.map((service) => {
            const isChecked = (planner.servicesNeeded || []).includes(service);
            return (
              <div
                key={service}
                onClick={() => toggleService(service)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  isChecked
                    ? 'border-[#FF4C18] bg-orange-50/50 text-slate-900 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    isChecked
                      ? 'border-[#FF4C18] bg-[#FF4C18] text-white'
                      : 'border-slate-300 bg-slate-50'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-xs">{service}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part C: Priorities & Special Notes */}
      <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-[#FF4C18]" />
            <span>Primary Priorities & Key Milestones</span>
          </label>
          <textarea
            rows={2}
            value={planner.primaryPriorities || ''}
            onChange={(e) => updatePlanner({ primaryPriorities: e.target.value })}
            placeholder="e.g. Flawless guest hospitality, ensuring key keynote starts promptly at 7 PM, seamless vendor breakdown."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
          />
        </div>

        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-[#FF4C18]" />
            <span>Special Considerations or Notes</span>
          </label>
          <textarea
            rows={2}
            value={planner.specialNotes || ''}
            onChange={(e) => updatePlanner({ specialNotes: e.target.value })}
            placeholder="e.g. VIP guests arriving by private boat; need designated liaison. Venue has strict noise curfew at 11 PM."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#FF4C18] shadow-xs"
          />
        </div>
      </div>
    </div>
  );
}
