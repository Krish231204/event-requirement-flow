'use client';

import React from 'react';
import { Check, Calendar, Sparkles, Sliders, FileText } from 'lucide-react';
import { CategoryType } from '../types/requirement';

interface StepProgressProps {
  currentStep: number;
  category: CategoryType;
  onStepClick: (step: number) => void;
  completedSteps: number[];
}

export default function StepProgress({
  currentStep,
  category,
  onStepClick,
  completedSteps,
}: StepProgressProps) {
  // Category-specific dynamic titles for steps 2 & 3
  const getStepTitles = () => {
    switch (category) {
      case 'planner':
        return [
          { number: 1, title: 'Event Basics', subtitle: 'Type, dates & location', icon: Calendar },
          { number: 2, title: 'Planning Scope', subtitle: 'Guests, vibe & decor', icon: Sparkles },
          { number: 3, title: 'Services & Budget', subtitle: 'Deliverables & spend', icon: Sliders },
          { number: 4, title: 'Review & Submit', subtitle: 'Confirm & contact info', icon: FileText },
        ];
      case 'performer':
        return [
          { number: 1, title: 'Event Basics', subtitle: 'Type, dates & location', icon: Calendar },
          { number: 2, title: 'Performer & Tech', subtitle: 'Genre, sets & backline', icon: Sparkles },
          { number: 3, title: 'Rider & Logistics', subtitle: 'Pay, soundcheck & hotel', icon: Sliders },
          { number: 4, title: 'Review & Submit', subtitle: 'Confirm & contact info', icon: FileText },
        ];
      case 'crew':
        return [
          { number: 1, title: 'Event Basics', subtitle: 'Type, dates & location', icon: Calendar },
          { number: 2, title: 'Crew & Headcount', subtitle: 'Audio, lighting, stage', icon: Sparkles },
          { number: 3, title: 'Rates & Equipment', subtitle: 'Pay terms, tools & dress', icon: Sliders },
          { number: 4, title: 'Review & Submit', subtitle: 'Confirm & contact info', icon: FileText },
        ];
      default:
        return [
          { number: 1, title: 'Event Basics', subtitle: 'Type, dates & location', icon: Calendar },
          { number: 2, title: 'Scope & Specs', subtitle: 'Category requirements', icon: Sparkles },
          { number: 3, title: 'Logistics & Budget', subtitle: 'Terms & expectations', icon: Sliders },
          { number: 4, title: 'Review & Submit', subtitle: 'Confirm & contact info', icon: FileText },
        ];
    }
  };

  const steps = getStepTitles();
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  // Category accent styles
  const getCategoryTheme = () => {
    switch (category) {
      case 'planner':
        return {
          activeBg: 'bg-emerald-500',
          activeRing: 'ring-emerald-500/30',
          progressBar: 'from-emerald-500 to-teal-400',
          textAccent: 'text-emerald-400',
          borderActive: 'border-emerald-500',
        };
      case 'performer':
        return {
          activeBg: 'bg-purple-600',
          activeRing: 'ring-purple-500/30',
          progressBar: 'from-purple-600 to-pink-500',
          textAccent: 'text-purple-400',
          borderActive: 'border-purple-500',
        };
      case 'crew':
        return {
          activeBg: 'bg-amber-500',
          activeRing: 'ring-amber-500/30',
          progressBar: 'from-amber-500 to-orange-400',
          textAccent: 'text-amber-400',
          borderActive: 'border-amber-500',
        };
      default:
        return {
          activeBg: 'bg-indigo-600',
          activeRing: 'ring-indigo-500/30',
          progressBar: 'from-indigo-600 to-blue-500',
          textAccent: 'text-indigo-400',
          borderActive: 'border-indigo-500',
        };
    }
  };

  const theme = getCategoryTheme();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Visual step cards */}
      <div className="relative">
        {/* Background track */}
        <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-800 -z-0" />
        {/* Active progress fill */}
        <div
          className={`absolute top-5 left-6 h-0.5 bg-gradient-to-r ${theme.progressBar} transition-all duration-500 ease-out -z-0`}
          style={{ width: `calc(${progressPercent}% * 0.9 + 2%)` }}
        />

        <div className="grid grid-cols-4 gap-2 sm:gap-4 relative z-10">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.number);
            const isCurrent = currentStep === step.number;
            const isClickable = isCompleted || step.number < currentStep;

            const Icon = step.icon;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => isClickable && onStepClick(step.number)}
                disabled={!isClickable && !isCurrent}
                className={`text-left group transition-all duration-200 focus:outline-none ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div className="flex flex-col items-center sm:items-start">
                  {/* Step Circle */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm transition-all duration-300 shadow-md ${
                      isCompleted && !isCurrent
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 hover:bg-slate-700'
                        : isCurrent
                        ? `${theme.activeBg} text-white ring-4 ${theme.activeRing} scale-105`
                        : 'bg-slate-800 text-slate-500 border border-slate-700/60'
                    }`}
                  >
                    {isCompleted && !isCurrent ? (
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>

                  {/* Step labels */}
                  <div className="mt-2 text-center sm:text-left">
                    <span
                      className={`block text-[11px] font-bold uppercase tracking-wider transition-colors ${
                        isCurrent
                          ? theme.textAccent
                          : isCompleted
                          ? 'text-slate-300'
                          : 'text-slate-500'
                      }`}
                    >
                      Step 0{step.number}
                    </span>
                    <span
                      className={`block text-xs sm:text-sm font-semibold truncate ${
                        isCurrent
                          ? 'text-white'
                          : isCompleted
                          ? 'text-slate-300 group-hover:text-white'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="hidden md:block text-[11px] text-slate-400 truncate">
                      {step.subtitle}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
