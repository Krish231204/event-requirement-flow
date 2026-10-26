'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  PlusCircle,
  Database,
  Calendar,
  MapPin,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SavedRequirement } from '../types/requirement';

interface SuccessModalProps {
  requirement: SavedRequirement;
  onReset: () => void;
}

export default function SubmissionSuccessModal({
  requirement,
  onReset,
}: SuccessModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#FF4C18', '#FF7A45', '#7C3AED', '#2563EB', '#10B981'],
      });
    } catch {
      // Ignore if confetti fails in SSR
    }
  }, []);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(requirement.referenceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'planner':
        return {
          pillBg: 'bg-orange-50 text-[#FF4C18] border-orange-200',
          accent: 'text-[#FF4C18]',
        };
      case 'performer':
        return {
          pillBg: 'bg-purple-50 text-purple-700 border-purple-200',
          accent: 'text-purple-600',
        };
      case 'crew':
        return {
          pillBg: 'bg-blue-50 text-blue-700 border-blue-200',
          accent: 'text-blue-600',
        };
      default:
        return {
          pillBg: 'bg-slate-100 text-slate-700 border-slate-200',
          accent: 'text-slate-700',
        };
    }
  };

  const theme = getCategoryTheme(requirement.category);

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 text-center space-y-6 shadow-xl max-w-xl mx-auto animate-scaleUp">
      {/* Icon badge */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF4C18] to-[#FF7A45] flex items-center justify-center mx-auto shadow-lg shadow-[#FF4C18]/25">
        <CheckCircle2 className="w-9 h-9 text-white stroke-[2.5]" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#FF4C18] text-xs font-bold border border-orange-200">
          <Database className="w-3.5 h-3.5" />
          <span>Saved to GoPratle Database Successfully</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Requirement Published!
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Your event requirement is now securely stored in MongoDB and categorized under{' '}
          <strong className={`${theme.accent} capitalize`}>{requirement.category}</strong>.
        </p>
      </div>

      {/* Reference Code Card */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between max-w-sm mx-auto shadow-xs">
        <div className="text-left">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
            Reference Tracking Code
          </span>
          <span className="font-mono text-base font-bold text-slate-900 tracking-wide">
            {requirement.referenceCode}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopyCode}
          className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold border border-slate-200 shadow-xs"
          title="Copy reference code"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-600">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Snapshot summary */}
      <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 text-sm truncate mr-2">
            {requirement.eventName}
          </span>
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${theme.pillBg}`}>
            {requirement.category}
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-600 text-[11px] flex-wrap font-medium">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#FF4C18]" />
            {requirement.startDate}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-600" />
            {requirement.location.city}
          </span>
          <span className="text-slate-500">
            Contact: {requirement.contact.fullName} ({requirement.contact.email})
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/requirements"
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#FF4C18] hover:bg-[#ea580c] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#FF4C18]/25 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Explore All in Board</span>
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Post Another Requirement</span>
        </button>
      </div>
    </div>
  );
}
