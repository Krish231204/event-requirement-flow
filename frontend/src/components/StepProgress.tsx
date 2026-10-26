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
          { number: 3, title: 'Rider & Logistics', subtitle: 'Pay, soundcheck & rider', icon: Sliders },
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

  // Pratle signature primary color `#FF4C18`
  const theme = {
    activeBg: 'bg-[#FF4C18]',
    activeRing: 'ring-[#FF4C18]/25',
    progressBar: 'from-[#FF4C18] to-[#FF7A45]',
    textAccent: 'text-[#FF4C18]',
    borderActive: 'border-[#FF4C18]',
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6">
      <div className="relative">
        {/* Background track */}
        <div className="absolute top-5 left-6 right-6 h-1 bg-slate-200 -z-0 rounded-full" />
        {/* Active progress fill */}
        <div
          className={`absolute top-5 left-6 h-1 bg-gradient-to-r ${theme.progressBar} transition-all duration-500 ease-out -z-0 rounded-full`}
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
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm ${
                      isCompleted && !isCurrent
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-300 hover:bg-emerald-100'
                        : isCurrent
                        ? `${theme.activeBg} text-white ring-4 ${theme.activeRing} scale-105 shadow-md shadow-[#FF4C18]/25`
                        : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                  >
                    {isCompleted && !isCurrent ? (
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>

                  {/* Step labels */}
                  <div className="mt-2 text-center sm:text-left">
                    <span
                      className={`block text-[11px] font-bold uppercase tracking-wider transition-colors ${
                        isCurrent
                          ? theme.textAccent
                          : isCompleted
                          ? 'text-slate-700'
                          : 'text-slate-400'
                      }`}
                    >
                      Step 0{step.number}
                    </span>
                    <span
                      className={`block text-xs sm:text-sm font-bold truncate ${
                        isCurrent
                          ? 'text-slate-900'
                          : isCompleted
                          ? 'text-slate-700 group-hover:text-slate-900'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="hidden md:block text-[11px] text-slate-500 truncate">
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
