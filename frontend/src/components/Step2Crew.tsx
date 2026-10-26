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
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Category: Production Crew & Technical Staff
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Crew Roles, Shift Timings & Staffing Needs</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            Step 2 of 4
          </span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Specify exact production roles, required headcount per role, and call shift schedules.
        </p>
      </div>

      {/* Part A: Roles Needed Dynamic Table */}
      <div className="space-y-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Roles & Staffing Breakdown</span> <span className="text-rose-400">*</span>
            </h3>
            <p className="text-xs text-slate-400">
              Configure each specialized role and the number of technicians needed.
            </p>
          </div>

          {/* Live Headcount Counter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30">
            <span className="text-xs text-amber-300 font-medium">Total Crew Headcount:</span>
            <span className="text-lg font-black text-amber-400">
              {crew.totalCrewCount || crew.rolesNeeded?.reduce((a, b) => a + (b.headcount || 1), 0) || 0}
            </span>
          </div>
        </div>

        {/* Quick Add Pills */}
        <div className="pt-2">
          <span className="text-xs text-slate-400 block mb-2 font-medium">
            Quick Add Common Event Roles:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CREW_ROLES_PRESETS.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleAddRole(role)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3 text-amber-400" />
                <span>{role}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Table of Roles */}
        <div className="space-y-3 pt-3">
          {(crew.rolesNeeded || []).length === 0 ? (
            <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl text-slate-400 text-xs">
              No crew roles added yet. Click one of the quick presets above or add a custom role below.
            </div>
          ) : (
            crew.rolesNeeded.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-slate-700 transition-colors"
              >
                {/* Role Title Input */}
                <div className="flex-1">
                  <label className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block mb-1">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={item.roleName}
                    onChange={(e) => handleUpdateRole(idx, { roleName: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Headcount */}
                <div className="w-28">
                  <label className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block mb-1">
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
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-7 text-center font-bold text-amber-300 text-sm">
                      {item.headcount || 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateRole(idx, {
                          headcount: (item.headcount || 1) + 1,
                        })
                      }
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Call Time */}
                <div className="w-28">
                  <label className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block mb-1 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> Call Time
                  </label>
                  <input
                    type="time"
                    value={item.callTime || '07:30'}
                    onChange={(e) => handleUpdateRole(idx, { callTime: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Wrap Time */}
                <div className="w-28">
                  <label className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block mb-1 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> Wrap Time
                  </label>
                  <input
                    type="time"
                    value={item.wrapTime || '18:00'}
                    onChange={(e) => handleUpdateRole(idx, { wrapTime: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleRemoveRole(idx)}
                  className="p-2 self-end sm:self-center text-slate-500 hover:text-rose-400 transition-colors"
                  title="Remove this role"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Add custom role button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => handleAddRole('General Stagehand / Support')}
            className="text-xs px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Another Custom Role</span>
          </button>
        </div>

        {errors['crewDetails.rolesNeeded'] && (
          <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors['crewDetails.rolesNeeded']}
          </p>
        )}
      </div>

      {/* Part B: Experience Level */}
      <div className="space-y-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Required Technical Proficiency / Experience Level</span>
          </h3>
          <p className="text-xs text-slate-400">
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
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500 bg-amber-950/20 ring-1 ring-amber-500/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="font-semibold text-xs text-white block mb-1">
                    {lvl.label}
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{lvl.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
