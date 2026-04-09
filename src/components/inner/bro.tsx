"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useGameStore } from "@/src/json/apiStore";

interface GameItem {
  _id: string;
  title: string;
  label?: string;
  category?: string;
  image?: string;
  currentPrice?: number;
  priceType?: "paid" | "free" | "freemium";
}

const BrowseGames = () => {
  const gamesData = useGameStore((s) => s.games) as any;
  const fetchGames = useGameStore((s) => s.fetchGames);

  useEffect(() => {
    fetchGames();
  }, []);

  console.log("Raw gamesData:", gamesData);

  // Extract games array from response - handle all cases
  let gamesArray: GameItem[] = [];

  if (!gamesData) {
    gamesArray = [];
  } else if (Array.isArray(gamesData)) {
    // Direct array
    gamesArray = gamesData;
  } else if (gamesData.games) {
    // Object with games property
    if (Array.isArray(gamesData.games)) {
      gamesArray = gamesData.games;
    } else {
      // Single game object wrapped in array
      gamesArray = [gamesData.games];
    }
  }

  console.log("Processed gamesArray:", gamesArray);
  console.log("Total games:", gamesArray.length);

  // Get unique categories from label or category field
  const categories = Array.from(
    new Set(
      gamesArray
        .map((g) => g.label || g.category || "Uncategorized")
        .filter((label) => label && label.trim() !== "")
    )
  ).sort();

  console.log("Categories found:", categories);

  // Function to get games by category
  const getGamesByCategory = (categoryName: string): GameItem[] => {
    return gamesArray.filter(
      (game) =>
        game.label === categoryName || game.category === categoryName
    );
  };

  if (gamesArray.length === 0) {
    return (
      <div className="min-h-screen bg-app-secondary text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">No games found</p>
          <button
            onClick={() => fetchGames()}
            className="px-4 py-2 bg-cyan-500 text-black rounded font-semibold hover:bg-cyan-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-secondary text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold">Game Categories</h1>
          <p className="text-gray-400 text-sm mt-1">
            {gamesArray.length} games in {categories.length} categories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {categories.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-400 text-lg">No categories available</p>
          </div>
        ) : (
          categories.map((category) => {
            const categoryGames = getGamesByCategory(category);

            if (categoryGames.length === 0) return null;

            return (
              <div key={category} className="mb-12">
                {/* Category Title */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold capitalize text-white">
                    {category}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {categoryGames.length}{" "}
                    {categoryGames.length === 1 ? "game" : "games"}
                  </p>
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categoryGames.map((game) => (
                    <div
                      key={game._id}
                      className="group cursor-pointer transition-all duration-300 hover:scale-105"
                    >
                      {/* Card */}
                      <div className="bg-compt-bg rounded-lg p-4 hover:bg-text-clr transition-colors overflow-hidden border border-gray-700 hover:border-cyan-500/50">
                        {/* Image Container */}
                        <div className="aspect-square rounded overflow-hidden mb-4 bg-gray-700">
                          {game.image ? (
                            <Image
                              height={200}
                              width={200}
                              src={game.image}
                              alt={game.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gradient-to-br from-gray-700 to-gray-900">
                              <span className="text-xs">No Image</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          {/* Title */}
                          <h3 className="text-center font-semibold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors text-sm">
                            {game.title || "Untitled"}
                          </h3>

                          {/* Price & Type */}
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-700">
                            {/* Price */}
                            {game.priceType !== "free" && game.currentPrice ? (
                              <span className="text-sm font-bold text-white">
                                ${game.currentPrice}
                              </span>
                            ) : (
                              <span className="text-xs text-gray-400">
                                Free
                              </span>
                            )}

                            {/* Price Type Badge */}
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${
                                game.priceType === "free"
                                  ? "bg-green-500/20 text-green-400"
                                  : game.priceType === "freemium"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : "bg-gray-700 text-gray-300"
                              }`}
                            >
                              {game.priceType === "free"
                                ? "Free"
                                : game.priceType === "freemium"
                                  ? "Freemium"
                                  : "Paid"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BrowseGames;