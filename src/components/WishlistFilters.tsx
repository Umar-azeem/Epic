// components/WishlistFilters.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";


// Filter Section Component
function FilterSection({ 
  title, 
  items, 
  selectedItems, 
  onChange,
  searchQuery = "",
  onSearchChange 
}: { 
  title: string; 
  items: string[]; 
  selectedItems: string[];
  onChange: (item: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [localSearch, setLocalSearch] = useState("");

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes((searchQuery || localSearch).toLowerCase())
  );

  return (
    <div className="border-b border-[#2a2a2f] py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-medium text-sm hover:text-blue-400 transition"
      >
        <span>{title}</span>
        <span className="text-gray-400">{isOpen ? "−" : "+"}</span>
      </button>
      
      {isOpen && (
        <div className="mt-2 space-y-2">
          {onSearchChange && (
            <div className="relative mb-2">
              <Search className="absolute left-2 top-2 text-gray-400" size={12} />
              <input
                type="text"
                placeholder={`Search ${title.toLowerCase()}`}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-7 pr-2 py-1 text-xs bg-[#1b1b1f] border border-[#2a2a2f] rounded text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
          {filteredItems.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => onChange(item)}
                className="rounded bg-[#1b1b1f] border-[#2a2a2f] text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

interface WishlistFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  totalGames: number;
  filteredCount: number;
}

export interface FilterState {
  searchKeyword: string;
  events: string[];
  priceRanges: string[];
  genres: string[];
  features: string[];
  platforms: string[];
}

const filterOptions = {
  events: ["Deals of the Week", "EA Classic Games on Epic", "First Run", "Spring Sale", "Summer Sale"],
  priceRanges: ["Free", "Under $5.00", "Under $10.00", "Under $20.00", "$14.99 and above"],
  genres: ["Action", "Adventure", "RPG", "Shooter", "Simulation", "Strategy", "Puzzle", "Sports"],
  features: ["Achievements", "Cloud Saves", "Multiplayer", "Single Player", "Co-op", "Cross Platform"],
  platforms: ["Windows", "Mac OS", "Android", "iOS", "PC", "PS5", "Xbox"]
};

export function WishlistFilters({ onFilterChange, totalGames, filteredCount }: WishlistFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchKeyword: "",
    events: [],
    priceRanges: [],
    genres: [],
    features: [],
    platforms: []
  });

  const [activeFilterCount, setActiveFilterCount] = useState(0);

  // Count active filters
  useEffect(() => {
    const count = 
      filters.events.length +
      filters.priceRanges.length +
      filters.genres.length +
      filters.features.length +
      filters.platforms.length;
    setActiveFilterCount(count);
  }, [filters]);

  const updateFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[category] as string[];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      
      const newFilters = { ...prev, [category]: updated };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const updateSearchKeyword = (keyword: string) => {
    const newFilters = { ...filters, searchKeyword: keyword };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetState = {
      searchKeyword: "",
      events: [],
      priceRanges: [],
      genres: [],
      features: [],
      platforms: []
    };
    setFilters(resetState);
    onFilterChange(resetState);
  };

  const getPriceRangeValue = (range: string): [number, number] | null => {
    switch(range) {
      case "Free": return [0, 0];
      case "Under $5.00": return [0, 5];
      case "Under $10.00": return [0, 10];
      case "Under $20.00": return [0, 20];
      case "$14.99 and above": return [14.99, Infinity];
      default: return null;
    }
  };

  // Expose price range helper to parent
  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  return (
    <div className="w-64 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </h2>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-blue-400 text-sm hover:text-blue-300 transition"
          >
            Reset all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        <Input
          placeholder="Search in wishlist..."
          value={filters.searchKeyword}
          onChange={(e) => updateSearchKeyword(e.target.value)}
          className="pl-9 bg-[#1b1b1f] border-[#2a2a2f] text-white placeholder:text-gray-500 focus:border-blue-500"
        />
        {filters.searchKeyword && (
          <button
            onClick={() => updateSearchKeyword("")}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-400">
        Showing {filteredCount} of {totalGames} games
      </div>

      {/* Filters Accordion */}
      <div className="space-y-1">
        <FilterSection
          title="Events"
          items={filterOptions.events}
          selectedItems={filters.events}
          onChange={(item) => updateFilter("events", item)}
        />

        <FilterSection
          title="Price"
          items={filterOptions.priceRanges}
          selectedItems={filters.priceRanges}
          onChange={(item) => updateFilter("priceRanges", item)}
        />

        <FilterSection
          title="Genre"
          items={filterOptions.genres}
          selectedItems={filters.genres}
          onChange={(item) => updateFilter("genres", item)}
          searchQuery=""
          onSearchChange={() => {}}
        />

        <FilterSection
          title="Features"
          items={filterOptions.features}
          selectedItems={filters.features}
          onChange={(item) => updateFilter("features", item)}
        />

        <FilterSection
          title="Platform"
          items={filterOptions.platforms}
          selectedItems={filters.platforms}
          onChange={(item) => updateFilter("platforms", item)}
        />
      </div>
    </div>
  );
}