// src/app/wishlist/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Trash2,
  Heart,
  ShoppingBag,
  Star,
  Filter,
  ChevronDown,
  X,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface WishlistItem {
  _id: string;
  gameId: string;
  gameData: {
    _id?: string;
    title: string;
    price?: number;
    currentPrice?: number;
    originalPrice?: number;
    discount?: number;
    image?: string;
    mainImage?: string;
    coverImage?: string;
    description?: string;
    category?: string;
    platforms?: string[];
    slug?: string;
    rating?: number;
    genre?: string[];
    isFree?: boolean;
  };
  addedAt: string;
}

// Filter options
const sortOptions = [
  "On Sale",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
  "Oldest",
];

export default function WishlistPage() {
  const { isAuthenticated, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [filteredWishlist, setFilteredWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(true);

  // Filter states
  const [sortBy, setSortBy] = useState("On Sale");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter configuration
  const filterConfig = {
    events: [
      "Deals of the Week",
      "EA Classic Games on Epic",
      "First Run",
      "Spring Sale",
      "Summer Sale",
    ],
    priceRanges: [
      "Free",
      "Under $5.00",
      "Under $10.00",
      "Under $20.00",
      "$14.99 and above",
    ],
    genres: [
      "Action",
      "Adventure",
      "RPG",
      "Shooter",
      "Simulation",
      "Strategy",
      "Puzzle",
      "Sports",
    ],
    features: [
      "Achievements",
      "Cloud Saves",
      "Multiplayer",
      "Single Player",
      "Co-op",
      "Cross Platform",
    ],
    platforms: ["Windows", "Mac OS", "Android", "iOS", "PC", "PS5", "Xbox"],
  };

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        localStorage.setItem("redirectAfterLogin", "/wishlist");
        router.push("/login");
        return;
      }
      if (isAuthenticated && token) {
        fetchWishlist();
      }
    }
  }, [authLoading, isAuthenticated, token, router]);

  useEffect(() => {
    applyFilters();
  }, [
    wishlist,
    sortBy,
    searchKeyword,
    selectedEvents,
    selectedPriceRanges,
    selectedGenres,
    selectedFeatures,
    selectedPlatforms,
  ]);

  const fetchWishlist = async () => {
    setError(null);
    try {
      const res = await fetch(
        "https://epic-backend-fslq.vercel.app/api/users/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch wishlist: ${res.status}`);
      }

      const data = await res.json();

      let wishlistData = [];
      if (Array.isArray(data)) {
        wishlistData = data;
      } else if (data.wishlist && Array.isArray(data.wishlist)) {
        wishlistData = data.wishlist;
      } else if (data.data && Array.isArray(data.data)) {
        wishlistData = data.data;
      }

      setWishlist(wishlistData);
      setFilteredWishlist(wishlistData);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load wishlist",
      );
    } finally {
      setLoading(false);
    }
  };

  const getGamePrice = (game: any) => {
    if (game.currentPrice) return game.currentPrice;
    if (game.price) return game.price;
    return 0;
  };

  const getOriginalPrice = (game: any) => {
    if (game.originalPrice) return game.originalPrice;
    if (game.price && game.discount) {
      return game.price / (1 - game.discount / 100);
    }
    return getGamePrice(game);
  };

  const getGameImage = (game: any) => {
    if (game.image) return game.image;
    if (game.mainImage) return game.mainImage;
    if (game.coverImage) return game.coverImage;
    return "https://placehold.co/400x600/1e1e22/ffffff?text=No+Image";
  };

  const removeFromWishlist = async (gameId: string) => {
    setRemovingId(gameId);
    try {
      const res = await fetch(
        `https://epic-backend-fslq.vercel.app/api/users/wishlist/${gameId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.ok) {
        const updatedWishlist = wishlist.filter(
          (item) => item.gameId !== gameId,
        );
        setWishlist(updatedWishlist);
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    } finally {
      setRemovingId(null);
    }
  };

  const applyFilters = () => {
    let filtered = [...wishlist];

    // Search by keyword
    if (searchKeyword) {
      filtered = filtered.filter((item) =>
        item.gameData.title.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
    }

    // Filter by genres
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((item) =>
        item.gameData.genre?.some((g) => selectedGenres.includes(g)),
      );
    }

    // Filter by platforms
    if (selectedPlatforms.length > 0) {
      filtered = filtered.filter((item) =>
        item.gameData.platforms?.some((p) => selectedPlatforms.includes(p)),
      );
    }

    // Filter by price ranges
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((item) => {
        const price = getGamePrice(item.gameData);
        return selectedPriceRanges.some((range) => {
          if (range === "Free") return price === 0 || item.gameData.isFree;
          if (range === "Under $5.00") return price > 0 && price < 5;
          if (range === "Under $10.00") return price >= 5 && price < 10;
          if (range === "Under $20.00") return price >= 10 && price < 20;
          if (range === "$14.99 and above") return price >= 14.99;
          return false;
        });
      });
    }

    // Filter by features
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter((item) => {
        return selectedFeatures.some((feature) => {
          if (feature === "Multiplayer")
            return item.gameData.platforms?.length > 0;
          if (feature === "Single Player") return true;
          if (feature === "Achievements")
            return item.gameData.rating !== undefined;
          if (feature === "Cloud Saves") return true;
          if (feature === "Co-op") return item.gameData.platforms?.length > 0;
          if (feature === "Cross Platform")
            return item.gameData.platforms?.length > 1;
          return false;
        });
      });
    }

    // Filter by on sale
    if (sortBy === "On Sale") {
      filtered = filtered.filter(
        (item) => item.gameData.discount && item.gameData.discount > 0,
      );
    }

    // Sort
    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort(
          (a, b) => getGamePrice(a.gameData) - getGamePrice(b.gameData),
        );
        break;
      case "Price: High to Low":
        filtered.sort(
          (a, b) => getGamePrice(b.gameData) - getGamePrice(a.gameData),
        );
        break;
      case "Newest":
        filtered.sort(
          (a, b) =>
            new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
        );
        break;
      case "Oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime(),
        );
        break;
    }

    setFilteredWishlist(filtered);
  };

  const toggleFilter = (type: string, value: string) => {
    switch (type) {
      case "events":
        setSelectedEvents((prev) =>
          prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev, value],
        );
        break;
      case "price":
        setSelectedPriceRanges((prev) =>
          prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev, value],
        );
        break;
      case "genre":
        setSelectedGenres((prev) =>
          prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev, value],
        );
        break;
      case "feature":
        setSelectedFeatures((prev) =>
          prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev, value],
        );
        break;
      case "platform":
        setSelectedPlatforms((prev) =>
          prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev, value],
        );
        break;
    }
  };

  const clearFilters = () => {
    setSearchKeyword("");
    setSelectedEvents([]);
    setSelectedPriceRanges([]);
    setSelectedGenres([]);
    setSelectedFeatures([]);
    setSelectedPlatforms([]);
    setSortBy("On Sale");
  };

  const getActiveFilterCount = () => {
    return (
      selectedEvents.length +
      selectedPriceRanges.length +
      selectedGenres.length +
      selectedFeatures.length +
      selectedPlatforms.length +
      (searchKeyword ? 1 : 0)
    );
  };

  const subtotal = filteredWishlist.reduce(
    (sum, item) => sum + getGamePrice(item.gameData),
    0,
  );
  const totalGames = filteredWishlist.length;
  const activeFilterCount = getActiveFilterCount();

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="px-4 md:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 transition-colors cursor-pointer hover:bg-gray-800 rounded-lg">
              <span className="text-sm font-medium">Epic Rewards</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm font-semibold">
                $0.00
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 transition-colors cursor-pointer hover:bg-gray-800 rounded-lg">
              <span className="text-sm font-medium">Account Balance</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm font-semibold">
                $0.00
              </span>
            </div>
          </div>
        </div>

        {/* Subscription Banner */}
        <div className="mb-6">
          <div className="flex items-center justify-between bg-[#1a1a1a] border-l-4 border-blue-500 px-6 py-4 rounded">
            <div className="flex items-center gap-3">
              <span className="text-blue-400">📧</span>
              <span className="text-sm">
                You are subscribed to wishlist email notifications.{" "}
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                >
                  Manage Preferences
                </a>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`px-3 py-1 rounded-md text-sm transition ${
                  isSubscribed
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        {/* Sort and Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
            >
              <Filter size={16} />
              Filters
              <ChevronDown
                size={14}
                className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          <div className="text-sm text-gray-400">
            {totalGames} {totalGames === 1 ? "game" : "games"} in wishlist
          </div>
        </div>

        {/* Main Content: Filters + Games Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}

          {/* Games List */}
          <div className="flex-1">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
                <p className="text-red-400 text-sm">{error}</p>
                <button
                  onClick={fetchWishlist}
                  className="mt-2 text-red-400 text-sm underline"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Active Filters Tags */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchKeyword && (
                  <Badge
                    variant="secondary"
                    className="bg-gray-800 text-gray-300 gap-1"
                  >
                    Search: {searchKeyword}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={() => setSearchKeyword("")}
                    />
                  </Badge>
                )}
                {selectedGenres.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="bg-gray-800 text-gray-300 gap-1"
                  >
                    {genre}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={() => toggleFilter("genre", genre)}
                    />
                  </Badge>
                ))}
                {selectedPlatforms.map((platform) => (
                  <Badge
                    key={platform}
                    variant="secondary"
                    className="bg-gray-800 text-gray-300 gap-1"
                  >
                    {platform}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={() => toggleFilter("platform", platform)}
                    />
                  </Badge>
                ))}
                {selectedPriceRanges.map((range) => (
                  <Badge
                    key={range}
                    variant="secondary"
                    className="bg-gray-800 text-gray-300 gap-1"
                  >
                    {range}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={() => toggleFilter("price", range)}
                    />
                  </Badge>
                ))}
                {selectedFeatures.map((feature) => (
                  <Badge
                    key={feature}
                    variant="secondary"
                    className="bg-gray-800 text-gray-300 gap-1"
                  >
                    {feature}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={() => toggleFilter("feature", feature)}
                    />
                  </Badge>
                ))}
              </div>
            )}

            {filteredWishlist.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-gray-600" />
                </div>
                <p className="text-gray-400 text-lg">Your wishlist is empty</p>
                <p className="text-gray-500 text-sm mt-2">
                  {wishlist.length > 0
                    ? "No games match your filters"
                    : "Save your favorite games here!"}
                </p>
                <button
                  onClick={() =>
                    wishlist.length > 0 ? clearFilters() : router.push("/")
                  }
                  className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
                >
                  {wishlist.length > 0 ? "Clear Filters" : "Start Browsing"}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredWishlist.map((item) => (
                  <Card
                    key={item._id}
                    className="bg-[#202024] border-[#2a2a2f] text-white hover:border-gray-700 transition"
                  >
                    <CardContent className="p-6 flex md:flex-row flex-col gap-5">
                      {/* Game Image */}
                      <div
                        className="relative cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/game/${item.gameData.slug || item.gameId}`,
                          )
                        }
                      >
                        <Image
                          src={getGameImage(item.gameData)}
                          alt={item.gameData.title || "Game"}
                          width={120}
                          height={160}
                          className="rounded-md w-full h-48 md:w-32 md:h-40 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/400x600/1e1e22/ffffff?text=No+Image";
                          }}
                        />
                        {item.gameData.discount &&
                          item.gameData.discount > 0 && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                              -{item.gameData.discount}%
                            </div>
                          )}
                      </div>

                      {/* Game Info */}
                      <div className="flex-1 space-y-2">
                        <span className="inline-block bg-[#2a2a2f] px-2 py-0.5 text-xs rounded">
                          Base Game
                        </span>
                        <h3
                          className="text-lg font-semibold cursor-pointer hover:text-blue-400 transition"
                          onClick={() =>
                            router.push(
                              `/game/${item.gameData.slug || item.gameId}`,
                            )
                          }
                        >
                          {item.gameData.title}
                        </h3>
                        <Card className="w-full text-white flex p-0 flex-row max-w-sm bg-transparent border border-text-clr/60">
                          <div className="w-full flex p-3">
                            {" "}
                            <div className="border-2 border-black w-[60px] h-[60px]">
                              <div className="w-[49px] border-4 border-white font-sans">
                                <div className="flex w-[45px] text-[10px] justify-between items-center border bg-#292929 text-white px-2 py-1  font-semibold tracking-widest">
                                  <span>I</span>
                                  <span>A</span>
                                  <span>R</span>
                                  <span>C</span>
                                </div>

                                <div className="flex w-[45px]  items-center justify-center bg-gray-100 ">
                                  <span className="text-md  font-bold text-gray-900">
                                    16+
                                  </span>
                                </div>
                              </div>
                            </div>
                            <CardHeader className="w-full p-2">
                              <CardTitle className="">7+</CardTitle>
                              <CardDescription>
                                Fear, Mild Violence{" "}
                              </CardDescription>
                            </CardHeader>
                          </div>
                        </Card>
                        <div className="flex items-center gap-2 text-sm text-yellow-400">
                          <Star className="w-4 h-4 fill-yellow-400" />
                          <span>Earn 5% back in Epic Rewards</span>
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                          <button
                            onClick={() => removeFromWishlist(item.gameId)}
                            disabled={removingId === item.gameId}
                            className="text-sm text-gray-400 hover:text-red-500 transition"
                          >
                            {removingId === item.gameId
                              ? "Removing..."
                              : "Remove"}
                          </button>
                          {/* <Button
                            onClick={() =>
                              router.push(
                                `/checkout/${item.gameData._id || item.gameId}`,
                              )
                            }
                            variant="outline"
                            className="text-white hover:text-white bg-transparent border-gray-700 hover:bg-gray-800"
                          >
                            <ShoppingBag size={14} className="mr-2" />
                            Add To Cart
                          </Button> */}
                          <Button
                            onClick={() => {
                              const game = item.gameData;
                              const price =
                                game.currentPrice || game.price || 0;
                              const image = getGameImage(game);
                              router.push(
                                `/home/cart?gameId=${item.gameId}&title=${encodeURIComponent(game.title)}&price=${price}&image=${encodeURIComponent(image)}`,
                              );
                            }}
                            variant="outline"
                            className="text-white hover:text-white bg-transparent border-gray-700 hover:bg-gray-800"
                          >
                            <ShoppingBag size={14} className="mr-2" />
                            Add To Cart
                          </Button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        {item.gameData.discount &&
                        item.gameData.discount > 0 ? (
                          <div>
                            <span className="text-gray-400 line-through text-sm">
                              ${getOriginalPrice(item.gameData).toFixed(2)}
                            </span>
                            <div className="text-xl font-bold text-blue-400">
                              ${getGamePrice(item.gameData).toFixed(2)}
                            </div>
                          </div>
                        ) : (
                          <div className="text-xl font-bold">
                            ${getGamePrice(item.gameData).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <div
            className={`${showFilters ? "block" : "hidden"} lg:block w-64 flex-shrink-0`}
          >
            <Filters
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              selectedEvents={selectedEvents}
              selectedPriceRanges={selectedPriceRanges}
              selectedGenres={selectedGenres}
              selectedFeatures={selectedFeatures}
              selectedPlatforms={selectedPlatforms}
              toggleFilter={toggleFilter}
              clearFilters={clearFilters}
              activeFilterCount={activeFilterCount}
              filterConfig={filterConfig}
            />
          </div>
          {/* Summary Card */}
        </div>
      </div>
    </div>
  );
}

// Filter Section Component
type FilterSectionProps = {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggle: (value: string) => void;
};

const FilterSection = ({
  title,
  items,
  selectedItems,
  onToggle,
}: FilterSectionProps) => {
  return (
    <AccordionItem value={title} className="">
      <AccordionTrigger className="text-sm font-medium text-white hover:no-underline ">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-2 pt-2">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`${title}-${item}`}
                checked={selectedItems.includes(item)}
                onChange={() => onToggle(item)}
                className="rounded bg-[#1b1b1f] border-[#2a2a2f] text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              <label
                htmlFor={`${title}-${item}`}
                className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors flex-1"
              >
                {item}
              </label>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

// Filters Component
interface FiltersProps {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  selectedEvents: string[];
  selectedPriceRanges: string[];
  selectedGenres: string[];
  selectedFeatures: string[];
  selectedPlatforms: string[];
  toggleFilter: (type: string, value: string) => void;
  clearFilters: () => void;
  activeFilterCount: number;
  filterConfig: {
    events: string[];
    priceRanges: string[];
    genres: string[];
    features: string[];
    platforms: string[];
  };
}

function Filters({
  searchKeyword,
  setSearchKeyword,
  selectedEvents,
  selectedPriceRanges,
  selectedGenres,
  selectedFeatures,
  selectedPlatforms,
  toggleFilter,
  clearFilters,
  activeFilterCount,
  filterConfig,
}: FiltersProps) {
  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </h2>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-blue-400 text-sm hover:text-blue-300"
          >
            Reset all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        <Input
          placeholder="Keywords"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="pl-9 bg-[#1b1b1f] border-[#2a2a2f] text-white placeholder:text-gray-500 focus:border-blue-500"
        />
        {searchKeyword && (
          <button
            onClick={() => setSearchKeyword("")}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filters Accordion */}
      <Accordion type="multiple" defaultValue={[]} className="space-y-1">
        <FilterSection
          title="Events"
          items={filterConfig.events}
          selectedItems={selectedEvents}
          onToggle={(value) => toggleFilter("events", value)}
        />

        <FilterSection
          title="Price"
          items={filterConfig.priceRanges}
          selectedItems={selectedPriceRanges}
          onToggle={(value) => toggleFilter("price", value)}
        />

        <FilterSection
          title="Genre"
          items={filterConfig.genres}
          selectedItems={selectedGenres}
          onToggle={(value) => toggleFilter("genre", value)}
        />

        <FilterSection
          title="Features"
          items={filterConfig.features}
          selectedItems={selectedFeatures}
          onToggle={(value) => toggleFilter("feature", value)}
        />

        <FilterSection
          title="Platform"
          items={filterConfig.platforms}
          selectedItems={selectedPlatforms}
          onToggle={(value) => toggleFilter("platform", value)}
        />
      </Accordion>
    </div>
  );
}
