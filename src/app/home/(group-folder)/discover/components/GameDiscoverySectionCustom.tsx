import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// interface GameDiscoverySectionCustomProps {
//   data: any;
//   isEven?: boolean;
//   labelCount?: number;
// }

function GameDiscoverySectionCustom({ data, labelIndex }: any) {
  const gamesArray = Array.isArray(data?.games) ? data.games : [];

  const EXCLUDE_LABELS = [
    "discover something new",
    "season sale spotlight",
    "top new releases",
    "early access",
  ];

  // ✅ all unique labels
  const uniqueLabels = [
    ...new Set(
      gamesArray
        .map((g: any) => g.label)
        .filter(
          (label: string) =>
            label &&
            label.trim() !== "" &&
            !EXCLUDE_LABELS.includes(label.toLowerCase().trim())
        )
    ),
  ];

  // ✅ ❗ ONLY ONE LABEL (important change)
  const selectedLabel = uniqueLabels[labelIndex];

  // ❗ safety
  if (!selectedLabel) return null;

  return (
    <div className="text-white">
      <SingleLabelSection
        label={selectedLabel}
        games={gamesArray}
      />
    </div>
  );
}

// STEP 5: Create individual section component
interface SingleLabelSectionProps {
  label: string;
  games: any[];
}

function SingleLabelSection({ label, games }: SingleLabelSectionProps) {
const [scrollPosition, setScrollPosition] = useState(0);

  // STEP 6: Filter games by this label
const filteredGames = games.filter((game: any) => {
    const gameLabel = game.label?.toLowerCase().trim();
    const currentLabel = label?.toLowerCase().trim();
    return gameLabel === currentLabel;
  });

  // Don't render if no games
if (filteredGames.length === 0) return null;

const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - 1, 0));
  };

const scrollRight = () => {
    setScrollPosition((prev) => Math.min(prev + 1, filteredGames.length - 3));
  };

filteredGames.slice(0, 4).forEach((game) => {
    console.log("Game in section", label, game.title);
  });

  return (
    <div className="max-h-screen" style={{ background: "transparent" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">{label}</h2>
            <ChevronRight className="w-6 h-6" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              disabled={scrollPosition === 0}
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-40 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              disabled={scrollPosition >= filteredGames.length - 3}
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-40 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Games Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500"
            style={{
              transform: `translateX(-${scrollPosition * 33.33}%)`,
            }}
          >
            {filteredGames.map((game: any) => (
              <div
                key={game._id}
                className="max-w-48 flex-shrink-0 group cursor-pointer"
              >
                {/* Game Image */}
                <div className="relative rounded-lg overflow-hidden mb-3 aspect-[3/4] group-hover:scale-105 transition">
                  <Image
                    src={game.image}
                    alt={game.title}
                    width={100}
                    height={150}
                    className="object-cover h-full w-full"
                    priority
                  />
                </div>

                {/* Game Info */}
                <div className="space-y-1 overflow-hidden">
                  {/* Category */}
                  {game.category && game.category !== "" && (
                    <p className="text-xs text-gray-400">{game.category}</p>
                  )}

                  {/* Title */}
                  <h3 className="text-md font-semibold">{game.title}</h3>
                </div>

                {/* Description */}

                {/* Tag */}
                {game.tag && game.tag.trim() !== "" && (
                  <div className="space-y-1 bg-[#202024] p-0.5 rounded h-5  w-24 overflow-hidden flex justify-center mt-1">
                    <p className="text-xs text-gray-400 mx-1">{game.tag}</p>
                  </div>
                )}

                {/* Price */}
                {game.discount && game.discount > 0 ? (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-sky-500 text-black text-xs px-2 py-1 rounded-full">
                      -{game.discount}%
                    </span>
                    <span className="line-through text-gray-400 text-sm">
                      ${game.originalPrice}
                    </span>
                    <span className="font-semibold text-sm">
                      ${game.currentPrice}
                    </span>
                  </div>
                ) : (
                  <p className="text-md font-bold mt-1">${game.price}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDiscoverySectionCustom;
