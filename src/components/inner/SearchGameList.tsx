"use client";
import { useState, useEffect, useRef } from "react";
import { SearchIcon, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchGame {
  _id: string;
  title: string;
  price: number;
  originalPrice?: number;
  currentPrice?: number;
  discount?: number;
  image: string;
  label?: string;
  category?: string;
}

interface SearchGameListProps {
  gamesData: any;
}

function SearchGameList({ gamesData }: SearchGameListProps) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<SearchGame[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get all games from all sections
  const getAllGames = (): SearchGame[] => {
    if (!gamesData?.games) return [];
    
    const gamesMap = new Map();
    gamesData.games.forEach((game: any) => {
      if (game && game._id && !gamesMap.has(game._id)) {
        gamesMap.set(game._id, game);
      }
    });
    
    return Array.from(gamesMap.values());
  };

  // Handle search
  useEffect(() => {
    if (searchText.trim() === "") {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    setIsSearching(true);
    setIsOpen(true);
    
    const timeout = setTimeout(() => {
      const allGames = getAllGames();
      const query = searchText.toLowerCase().trim();
      
      const filtered = allGames.filter((game) => {
        if (!game) return false;
        return (
          (game.title && game.title.toLowerCase().includes(query))
        );
      });
      
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [searchText, gamesData]);

  // Handle add to cart - navigates to cart page with game data
  const handleAddToCart = (game: SearchGame) => {
    const price = game.currentPrice || game.price || 0;
    const image = game.image;
    router.push(
      `/home/cart?gameId=${game._id}&title=${encodeURIComponent(
        game.title
      )}&price=${price}&image=${encodeURIComponent(image)}`
    );
    setIsOpen(false);
    setSearchText("");
  };

  // Clear search
  const clearSearch = () => {
    setSearchText("");
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div ref={searchRef} className="relative w-58">
     
      <div className="relative">
        <SearchIcon className="absolute z-50 text-gray-400 w-4 h-4 left-3 top-1/2 -translate-y-1/2" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search store"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => {
            if (searchText.trim() && searchResults.length > 0) {
              setIsOpen(true);
            }
          }}
          className="bg-btn-cmpt text-gray-100 pl-10 pr-4 py-2.5 rounded-full text-sm w-58"
        />
        {searchText && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-3 h-3 text-gray-400 hover:text-white" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown - Epic Games Style */}
      {isOpen && (searchText.trim() !== "") && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 mt-2 z-50 min-w-[400px]">
            <div className="bg-[#202020] rounded-lg overflow-hidden shadow-2xl">
              {/* TOP RESULTS Header */}
              <div className="px-4 py-3 border-b border-gray-700">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  TOP RESULTS
                </h3>
              </div>

              {/* Results List */}
              <div className="max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="p-8 text-center">
                    <div className="animate-pulse text-gray-400 text-sm">Searching...</div>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-400 text-sm">
                      No results found for "<span className="text-white">{searchText}</span>"
                    </p>
                  </div>
                ) : (
                  <>
                    {searchResults.slice(0, 5).map((game) => (
                      <div
                        key={game._id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#2a2a2a] cursor-pointer transition group"
                        onClick={() => handleAddToCart(game)}
                      >
                        {/* Game Image */}
                        <div className="w-10 h-10 rounded bg-gray-800 overflow-hidden flex-shrink-0">
                          {game.image ? (
                            <Image
                              src={game.image}
                              alt={game.title || "Game"}
                              width={40}
                              height={40}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-700" />
                          )}
                        </div>

                        {/* Game Info */}
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-400 mb-0.5">
                            Base Game
                          </div>
                          <h4 className="text-white text-sm font-medium truncate">
                            {game.title || "Unknown Game"}
                          </h4>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(game);
                          }}
                          className="px-3 py-1.5 rounded bg-white text-black text-xs font-medium hover:bg-gray-200 transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}

                    {/* View All Results Link */}
                    {searchResults.length > 5 && (
                      <div className="px-4 py-3 border-t border-gray-700 text-center">
                        <button 
                          onClick={() => {
                            console.log("View all:", searchResults);
                          }}
                          className="text-sm text-blue-400 hover:text-blue-300 transition"
                        >
                          View all {searchResults.length} results →
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchGameList;