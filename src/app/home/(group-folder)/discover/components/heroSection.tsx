"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Game {
  _id: string;
  title: string;
  label:string;
  image: string;
  mainImage?: string;
  coverImage?: string | null;
  featured?: boolean;
}

interface HeroSectionProps {
  games: Game[];
  label?: string; // optional, default "hero"
}

export default function HeroSection({ games, label = "hero" }: HeroSectionProps) {
   const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const VISIBLE_COUNT = 6;
   const allGames = Array.isArray(games) ? games : (games as any)?.games ?? [];
  const gameList = allGames.filter(
  (game: Game) => (game.label ?? "").trim().toLowerCase() === label.toLowerCase()
);  

  const maxIndex = Math.min(VISIBLE_COUNT, gameList.length);

  useEffect(() => {
  if (gameList.length === 0) return; 
  const interval = setInterval(() => {
    setActiveIndex((prev) => (prev === maxIndex - 1 ? 0 : prev + 1));
  }, 5000);
  return () => clearInterval(interval);
}, [gameList.length, maxIndex]);

  const getMainImage = (game: Game) =>
    game.mainImage || game.coverImage || game.image || "/placeholder.png";

  const getThumbnail = (game: Game) =>
    game.coverImage || game.mainImage || game.image || "/placeholder.png";

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) setActiveIndex((prev) => (prev + 1) % maxIndex);
    if (distance < -50) setActiveIndex((prev) => (prev - 1 + maxIndex) % maxIndex);
    setTouchStart(0);
    setTouchEnd(0);
  };

  if (gameList.length === 0) return null;

  const visibleGames = gameList.slice(0, VISIBLE_COUNT);
  
 if (!gameList.length) {
    return (
      <div className="text-white px-4 py-4" >
        <p className="text-gray-400">No games found for {label}</p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <div className="relative h-[450px] rounded-2xl overflow-hidden bg-black">
            <Image
              src={getMainImage(visibleGames[activeIndex])}
              fill
              className="object-cover"
              alt={visibleGames[activeIndex]?.title ?? "game cover"}
              priority
            />
            <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
              <h1 className="text-5xl font-bold text-white">
                {visibleGames[activeIndex].title}
              </h1>
            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-3">
          {visibleGames.map((game, index) => (
            <button
              key={game._id} 
              onClick={() => setActiveIndex(index)}
              className={`hover:bg-[#343437] flex items-center gap-3 p-2 rounded-md w-full ${
                index === activeIndex ? "bg-[#343437] animate-sweep" : ""
              }`}
            >
              <Image
                src={getThumbnail(game)} 
                className="w-10 h-14 object-cover rounded"
                alt={game.title}
                width={40}
                height={56}
                priority
              />
              <span className="text-sm">{game.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div
        className="md:hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {visibleGames.map((game) => (
              <div key={game._id} className="w-full flex-shrink-0">
                {" "}
                {/* ✅ _id */}
                <Image
                  src={getMainImage(game)} // ✅ fallback chain
                  className="h-[300px] w-full object-cover"
                  alt={game.title}
                    width={400}
                    height={300}
                    priority
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 py-3">
          {visibleGames.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full ${
                i === activeIndex ? "w-6 bg-white" : "w-2 bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
