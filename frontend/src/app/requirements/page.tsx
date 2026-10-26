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
          bg: 'bg-orange-50 text-[#FF4C18] border-orange-200',
          accent: 'text-[#FF4C18]',
        };
      case 'performer':
        return {
          label: 'Performer / Artist',
          icon: Music,
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          accent: 'text-purple-600',
        };
      case 'crew':
        return {
          label: 'Production Crew',
          icon: Users,
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          accent: 'text-blue-600',
        };
      default:
        return {
          label: category,
          icon: Tag,
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          accent: 'text-slate-600',
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Header & Stats Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#FF4C18] text-xs font-bold border border-orange-200 mb-2">
              <Database className="w-3.5 h-3.5" />
              <span>GoPratle MongoDB Live Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Event Requirements Directory
            </h1>
            <p className="text-slate-500 text-sm mt-1 max-w-2xl font-medium">
              Inspect all posted event requirements live from the backend. Categorized dynamically under Planners, Performers, and Technical Crew.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSeed}
              disabled={seeding}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-xs flex items-center gap-2 transition-colors"
              title="Populate 3 realistic benchmark records across planner, performer and crew"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#FF4C18] ${seeding ? 'animate-spin' : ''}`} />
              <span>{seeding ? 'Seeding...' : 'Load Sample Data'}</span>
            </button>
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-[#FF4C18] hover:bg-[#ea580c] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#FF4C18]/25 transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Requirement</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-bold block">Total Requirements</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {stats?.total ?? requirements.length}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-orange-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#FF4C18] font-bold">Event Planners</span>
              <Sparkles className="w-4 h-4 text-[#FF4C18]" />
            </div>
            <span className="text-2xl font-black text-[#FF4C18] mt-1 block">
              {stats?.planner ?? 0}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-700 font-bold">Performers / Acts</span>
              <Music className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-2xl font-black text-purple-700 mt-1 block">
              {stats?.performer ?? 0}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-700 font-bold">Production Crew</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-2xl font-black text-blue-700 mt-1 block">
              {stats?.crew ?? 0}
            </span>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
          {/* Category Tabs */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 w-full sm:w-auto">
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
                className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeCategory === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, city, ref..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#FF4C18] transition-colors shadow-xs"
            />
          </form>
        </div>

        {/* Requirements Card Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 text-sm font-medium">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#FF4C18]" />
            Loading requirements from MongoDB...
          </div>
        ) : requirements.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto text-[#FF4C18]">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">No requirements found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No event requirements match this filter. Post your first requirement or click &apos;Load Sample Data&apos; to view demo requirements.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSeed}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200"
              >
                Seed 3 Sample Records
              </button>
              <Link
                href="/"
                className="px-4 py-2 rounded-xl bg-[#FF4C18] hover:bg-[#ea580c] text-white text-xs font-bold"
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
                  className="rounded-2xl bg-white border border-slate-200 hover:border-slate-300 p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-md group"
                >
                  <div className="space-y-3">
                    {/* Top Row: Ref code & Category */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-bold">
                        {item.referenceCode}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.bg}`}>
                        <BadgeIcon className="w-3 h-3" />
                        <span>{badge.label}</span>
                      </span>
                    </div>

                    {/* Title & Type */}
                    <div>
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-[#FF4C18] transition-colors line-clamp-1">
                        {item.eventName}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">{item.eventType}</p>
                    </div>

                    {/* Quick Metadata */}
                    <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#FF4C18] flex-shrink-0" />
                        <span className="font-medium">
                          {item.startDate}
                          {item.dateType === 'range' && item.endDate ? ` → ${item.endDate}` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate font-medium">
                          {item.location.city}
                          {item.location.state ? `, ${item.location.state}` : ''}
                        </span>
                      </div>
                      {item.venue?.name && (
                        <div className="flex items-center gap-2">
                          <Building className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                          <span className="truncate font-medium">{item.venue.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Category-Specific Preview Pill */}
                    <div className="pt-2">
                      {item.category === 'planner' && item.plannerDetails && (
                        <div className="p-2.5 rounded-xl bg-orange-50/50 border border-orange-100 text-[11px] space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Planning Scope:</span>
                            <span className="font-bold text-[#FF4C18]">
                              {item.plannerDetails.serviceLevel}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Target Guests:</span>
                            <span className="font-bold text-slate-900">
                              {item.plannerDetails.estimatedGuests}
                            </span>
                          </div>
                        </div>
                      )}

                      {item.category === 'performer' && item.performerDetails && (
                        <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-[11px] space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Act:</span>
                            <span className="font-bold text-purple-700">
                              {item.performerDetails.performerType}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Format:</span>
                            <span className="font-bold text-slate-900 truncate max-w-[140px]">
                              {item.performerDetails.performanceFormat}
                            </span>
                          </div>
                        </div>
                      )}

                      {item.category === 'crew' && item.crewDetails && (
                        <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 text-[11px] space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Total Staff:</span>
                            <span className="font-bold text-blue-700">
                              {item.crewDetails.totalCrewCount || item.crewDetails.rolesNeeded?.length} heads
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Rate:</span>
                            <span className="font-bold text-slate-900">
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
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="text-xs text-[#FF4C18] hover:text-[#ea580c] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-orange-50 text-[#FF4C18] font-bold border border-orange-200">
                    {selectedItem.referenceCode}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    MongoDB ID: <code className="text-slate-600 text-[10px]">{selectedItem._id}</code>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedItem.eventName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 font-medium">{selectedItem.eventType}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs capitalize font-bold text-[#FF4C18]">
                    Category: {selectedItem.category}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold">Dates & Time</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.startDate}
                    {selectedItem.dateType === 'range' && selectedItem.endDate
                      ? ` → ${selectedItem.endDate}`
                      : ''}{' '}
                    ({selectedItem.startTime || 'TBD'} - {selectedItem.endTime || 'TBD'})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold">Location</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.location.city}, {selectedItem.location.state || selectedItem.location.country}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold">Venue</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.venue?.name || 'Venue TBD'} ({selectedItem.venue?.venueType})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold">Contact Person</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.contact?.fullName} ({selectedItem.contact?.phone})
                  </span>
                </div>
              </div>

              {selectedItem.category === 'planner' && selectedItem.plannerDetails && (
                <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-3 text-xs">
                  <h4 className="font-bold text-[#FF4C18] text-sm">Planner Configuration</h4>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
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
                      <strong className="block text-slate-700 mb-1">Services Needed:</strong>
                      <div className="flex flex-wrap gap-1">
                        {selectedItem.plannerDetails.servicesNeeded.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded bg-white text-[#FF4C18] border border-orange-200 text-[10px] font-bold"
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
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-3 text-xs">
                  <h4 className="font-bold text-purple-700 text-sm">Performer Configuration</h4>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
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
                      <strong className="block text-slate-700 mb-1">Hospitality Rider:</strong>
                      <div className="flex flex-wrap gap-1">
                        {selectedItem.performerDetails.hospitalityRider.map((h) => (
                          <span
                            key={h}
                            className="px-2 py-0.5 rounded bg-white text-purple-700 border border-purple-200 text-[10px] font-bold"
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
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3 text-xs">
                  <h4 className="font-bold text-blue-700 text-sm">Crew Configuration</h4>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
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
                      <strong className="block text-slate-700 mb-1">Roles:</strong>
                      <div className="space-y-1">
                        {selectedItem.crewDetails.rolesNeeded.map((r, i) => (
                          <div
                            key={i}
                            className="px-2.5 py-1 rounded bg-white text-blue-700 border border-blue-200 text-[11px] font-medium flex justify-between"
                          >
                            <span className="font-bold">{r.roleName}</span>
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
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
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
