import React, { useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";

const addOns = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop",
    type: "Game Add-On",
    title: "Cyberpunk 2077: Phantom Liberty",
    price: "$29.99",
    platform: "Windows",
  },
  // {
  //   id: 2,
  //   image:
  //     "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
  //   type: "Soundtrack",
  //   title: "The Last of Us Part II - Original Score",
  //   price: "$9.99",
  //   platform: "iOS",
  // },
  // {
  //   id: 3,
  //   image:
  //     "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&h=600&fit=crop",
  //   type: "Book",
  //   title: "Elden Ring Official Art Collection",
  //   price: "Free",
  //   platform: "Android",
  // },
  // {
  //   id: 4,
  //   image:
  //     "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=600&fit=crop",
  //   type: "Game Add-On",
  //   title: "Resident Evil 4 - Separate Ways",
  //   price: "$19.99",
  //   platform: "Windows",
  // },
  // {
  //   id: 5,
  //   image:
  //     "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop",
  //   type: "Soundtrack",
  //   title: "God of War Ragnarök - Bear McCreary",
  //   price: "$12.99",
  //   platform: "Mac OS",
  // },
  // {
  //   id: 6,
  //   image:
  //     "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop",
  //   type: "Book",
  //   title: "Hades: The Complete Visual Guide",
  //   price: "$14.99",
  //   platform: "iOS",
  // },
  // {
  //   id: 7,
  //   image:
  //     "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=400&h=600&fit=crop",
  //   type: "Game Add-On",
  //   title: "Baldur's Gate 3 - Deluxe Pack",
  //   price: "$24.99",
  //   platform: "Windows",
  // },
  // {
  //   id: 8,
  //   image:
  //     "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=600&fit=crop",
  //   type: "Soundtrack",
  //   title: "Final Fantasy XVI Original Score",
  //   price: "$11.99",
  //   platform: "Android",
  // },
  // {
  //   id: 9,
  //   image:
  //     "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=600&fit=crop",
  //   type: "Game Add-On",
  //   title: "Starfield: Shattered Space",
  //   price: "Free",
  //   platform: "Windows",
  // },
  // {
  //   id: 10,
  //   image:
  //     "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=600&fit=crop",
  //   type: "Book",
  //   title: "The Art of Ghost of Tsushima",
  //   price: "$18.99",
  //   platform: "Mac OS",
  // },
];

type FilterDropdownProps = {
  title: string
  options: { label: string; value: string }[]
  category: string
  isOpen: boolean
  onToggle: (category: string) => void
  selectedValues: string[]
  onValueChange: (category: string, value: string) => void
}
const FilterSection = ({
  title,
  options,
  category,
  isOpen,
  onToggle,
  selectedValues,
  onValueChange,
}:FilterDropdownProps) => (
  <div className="border-b border-text-clr/20">
    <button
      onClick={() => onToggle(category)}
      className="w-full flex items-center justify-between py-4 px-6 md:px-0 text-left hover:bg-gray-800/50 transition-colors"
    >
      <span className="text-text-clr-light text-base font-medium">{title}</span>
      <ChevronDown
        className={`w-5 h-5 text-text-clr-light transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    {isOpen && (
      <div className=" md:px-0 px-6 py-2 pb-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onValueChange(category, option)}
            className={`w-full text-left py-3 px-4  md:px-0 rounded transition-colors mb-2 last:mb-0 ${
              selectedValues.includes(option)
                ? "bg-gray-700 text-text-clr"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <span className="text-sm">{option}</span>
          </button>
        ))}
      </div>
    )}
  </div>
);

// Filter configuration
const FILTER_CONFIG = {
  price: {
    title: "Price",
    options: [
      "Free",
      "Under $5.00",
      "Under $10.00",
      "Under $20.00",
      "Under $30.00",
    ],
  },
  types: {
    title: "Types",
    options: ["Book", "Game Add-On", "Soundtrack"],
  },
  platform: {
    title: "Platform",
    options: ["Android", "iOS", "Mac OS", "Windows"],
  },
};

// Main Component
export default function AddOne() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [openSection, setOpenSection] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    types: [],
    platform: [],
  });
  const [keyword, setKeyword] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Toggle filter section
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Toggle individual filter
  const toggleFilter = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  // Clear all filters
  const handleClear = () => {
    setSelectedFilters({
      price: [],
      types: [],
      platform: [],
    });
    setKeyword("");
  };

  // Apply filters
  const handleApply = () => {
    console.log("Applied filters:", { ...selectedFilters, keyword });
    setShowMobileFilters(false);
  };

  // Filter products based on selected filters
  const getFilteredProducts = () => {
    return addOns.filter((addon) => {
      // Filter by category dropdown
      if (selectedFilter !== "all") {
        const filterMap = {
          soundtrack: "Soundtrack",
          artbook: "Book",
          "game-addon": "Game Add-On",
        };
        if (addon.type !== filterMap[selectedFilter]) return false;
      }

      // Filter by keyword
      if (
        keyword &&
        !addon.title.toLowerCase().includes(keyword.toLowerCase())
      ) {
        return false;
      }

      // Filter by types
      if (
        selectedFilters.types.length > 0 &&
        !selectedFilters.types.includes(addon.type)
      ) {
        return false;
      }

      // Filter by platform
      if (
        selectedFilters.platform.length > 0 &&
        !selectedFilters.platform.includes(addon.platform)
      ) {
        return false;
      }

      // Filter by price
      if (selectedFilters.price.length > 0) {
        const priceValue =
          addon.price === "Free" ? 0 : parseFloat(addon.price.replace("$", ""));
        const matchesPrice = selectedFilters.price.some((priceFilter) => {
          if (priceFilter === "Free") return addon.price === "Free";
          if (priceFilter === "Under $5.00") return priceValue < 5;
          if (priceFilter === "Under $10.00") return priceValue < 10;
          if (priceFilter === "Under $20.00") return priceValue < 20;
          if (priceFilter === "Under $30.00") return priceValue < 30;
          return false;
        });
        if (!matchesPrice) return false;
      }

      return true;
    });
  };

  const filteredProducts = getFilteredProducts();

  // Count active filters
  const activeFiltersCount =
    selectedFilters.price.length +
    selectedFilters.types.length +
    selectedFilters.platform.length +
    (keyword ? 1 : 0);

  // Filter Sidebar Component
  const FilterSidebar = ({ isMobile = false }) => (
    <div
      className={`flex flex-col justify-between  max-h-screen  overflow-hidden ${
        !isMobile ? "sticky top-4" : ""
      }`}
    >
      {/* Header */}

      <div className="p-6 pb-4 flex items-center justify-between">
        <h2 className="text-white text-2xl font-bold">Filters</h2>
        {isMobile && (
          <button
            onClick={() => setShowMobileFilters(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Keyword Search */}
      <div className="px-6 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Keywords"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full bg-zinc-800 text-white placeholder-gray-500 rounded pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-shadow"
          />
        </div>
      </div>

      {/* Filter Sections */}
      {Object.entries(FILTER_CONFIG).map(([key, { title, options }]) => (
        <FilterSection
          key={key}
          title={title}
          options={options}
          category={key}
          isOpen={openSection === key}
          onToggle={toggleSection}
          selectedValues={selectedFilters[key]}
          onValueChange={toggleFilter}
        />
      ))}

      {/* Action Buttons */}
      <div className="p-6 flex gap-3 md:hidden">
        <button
          onClick={handleClear}
          className="flex-1 px-4 py-2.5 border border-text-clr  text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
        >
          Clear
        </button>
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-2.5 bg-btn-primary  text-black rounded hover:bg-btn-primary/70 transition-colors font-medium"
        >
          Apply
        </button>
      </div>
    </div>
  );
  const filters = [
    { label: "All", value: "all" },
    { label: "New Release", value: "new-release" },
    { label: "Soundtrack", value: "soundtrack" },
    { label: "Art Book", value: "artbook" },
    { label: "Game Add-On", value: "game-addon" },
  ];
  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filter Controls */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm font-medium">Show:</span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-3 py-2 bg-[#18181C] text-white rounded-md hover:bg-white/5 transition-colors">
                      <span className="text-sm capitalize">
                        {filters.find((f) => f.value === selectedFilter)?.label}
                      </span>
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    className="w-56 bg-dp-bg text-white border border-[#3a3a49] backdrop-blur-md"
                  >
                    {filters.map((filter) => (
                      <DropdownMenuItem
                        key={filter.value}
                        onClick={() => setSelectedFilter(filter.value)}
                        className="cursor-pointer focus:bg-white/10"
                      >
                        {filter.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-white text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Results Count */}
            <div className="text-gray-400 text-sm">
              Showing {filteredProducts.length} of {addOns.length} results
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleClear}
                  className="ml-2 text-white hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((addon) => (
                  <div
                    key={addon.id}
                    className="bg-transparent overflow-hidden group cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-800">
                        <Image
                          width={100}
                          height={100}
                          src="/img/gloomy-eyes.png"
                          alt={addon.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                            {addon.type}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {addon.platform}
                          </span>
                        </div>
                        <h3 className="text-white font-semibold text-base leading-tight line-clamp-2 group-hover:text-gray-300 transition-colors">
                          {addon.title}
                        </h3>
                        <div>
                          <span className="text-white font-bold text-lg">
                            {addon.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg">
                    No products found matching your filters.
                  </p>
                  <button
                    onClick={handleClear}
                    className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-100 transition-colors font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar />
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0  bg-opacity-75 z-50 lg:hidden">
          <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-[#18181C] overflow-y-auto">
            <FilterSidebar isMobile={true} />
          </div>
        </div>
      )}
    </div>
  );
}
