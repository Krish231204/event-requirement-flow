'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import {
  Sparkles,
  Music,
  Users,
  Search,
  Calendar,
  MapPin,
  Building,
  ArrowRight,
  Database,
  RefreshCw,
  PlusCircle,
  X,
  Tag,
} from 'lucide-react';
import { SavedRequirement, RequirementStats } from '../../types/requirement';
import { getRequirements, getStats, seedRequirements } from '../../lib/api';

export default function RequirementsFeedPage() {
  const [requirements, setRequirements] = useState<SavedRequirement[]>([]);
  const [stats, setStats] = useState<RequirementStats | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SavedRequirement | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [listRes, statsRes] = await Promise.all([
        getRequirements({
          category: activeCategory !== 'all' ? activeCategory : undefined,
          search: searchQuery || undefined,
        }),
        getStats(),
      ]);
      setRequirements(listRes.data || []);
      setStats(statsRes.data || null);
    } catch (err) {
      console.error('Error fetching requirements:', err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedRequirements();
      await fetchData();
    } catch (err) {
      console.error('Seed error:', err);
    } finally {
      setSeeding(false);
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'planner':
        return {
          label: 'Event Planner',
          icon: Sparkles,
          bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          accent: 'text-emerald-400',
        };
      case 'performer':
        return {
          label: 'Performer / Artist',
          icon: Music,
          bg: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
          accent: 'text-purple-400',
        };
      case 'crew':
        return {
          label: 'Production Crew',
          icon: Users,
          bg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
          accent: 'text-amber-400',
        };
      default:
        return {
          label: category,
          icon: Tag,
          bg: 'bg-slate-800 text-slate-300 border-slate-700',
          accent: 'text-slate-300',
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Header & Stats Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20 mb-2">
              <Database className="w-3.5 h-3.5" />
              <span>Live MongoDB Database Feed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Event Requirements Directory
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Inspect all posted event requirements live from the backend. Categorized dynamically under Planners, Performers, and Technical Crew.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSeed}
              disabled={seeding}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/80 flex items-center gap-2 transition-colors"
              title="Populate 3 realistic benchmark records across planner, performer and crew"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${seeding ? 'animate-spin' : ''}`} />
              <span>{seeding ? 'Seeding...' : 'Load Sample Data'}</span>
            </button>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Requirement</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Total Requirements</span>
            <span className="text-2xl font-black text-white mt-1 block">
              {stats?.total ?? requirements.length}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-emerald-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-medium">Event Planners</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">
              {stats?.planner ?? 0}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-400 font-medium">Performers / Acts</span>
              <Music className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-2xl font-black text-purple-400 mt-1 block">
              {stats?.performer ?? 0}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-amber-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-400 font-medium">Production Crew</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-2xl font-black text-amber-400 mt-1 block">
              {stats?.crew ?? 0}
            </span>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
          {/* Category Tabs */}
          <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'planner', label: 'Planners' },
              { id: 'performer', label: 'Performers' },
              { id: 'crew', label: 'Crew' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeCategory === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, city, ref..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </form>
        </div>

        {/* Requirements Card Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-400" />
            Loading requirements from MongoDB...
          </div>
        ) : requirements.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">No requirements found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No event requirements match this filter. Post your first requirement or click &apos;Load Sample Data&apos; to view demo requirements.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSeed}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
              >
                Seed 3 Sample Records
              </button>
              <Link
                href="/"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium"
              >
                Post Requirement
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {requirements.map((item) => {
              const badge = getCategoryBadge(item.category);
              const BadgeIcon = badge.icon;

              return (
                <div
                  key={item._id}
                  className="rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl group"
                >
                  <div className="space-y-3">
                    {/* Top Row: Ref code & Category */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md font-semibold">
                        {item.referenceCode}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.bg}`}>
                        <BadgeIcon className="w-3 h-3" />
                        <span>{badge.label}</span>
                      </span>
                    </div>

                    {/* Title & Type */}
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                        {item.eventName}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{item.eventType}</p>
                    </div>

                    {/* Quick Metadata */}
                    <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                        <span>
                          {item.startDate}
                          {item.dateType === 'range' && item.endDate ? ` → ${item.endDate}` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">
                          {item.location.city}
                          {item.location.state ? `, ${item.location.state}` : ''}
                        </span>
                      </div>
                      {item.venue?.name && (
                        <div className="flex items-center gap-2">
                          <Building className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                          <span className="truncate">{item.venue.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Category-Specific Preview Pill */}
                    <div className="pt-2">
                      {item.category === 'planner' && item.plannerDetails && (
                        <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-[11px] space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Planning Scope:</span>
                            <span className="font-semibold text-emerald-300">
                              {item.plannerDetails.serviceLevel}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Target Guests:</span>
                            <span className="font-bold text-white">
                              {item.plannerDetails.estimatedGuests}
                            </span>
                          </div>
                        </div>
                      )}

                      {item.category === 'performer' && item.performerDetails && (
                        <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-[11px] space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Act:</span>
                            <span className="font-semibold text-purple-300">
                              {item.performerDetails.performerType}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Format:</span>
                            <span className="font-bold text-white truncate max-w-[140px]">
                              {item.performerDetails.performanceFormat}
                            </span>
                          </div>
                        </div>
                      )}

                      {item.category === 'crew' && item.crewDetails && (
                        <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-[11px] space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Total Staff:</span>
                            <span className="font-bold text-amber-300">
                              {item.crewDetails.totalCrewCount || item.crewDetails.rolesNeeded?.length} heads
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Rate:</span>
                            <span className="font-bold text-white">
                              {item.crewDetails.payStructure?.currency || 'USD'}{' '}
                              {item.crewDetails.payStructure?.rateAmount}/
                              {item.crewDetails.payStructure?.rateType === 'hourly' ? 'hr' : 'day'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>View Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Detail Drawer */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-indigo-300 font-bold">
                    {selectedItem.referenceCode}
                  </span>
                  <span className="text-xs text-slate-400">
                    MongoDB ID: <code className="text-slate-400 text-[10px]">{selectedItem._id}</code>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-xl font-bold text-white">{selectedItem.eventName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-400">{selectedItem.eventType}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs capitalize font-semibold text-indigo-400">
                    Category: {selectedItem.category}
                  </span>
                </div>
              </div>

              {/* Basics Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Dates & Time</span>
                  <span className="font-medium text-white">
                    {selectedItem.startDate}
                    {selectedItem.dateType === 'range' && selectedItem.endDate
                      ? ` → ${selectedItem.endDate}`
                      : ''}{' '}
                    ({selectedItem.startTime || 'TBD'} - {selectedItem.endTime || 'TBD'})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Location</span>
                  <span className="font-medium text-white">
                    {selectedItem.location.city}, {selectedItem.location.state || selectedItem.location.country}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Venue</span>
                  <span className="font-medium text-white">
                    {selectedItem.venue?.name || 'Venue TBD'} ({selectedItem.venue?.venueType})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Contact Person</span>
                  <span className="font-medium text-white">
                    {selectedItem.contact?.fullName} ({selectedItem.contact?.phone})
                  </span>
                </div>
              </div>

              {/* Category Deep Dive */}
              {selectedItem.category === 'planner' && selectedItem.plannerDetails && (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-3 text-xs">
                  <h4 className="font-bold text-emerald-400 text-sm">Planner Configuration</h4>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div>
                      <strong>Service Level:</strong> {selectedItem.plannerDetails.serviceLevel}
                    </div>
                    <div>
                      <strong>Guest Count:</strong> {selectedItem.plannerDetails.estimatedGuests}
                    </div>
                    <div>
                      <strong>Budget:</strong> {selectedItem.plannerDetails.budgetRange?.currency}{' '}
                      {selectedItem.plannerDetails.budgetRange?.min} -{' '}
                      {selectedItem.plannerDetails.budgetRange?.max}
                    </div>
                    <div>
                      <strong>Theme:</strong> {selectedItem.plannerDetails.themeAesthetic || 'None'}
                    </div>
                  </div>
                  {selectedItem.plannerDetails.servicesNeeded?.length > 0 && (
                    <div>
                      <strong className="block text-slate-300 mb-1">Services Needed:</strong>
                      <div className="flex flex-wrap gap-1">
                        {selectedItem.plannerDetails.servicesNeeded.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedItem.category === 'performer' && selectedItem.performerDetails && (
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-3 text-xs">
                  <h4 className="font-bold text-purple-400 text-sm">Performer Configuration</h4>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div>
                      <strong>Act:</strong> {selectedItem.performerDetails.performerType}
                    </div>
                    <div>
                      <strong>Format:</strong> {selectedItem.performerDetails.performanceFormat}
                    </div>
                    <div>
                      <strong>Fee:</strong> {selectedItem.performerDetails.compensation?.currency}{' '}
                      {selectedItem.performerDetails.compensation?.amount} (
                      {selectedItem.performerDetails.compensation?.rateType})
                    </div>
                    <div>
                      <strong>Travel:</strong> {selectedItem.performerDetails.travelAccommodation}
                    </div>
                  </div>
                  {selectedItem.performerDetails.hospitalityRider?.length > 0 && (
                    <div>
                      <strong className="block text-slate-300 mb-1">Hospitality Rider:</strong>
                      <div className="flex flex-wrap gap-1">
                        {selectedItem.performerDetails.hospitalityRider.map((h) => (
                          <span
                            key={h}
                            className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedItem.category === 'crew' && selectedItem.crewDetails && (
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-3 text-xs">
                  <h4 className="font-bold text-amber-400 text-sm">Crew Configuration</h4>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div>
                      <strong>Total Headcount:</strong> {selectedItem.crewDetails.totalCrewCount}
                    </div>
                    <div>
                      <strong>Experience:</strong> {selectedItem.crewDetails.experienceLevel}
                    </div>
                    <div>
                      <strong>Rate:</strong> {selectedItem.crewDetails.payStructure?.currency}{' '}
                      {selectedItem.crewDetails.payStructure?.rateAmount} /{' '}
                      {selectedItem.crewDetails.payStructure?.rateType}
                    </div>
                    <div>
                      <strong>Dress Code:</strong> {selectedItem.crewDetails.uniformDressCode}
                    </div>
                  </div>
                  {selectedItem.crewDetails.rolesNeeded?.length > 0 && (
                    <div>
                      <strong className="block text-slate-300 mb-1">Roles:</strong>
                      <div className="space-y-1">
                        {selectedItem.crewDetails.rolesNeeded.map((r, i) => (
                          <div
                            key={i}
                            className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 text-[11px] flex justify-between"
                          >
                            <span>{r.roleName}</span>
                            <span>{r.headcount} heads • Shift: {r.callTime}-{r.wrapTime}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
