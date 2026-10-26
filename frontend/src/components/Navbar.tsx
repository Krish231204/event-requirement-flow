'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, PlusCircle } from 'lucide-react';
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* GoPratle Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4C18] to-[#FF6B3D] flex items-center justify-center shadow-md shadow-[#FF4C18]/25 group-hover:scale-105 transition-transform overflow-hidden p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/de6aivvo3/image/upload/v1748882547/Logo_1_qy4auw.png"
              alt="GoPratle Logo"
              className="w-full h-full object-contain filter brightness-0 invert"
              onError={(e) => {
                // fallback if image blocked
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Go<span className="text-[#FF4C18]">Pratle</span>
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#FF4C18]/10 text-[#FF4C18] border border-[#FF4C18]/20">
                Requirement Flow
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Your One-Stop Destination for Every Occasion
            </p>
          </div>
        </Link>

        {/* Center Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              pathname === '/'
                ? 'bg-[#FF4C18] text-white shadow-sm shadow-[#FF4C18]/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Requirement</span>
          </Link>
          <Link
            href="/requirements"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              pathname === '/requirements'
                ? 'bg-[#FF4C18] text-white shadow-sm shadow-[#FF4C18]/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Live Directory</span>
          </Link>
        </nav>

        {/* Right Actions & Health Status */}
        <div className="flex items-center gap-3">
          {/* Quick Preset Loader (visible on home page) */}
          {pathname === '/' && onLoadPreset && (
            <div className="hidden lg:flex items-center gap-1 text-xs bg-slate-100 p-1 rounded-xl border border-slate-200">
              <span className="text-slate-500 px-2 font-semibold">Test Presets:</span>
              <button
                type="button"
                onClick={() => onLoadPreset('planner')}
                className="px-2 py-1 rounded-lg hover:bg-white text-slate-700 hover:text-[#FF4C18] transition-colors font-medium hover:shadow-xs"
                title="Fill with Royal Wedding Planner preset"
              >
                Wedding
              </button>
              <button
                type="button"
                onClick={() => onLoadPreset('performer')}
                className="px-2 py-1 rounded-lg hover:bg-white text-slate-700 hover:text-[#FF4C18] transition-colors font-medium hover:shadow-xs"
                title="Fill with EDM Festival DJ preset"
              >
                Festival DJ
              </button>
              <button
                type="button"
                onClick={() => onLoadPreset('crew')}
                className="px-2 py-1 rounded-lg hover:bg-white text-slate-700 hover:text-[#FF4C18] transition-colors font-medium hover:shadow-xs"
                title="Fill with Tech Summit AV Crew preset"
              >
                AV Crew
              </button>
            </div>
          )}

          {/* Backend Health Status Pill */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${
              isBackendOnline === true
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : isBackendOnline === false
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
            title={
              isBackendOnline === true
                ? 'Backend API and MongoDB are connected'
                : 'Connecting to backend at http://localhost:5001'
            }
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isBackendOnline === true
                  ? 'bg-emerald-500 animate-pulse'
                  : isBackendOnline === false
                  ? 'bg-rose-500'
                  : 'bg-slate-400 animate-ping'
              }`}
            />
            <span className="hidden sm:inline">
              {isBackendOnline === true
                ? 'API Online'
                : isBackendOnline === false
                ? 'API Offline'
                : 'Checking...'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
