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
    // Launch festive confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if confetti fails in headless/SSR
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
          pillBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          accent: 'text-emerald-400',
        };
      case 'performer':
        return {
          pillBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          accent: 'text-purple-400',
        };
      case 'crew':
        return {
          pillBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          accent: 'text-amber-400',
        };
      default:
        return {
          pillBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
          accent: 'text-indigo-400',
        };
    }
  };

  const theme = getCategoryTheme(requirement.category);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-center space-y-6 shadow-2xl animate-scaleUp max-w-xl mx-auto">
      {/* Icon badge */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
        <CheckCircle2 className="w-9 h-9 text-white stroke-[2.5]" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <Database className="w-3.5 h-3.5" />
          <span>Saved to MongoDB Successfully</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Requirement Published!
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Your event requirement is now securely stored in MongoDB and categorized under{' '}
          <strong className={`${theme.accent} capitalize`}>{requirement.category}</strong>.
        </p>
      </div>

      {/* Reference Code Card */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between max-w-sm mx-auto">
        <div className="text-left">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
            Reference Tracking Code
          </span>
          <span className="font-mono text-base font-bold text-white tracking-wide">
            {requirement.referenceCode}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopyCode}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
          title="Copy reference code"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
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
      <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white text-sm truncate mr-2">
            {requirement.eventName}
          </span>
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${theme.pillBg}`}>
            {requirement.category}
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-[11px] flex-wrap">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-indigo-400" />
            {requirement.startDate}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" />
            {requirement.location.city}
          </span>
          <span className="text-slate-400">
            Contact: {requirement.contact.fullName} ({requirement.contact.email})
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/requirements"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Explore All in Board</span>
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Post Another Requirement</span>
        </button>
      </div>
    </div>
  );
}
