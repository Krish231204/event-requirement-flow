'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Layers, PlusCircle } from 'lucide-react';
import { checkApiHealth } from '../lib/api';

export default function Navbar({
  onLoadPreset,
}: {
  onLoadPreset?: (key: 'planner' | 'performer' | 'crew') => void;
}) {
  const pathname = usePathname();
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    async function verifyHealth() {
      const res = await checkApiHealth();
      if (mounted) {
        setIsBackendOnline(res.healthy);
      }
    }
    verifyHealth();
    const interval = setInterval(verifyHealth, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                StageSync
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Posting Flow
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Events Requirement Platform
            </p>
          </div>
        </Link>

        {/* Center Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Requirement</span>
          </Link>
          <Link
            href="/requirements"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/requirements'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Explore Board</span>
          </Link>
        </nav>

        {/* Right Actions & Health Status */}
        <div className="flex items-center gap-3">
          {/* Quick Preset Loader (visible on home page) */}
          {pathname === '/' && onLoadPreset && (
            <div className="hidden md:flex items-center gap-1.5 text-xs bg-slate-800/80 p-1 rounded-lg border border-slate-700/60">
              <span className="text-slate-400 px-2 font-medium">Quick Fill:</span>
              <button
                type="button"
                onClick={() => onLoadPreset('planner')}
                className="px-2 py-1 rounded hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                title="Fill with Royal Wedding Planner preset"
              >
                Wedding
              </button>
              <button
                type="button"
                onClick={() => onLoadPreset('performer')}
                className="px-2 py-1 rounded hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 transition-colors font-medium"
                title="Fill with EDM Festival DJ preset"
              >
                Festival DJ
              </button>
              <button
                type="button"
                onClick={() => onLoadPreset('crew')}
                className="px-2 py-1 rounded hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 transition-colors font-medium"
                title="Fill with Tech Summit AV Crew preset"
              >
                AV Crew
              </button>
            </div>
          )}

          {/* Backend Health Pill */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
              isBackendOnline === true
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                : isBackendOnline === false
                ? 'bg-rose-950/60 text-rose-400 border-rose-800/60'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title={
              isBackendOnline === true
                ? 'Backend API and MongoDB are connected'
                : 'Attempting connection to backend at http://localhost:5001'
            }
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isBackendOnline === true
                  ? 'bg-emerald-400 animate-pulse'
                  : isBackendOnline === false
                  ? 'bg-rose-400'
                  : 'bg-slate-400 animate-ping'
              }`}
            />
            <span className="hidden sm:inline">
              {isBackendOnline === true
                ? 'API Online'
                : isBackendOnline === false
                ? 'API Disconnected'
                : 'Checking API...'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
