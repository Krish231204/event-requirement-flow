'use client';

import React from 'react';
import { Users, Plus, Trash2, Award, Clock, AlertCircle } from 'lucide-react';
import { RequirementFormData, ExperienceLevel, CrewRoleItem } from '../types/requirement';
import { CREW_ROLES_PRESETS } from '../lib/constants';

interface Step2CrewProps {
  data: RequirementFormData;
  updateData: (fields: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
}

export default function Step2Crew({ data, updateData, errors }: Step2CrewProps) {
  const crew = data.crewDetails;

  const updateCrew = (fields: Partial<typeof crew>) => {
    updateData({
      crewDetails: {
        ...crew,
        ...fields,
      },
    });
  };

  const handleAddRole = (roleName: string) => {
    const current = [...(crew.rolesNeeded || [])];
    current.push({
      roleName,
      headcount: 1,
      callTime: '07:30',
      wrapTime: '18:00',
    });

    const totalHeadcount = current.reduce((acc, curr) => acc + (curr.headcount || 1), 0);
    updateCrew({ rolesNeeded: current, totalCrewCount: totalHeadcount });
  };

  const handleRemoveRole = (index: number) => {
    const current = [...(crew.rolesNeeded || [])];
    current.splice(index, 1);
    const totalHeadcount = current.reduce((acc, curr) => acc + (curr.headcount || 1), 0);
    updateCrew({ rolesNeeded: current, totalCrewCount: totalHeadcount });
  };

  const handleUpdateRole = (index: number, fields: Partial<CrewRoleItem>) => {
    const current = [...(crew.rolesNeeded || [])];
    current[index] = { ...current[index], ...fields };
    const totalHeadcount = current.reduce((acc, curr) => acc + (curr.headcount || 1), 0);
    updateCrew({ rolesNeeded: current, totalCrewCount: totalHeadcount });
  };

  const experienceLevels: Array<{ value: ExperienceLevel; label: string; desc: string }> = [
    {
      value: 'Entry Level / Hands-on',
      label: 'Entry Level / Hands-on',
      desc: 'Supervised setup, cable pulling, registration assistance, crowd guidance.',
    },
    {
      value: 'Intermediate (1-3 yrs experience)',
      label: 'Intermediate (1-3 yrs)',
      desc: 'Independent board operation, live audio mixing, camera tracking, stage patching.',
    },
    {
      value: 'Senior / Certified Professional',
      label: 'Senior / Certified Lead',
      desc: 'Lead audio engineer, rigging supervisor, high-profile broadcast director.',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Category: Production Crew & Technical Staff
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Crew Roles, Shift Timings & Staffing Needs</span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Step 2 of 4
          </span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Specify exact production roles, required headcount per role, and call shift schedules.
        </p>
      </div>

      {/* Part A: Roles Needed Dynamic Table */}
      <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Roles & Staffing Breakdown</span> <span className="text-blue-600">*</span>
            </h3>
            <p className="text-xs text-slate-500">
              Configure each specialized role and the number of technicians needed.
            </p>
          </div>

          {/* Live Headcount Counter */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200">
            <span className="text-xs text-blue-700 font-bold">Total Crew Headcount:</span>
            <span className="text-lg font-black text-blue-700">
              {crew.totalCrewCount || crew.rolesNeeded?.reduce((a, b) => a + (b.headcount || 1), 0) || 0}
            </span>
          </div>
        </div>

        {/* Quick Add Pills */}
        <div className="pt-2">
          <span className="text-xs text-slate-500 block mb-2 font-semibold">
            Quick Add Common Event Roles:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CREW_ROLES_PRESETS.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleAddRole(role)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 flex items-center gap-1 font-semibold transition-colors"
              >
                <Plus className="w-3 h-3 text-blue-600" />
                <span>{role}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Table of Roles */}
        <div className="space-y-3 pt-3">
          {(crew.rolesNeeded || []).length === 0 ? (
            <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
              No crew roles added yet. Click one of the quick presets above or add a custom role below.
            </div>
          ) : (
            crew.rolesNeeded.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-slate-300 transition-colors"
              >
                <div className="flex-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={item.roleName}
                    onChange={(e) => handleUpdateRole(idx, { roleName: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-blue-600 shadow-xs"
                  />
                </div>

                <div className="w-28">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
                    Heads Needed
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateRole(idx, {
                          headcount: Math.max(1, (item.headcount || 1) - 1),
                        })
                      }
                      className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shadow-xs"
                    >
                      -
                    </button>
                    <span className="w-7 text-center font-bold text-blue-700 text-sm">
                      {item.headcount || 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateRole(idx, {
                          headcount: (item.headcount || 1) + 1,
                        })
                      }
                      className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shadow-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="w-28">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> Call Time
                  </label>
                  <input
                    type="time"
                    value={item.callTime || '07:30'}
                    onChange={(e) => handleUpdateRole(idx, { callTime: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-600 shadow-xs"
                  />
                </div>

                <div className="w-28">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> Wrap Time
                  </label>
                  <input
                    type="time"
                    value={item.wrapTime || '18:00'}
                    onChange={(e) => handleUpdateRole(idx, { wrapTime: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-600 shadow-xs"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveRole(idx)}
                  className="p-2 self-end sm:self-center text-slate-400 hover:text-rose-600 transition-colors"
                  title="Remove this role"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => handleAddRole('General Stagehand / Support')}
            className="text-xs px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold flex items-center gap-1.5 border border-blue-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Another Custom Role</span>
          </button>
        </div>

        {errors['crewDetails.rolesNeeded'] && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors['crewDetails.rolesNeeded']}
          </p>
        )}
      </div>

      {/* Part B: Experience Level */}
      <div className="space-y-3 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Required Technical Proficiency / Experience Level</span>
          </h3>
          <p className="text-xs text-slate-500">
            Helps match with crew members having the appropriate depth of skill.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {experienceLevels.map((lvl) => {
            const isSelected = crew.experienceLevel === lvl.value;
            return (
              <div
                key={lvl.value}
                onClick={() => updateCrew({ experienceLevel: lvl.value })}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <span className="font-bold text-xs text-slate-900 block mb-1">
                    {lvl.label}
                  </span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{lvl.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
