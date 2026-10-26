'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import StepProgress from '../components/StepProgress';
import Step1EventBasics from '../components/Step1EventBasics';
import Step2Planner from '../components/Step2Planner';
import Step3Planner from '../components/Step3Planner';
import Step2Performer from '../components/Step2Performer';
import Step3Performer from '../components/Step3Performer';
import Step2Crew from '../components/Step2Crew';
import Step3Crew from '../components/Step3Crew';
import Step4ReviewSubmit from '../components/Step4ReviewSubmit';
import SubmissionSuccessModal from '../components/SubmissionSuccessModal';
import {
  RequirementFormData,
  SavedRequirement,
} from '../types/requirement';
import {
  DEFAULT_REQUIREMENT_FORM,
  DEMO_PRESETS,
} from '../lib/constants';
import { createRequirement } from '../lib/api';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

const DRAFT_STORAGE_KEY = 'stagesync_requirement_draft_v1';

export default function PostRequirementPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<RequirementFormData>(DEFAULT_REQUIREMENT_FORM);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedRequirement, setSubmittedRequirement] = useState<SavedRequirement | null>(null);

  // Restore draft from localStorage on initial client load
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        setFormData((prev) => ({
          ...prev,
          ...parsed,
        }));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Auto-save draft on data changes
  useEffect(() => {
    if (!submittedRequirement) {
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
      } catch {
        // storage quota exceeded or disabled
      }
    }
  }, [formData, submittedRequirement]);

  const updateFormData = (fields: Partial<RequirementFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
    }));
    setErrors({});
  };

  const handleLoadPreset = (key: 'planner' | 'performer' | 'crew') => {
    const preset = DEMO_PRESETS[key];
    if (preset) {
      setFormData((prev) => ({
        ...prev,
        ...preset.data,
      }));
      setErrors({});
    }
  };

  const handleResetForm = () => {
    if (confirm('Are you sure you want to reset all fields in this form?')) {
      setFormData(DEFAULT_REQUIREMENT_FORM);
      setCurrentStep(1);
      setCompletedSteps([]);
      setErrors({});
      setServerError(null);
      setSubmittedRequirement(null);
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
  };

  // Step-level client validation
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.eventName || formData.eventName.trim().length < 2) {
        errs.eventName = 'Event name is required (at least 2 characters).';
      }
      if (!formData.eventType) {
        errs.eventType = 'Please select an event type.';
      }
      if (!formData.startDate) {
        errs.startDate = 'Event date is required.';
      }
      if (!formData.location.city || !formData.location.city.trim()) {
        errs['location.city'] = 'City is required.';
      }
      if (!['planner', 'performer', 'crew'].includes(formData.category)) {
        errs.category = 'Please choose a category.';
      }
    } else if (step === 2) {
      if (formData.category === 'planner') {
        if (!formData.plannerDetails.serviceLevel) {
          errs['plannerDetails.serviceLevel'] = 'Please select a planning service level.';
        }
        if (
          !formData.plannerDetails.estimatedGuests ||
          Number(formData.plannerDetails.estimatedGuests) < 1
        ) {
          errs['plannerDetails.estimatedGuests'] = 'Estimated guest count must be at least 1.';
        }
      } else if (formData.category === 'performer') {
        if (!formData.performerDetails.performerType) {
          errs['performerDetails.performerType'] = 'Please select performer type.';
        }
        if (
          !formData.performerDetails.performanceFormat ||
          !formData.performerDetails.performanceFormat.trim()
        ) {
          errs['performerDetails.performanceFormat'] =
            'Please specify performance format and duration.';
        }
      } else if (formData.category === 'crew') {
        const roles = formData.crewDetails.rolesNeeded || [];
        if (roles.length === 0) {
          errs['crewDetails.rolesNeeded'] = 'Please add at least one crew role.';
        } else {
          const invalid = roles.some(
            (r) => !r.roleName || !r.roleName.trim() || !r.headcount || r.headcount < 1
          );
          if (invalid) {
            errs['crewDetails.rolesNeeded'] =
              'Each crew role must have a valid title and headcount >= 1.';
          }
        }
      }
    } else if (step === 4) {
      if (!formData.contact.fullName || !formData.contact.fullName.trim()) {
        errs['contact.fullName'] = 'Full name is required.';
      }
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!formData.contact.email || !emailRegex.test(formData.contact.email.trim())) {
        errs['contact.email'] = 'Please enter a valid email address.';
      }
      if (!formData.contact.phone || !formData.contact.phone.trim()) {
        errs['contact.phone'] = 'Contact phone number is required.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (!validateStep(currentStep)) {
      return;
    }
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    setCurrentStep((prev) => Math.min(4, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepJump = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit to Node + Express + MongoDB backend
  const handleFinalSubmit = async () => {
    if (!validateStep(4)) {
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await createRequirement(formData);
      setSubmittedRequirement(response.data);
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      console.error('Submission failed:', err);
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to submit requirement to the server. Please check your connection.';
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-900 flex flex-col font-sans selection:bg-[#FF4C18] selection:text-white">
      {/* Top Navigation */}
      <Navbar onLoadPreset={handleLoadPreset} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {submittedRequirement ? (
          <SubmissionSuccessModal
            requirement={submittedRequirement}
            onReset={() => {
              setSubmittedRequirement(null);
              setFormData(DEFAULT_REQUIREMENT_FORM);
              setCurrentStep(1);
              setCompletedSteps([]);
            }}
          />
        ) : (
          <div className="space-y-6">
            {/* Step Progress Tracker */}
            <StepProgress
              currentStep={currentStep}
              category={formData.category}
              onStepClick={handleStepJump}
              completedSteps={completedSteps}
            />

            {/* Step Card Container */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-sm">
              {currentStep === 1 && (
                <Step1EventBasics
                  data={formData}
                  updateData={updateFormData}
                  errors={errors}
                />
              )}

              {/* Step 2: Category-Specific */}
              {currentStep === 2 && formData.category === 'planner' && (
                <Step2Planner
                  data={formData}
                  updateData={updateFormData}
                  errors={errors}
                />
              )}
              {currentStep === 2 && formData.category === 'performer' && (
                <Step2Performer
                  data={formData}
                  updateData={updateFormData}
                  errors={errors}
                />
              )}
              {currentStep === 2 && formData.category === 'crew' && (
                <Step2Crew
                  data={formData}
                  updateData={updateFormData}
                  errors={errors}
                />
              )}

              {/* Step 3: Category-Specific */}
              {currentStep === 3 && formData.category === 'planner' && (
                <Step3Planner
                  data={formData}
                  updateData={updateFormData}
                  errors={errors}
                />
              )}
              {currentStep === 3 && formData.category === 'performer' && (
                <Step3Performer
                  data={formData}
                  updateData={updateFormData}
                  errors={errors}
                />
              )}
              {currentStep === 3 && formData.category === 'crew' && (
                <Step3Crew
                  data={formData}
                  updateData={updateFormData}
                  errors={errors}
                />
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <Step4ReviewSubmit
                  data={formData}
                  updateData={updateFormData}
                  onJumpToStep={handleStepJump}
                  onSubmit={handleFinalSubmit}
                  isSubmitting={isSubmitting}
                  errors={errors}
                  serverError={serverError}
                />
              )}

              {/* Bottom Navigation Buttons (Steps 1 to 3) */}
              {currentStep < 4 && (
                <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-2 border border-slate-200 transition-colors shadow-xs"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous Step</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="px-3.5 py-2 rounded-xl text-slate-500 hover:text-rose-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        title="Clear form and reset draft"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Form</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                      Step {currentStep} of 4
                    </span>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 rounded-xl bg-[#FF4C18] hover:bg-[#ea580c] text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-[#FF4C18]/25 transition-all hover:scale-[1.02]"
                    >
                      <span>Continue to Step {currentStep + 1}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold text-slate-700">
            StageSync Requirement Flow • Event Talent & Staffing Platform
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Adaptive Forms</span>
            <span>•</span>
            <span>Planner, Performer & Crew</span>
            <span>•</span>
            <span>Express + MongoDB</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
