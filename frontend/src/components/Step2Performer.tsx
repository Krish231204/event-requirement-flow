'use client';

import React from 'react';
import { Mic, Radio, Volume2, Check, AlertCircle } from 'lucide-react';
import { RequirementFormData, PerformerType } from '../types/requirement';
import {
  PERFORMER_TYPES,
  MUSIC_GENRES,
  BACKLINE_EQUIPMENT_OPTIONS,
} from '../lib/constants';

interface Step2PerformerProps {
  data: RequirementFormData;
  updateData: (fields: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
}

export default function Step2Performer({ data, updateData, errors }: Step2PerformerProps) {
  const performer = data.performerDetails;

  const updatePerformer = (fields: Partial<typeof performer>) => {
    updateData({
      performerDetails: {
        ...performer,
        ...fields,
      },
    });
  };

  const updateSoundTech = (fields: Partial<typeof performer.soundTechNeeds>) => {
    updateData({
      performerDetails: {
        ...performer,
        soundTechNeeds: {
          ...performer.soundTechNeeds,
          ...fields,
        },
      },
    });
  };

  const toggleGenre = (genre: string) => {
    const current = performer.genres || [];
    if (current.includes(genre)) {
      updatePerformer({ genres: current.filter((g) => g !== genre) });
    } else {
      updatePerformer({ genres: [...current, genre] });
    }
  };

  const toggleBackline = (gear: string) => {
    const current = performer.soundTechNeeds?.backlineRequired || [];
    if (current.includes(gear)) {
      updateSoundTech({ backlineRequired: current.filter((b) => b !== gear) });
    } else {
      updateSoundTech({ backlineRequired: [...current, gear] });
    }
  };

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
          <span>Performance Type & Sound / Tech Specs</span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Step 2 of 4
          </span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Detail the entertainment style, performance format, and on-stage audio equipment requirements.
        </p>
      </div>

      {/* Part A: Performer Specialty / Type */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          Performer Type / Act <span className="text-purple-600">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PERFORMER_TYPES.map((type) => {
            const isSelected = performer.performerType === type.value;
            return (
              <div
                key={type.value}
                onClick={() => updatePerformer({ performerType: type.value as PerformerType })}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50/50 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 truncate">{type.label}</span>
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'border-purple-600 bg-purple-600 text-white'
                          : 'border-slate-300 bg-slate-50'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{type.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        {errors['performerDetails.performerType'] && (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors['performerDetails.performerType']}
          </p>
        )}
      </div>

      {/* Part B: Format & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Performance Format & Duration <span className="text-purple-600">*</span>
          </label>
          <input
            type="text"
            value={performer.performanceFormat || ''}
            onChange={(e) => updatePerformer({ performanceFormat: e.target.value })}
            placeholder="e.g. 2 sets x 45 mins, or 1 x 90-min headline set"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none transition-colors shadow-xs ${
              errors['performerDetails.performanceFormat']
                ? 'border-rose-500'
                : 'border-slate-300 focus:border-purple-600'
            }`}
          />
          {errors['performerDetails.performanceFormat'] && (
            <p className="text-xs text-rose-600 font-medium mt-1">
              {errors['performerDetails.performanceFormat']}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Setlist & Must-Play Guidelines
          </label>
          <input
            type="text"
            value={performer.mustPlayGuidelines || ''}
            onChange={(e) => updatePerformer({ mustPlayGuidelines: e.target.value })}
            placeholder="e.g. High energy melodic house, include top 40 singalongs"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-purple-600 shadow-xs"
          />
        </div>

        {/* Music Genres Chips */}
        <div className="sm:col-span-2 space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 block">
            Target Musical Genres / Sound Vibe
          </label>
          <div className="flex flex-wrap gap-2">
            {MUSIC_GENRES.map((genre) => {
              const isChecked = (performer.genres || []).includes(genre);
              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all font-semibold ${
                    isChecked
                      ? 'bg-purple-50 text-purple-700 border-purple-300 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 text-purple-600" />}
                  <span>{genre}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Part C: Sound & Backline Technical Specs */}
      <div className="space-y-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-purple-600" />
            <span>Sound & Backline Technical Requirements</span>
          </h3>
          <p className="text-xs text-slate-500">
            Avoid gig surprises by setting clear expectations on stage tech.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* PA System Provided toggle */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">PA System</span>
              <span className="text-[11px] text-slate-500 font-medium">
                {performer.soundTechNeeds?.paSystemProvided
                  ? 'Venue provides FOH PA'
                  : 'Artist brings sound'}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={performer.soundTechNeeds?.paSystemProvided || false}
                onChange={(e) => updateSoundTech({ paSystemProvided: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Microphones Needed */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-purple-600" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Microphones</span>
                <span className="text-[11px] text-slate-500 font-medium">Wireless / wired</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  updateSoundTech({
                    microphonesNeeded: Math.max(
                      0,
                      (performer.soundTechNeeds?.microphonesNeeded || 1) - 1
                    ),
                  })
                }
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center shadow-xs"
              >
                -
              </button>
              <span className="w-6 text-center text-sm font-bold text-purple-700">
                {performer.soundTechNeeds?.microphonesNeeded || 1}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateSoundTech({
                    microphonesNeeded: (performer.soundTechNeeds?.microphonesNeeded || 1) + 1,
                  })
                }
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center shadow-xs"
              >
                +
              </button>
            </div>
          </div>

          {/* In-Ear Monitors */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-purple-600" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">In-Ear Monitors</span>
                <span className="text-[11px] text-slate-500 font-medium">IEM wireless pack</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={performer.soundTechNeeds?.inEarMonitorsNeeded || false}
                onChange={(e) => updateSoundTech({ inEarMonitorsNeeded: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        {/* Backline Instruments */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 block">
            Backline Equipment to be provided by Venue/Organizer
          </label>
          <div className="flex flex-wrap gap-2">
            {BACKLINE_EQUIPMENT_OPTIONS.map((gear) => {
              const isChecked = (performer.soundTechNeeds?.backlineRequired || []).includes(gear);
              return (
                <button
                  key={gear}
                  type="button"
                  onClick={() => toggleBackline(gear)}
                  className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all font-semibold ${
                    isChecked
                      ? 'bg-purple-50 text-purple-700 border-purple-300 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 text-purple-600" />}
                  <span>{gear}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
