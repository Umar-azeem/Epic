// GameDiscoverySection.tsx (Updated)
"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Game } from "../app/admin/components/types";
import Image from "next/image";
import WishlistButton from "@/src/components/WishlistButton";
import { useState } from "react";

interface GameDiscoverySectionProps {
  label?: string;
  data: any;
  bgColor?: string;
  sectionKeys?: string;
  showDiscount?: boolean;
}

function GameDiscoverySection({
  label,
  data,
  bgColor = "",
}: GameDiscoverySectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  const nextTenDays = new Date();
  nextTenDays.setDate(nextTenDays.getDate() + 10);

  const gamesArray = Array.isArray(data?.games)
    ? data.games.filter((item: any) => {
        const normalizedLabel = label?.toLowerCase().trim();
        const itemLabel = item.label?.toLowerCase().trim();
        const matchesSection = itemLabel === normalizedLabel;

        if (normalizedLabel === "discover something new") {
          const createdAt = new Date(item.createdAt);
          return matchesSection && createdAt >= twoMonthsAgo;
        }

        if (normalizedLabel === "season sale spotlight") {
          return matchesSection && item.discount > 0;
        }

        if (normalizedLabel === "top new releases") {
          const createdAt = new Date(item.createdAt);
          return matchesSection && createdAt >= tenDaysAgo;
        }

        if (normalizedLabel === "Early Access") {
          const createdAt = new Date(item.createdAt);
          return matchesSection && createdAt >= nextTenDays;
        }

        return matchesSection;
      })
    : [];

  const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - 1, 0));
  };
  const scrollRight = () => {
    setScrollPosition((prev) => Math.min(prev + 1, gamesArray.length - 3));
  };

  return (
    <div className="max-h-screen text-white" style={{ background: bgColor }}>
      <div className="max-w-7xl mx-auto">
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
              disabled={scrollPosition >= gamesArray.length - 3}
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-40 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500"
            style={{
              transform: `translateX(-${scrollPosition * 33.33}%)`,
            }}
          >
            {gamesArray.map((game: any) => (
              <div
                key={game._id}
                className="max-w-48 flex-shrink-0 group cursor-pointer relative"
              >
                <div className="relative rounded-lg overflow-hidden mb-3 aspect-[3/4] group-hover:scale-105 transition">
                  <Image
                    src={game.image}
                    alt={game.title}
                    width={100}
                    height={150}
                    className="object-cover h-full w-full"
                    priority
                  />
                  {/* ✅ Wishlist Button with Login Check */}
                  <div className="absolute top-2 right-2 z-10">
                    <WishlistButton gameId={game._id} gameData={game} />
                  </div>
                </div>
                <div className="space-y-1 overflow-hidden">
                  {game.label === "Discover Something New" &&
                    game.category !== "" && (
                      <p className="text-xs text-gray-400 w-18 h-4 overflow-hidden">
                        {game.category}
                      </p>
                    )}

                  <h3 className="text-md font-semibold">{game.title}</h3>
                </div>
                {game.label?.toLowerCase().trim() === "top new releases" &&
                  game.description?.trim() !== "" && (
                    <p className="text-xs w-full text-gray-400">
                      {game.description}
                    </p>
                  )}

                {game.label?.toLowerCase().trim() === "season sale spotlight" &&
                  game.tag?.trim() !== "" && (
                    <div className="space-y-1 bg-[#202024] p-0.5 rounded w-24 flex justify-center">
                      <p className="text-xs text-gray-400">{game.tag}</p>
                    </div>
                  )}

                {game.label?.toLowerCase().trim() !==
                "discover something new" ? (
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
                  <p className="text-md font-bold">${game.price}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDiscoverySection;