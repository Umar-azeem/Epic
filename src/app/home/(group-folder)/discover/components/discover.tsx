"use client";
import GameDiscoverySection from "../../../../../components/Game-Discovery-Section";
import GameDiscoverySectionCustom from "./GameDiscoverySectionCustom";
import { useEffect, useState } from "react";
import HeroSection from "./heroSection";
import { useGameStore } from "@/src/json/apiStore";
import FreeGame from "./freeGame";
import Fortnite from "./Fortnite";
import GamesList from "./gameList";
import { Spinner } from "@/src/components/ui/spinner";
import GamesListCustom from "./GamesListCustom";
// types/game.ts
export interface Game {
  _id: string;
  title: string;
  price: number;
  originalPrice?: number;
  currentPrice?: number;
  discount?: number;
  image: string;
  label?: string;
  category?: string;
  tag?: string;
  thumbnail?: string;
}
const Discover = () => {
  const games = useGameStore((s) => s.games);
  const fetchGames = useGameStore((s) => s.fetchGames);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const [activeIndex, setActiveIndex] = useState(0);
  const VISIBLE_COUNT = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === VISIBLE_COUNT - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!games || games.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app-secondary">
        <Spinner className="size-8 text-[#6705FC]" />
      </div>
    );
  }
  // const safeIndex = games && games.length > 0 ? Math.min(activeIndex, games.length - 1) : 0;

  const number = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <div className="min-h-screen bg-app-secondary text-white">
      <main className="max-w-7xl mx-auto px-2 py-4 md:py-3">
        <HeroSection games={games} label="Hero" />
        <div className="flex flex-col space-y-20">
          <div className="p-0">
            <GameDiscoverySection
              label="Discover Something New"
              data={games ?? []}
            />
          </div>
          <div className="p-0 space-y-5">
            <Fortnite
              label="Fortnite"
              data={games ?? []}
              sectionType="A"
            />
          </div>
          <div className="p-0">
            <GameDiscoverySection
              label="Season Sale Spotlight"
              data={games ?? []}
            />
          </div>
          <div className="p-0 space-y-5">
            <FreeGame label="Deals of the Week" data={games ?? []} />
          </div>
          <div className="p-4 bg-[#202024] rounded-md">
            <FreeGame
              label="FreeGames"
              data={games ?? []}
              sectionKey="freeGame"
            />
          </div>
          <div className="p-0">
            <GameDiscoverySection label="Top New Releases" data={games ?? []} />
          </div>
          <div>
            <GamesList
              data={games ?? []}
              sectionkey={[
                "Top Sellers",
                "Top Free to Play",
                "Top Upcoming Wishlisted",
              ]}
            />
          </div>
          <div className="p-0">
            <GameDiscoverySection label="Early Access" data={games ?? []} />
          </div>
          <div className="p-0">
            {number.map((num, index) => {
              const labelIndex = Math.floor(index / 2);
              const isEven = num % 2 === 0;
              return (
                <div key={index}>
                  {isEven ? (
                    <GameDiscoverySectionCustom
                      data={games ?? []}
                      labelIndex={labelIndex}
                    />
                  ) : (
                    <div className="p-0">
                      <GamesListCustom
                        data={games ?? []}
                        sectionkey={[
                          "Top Sellers",
                          "Top Free to Play",
                          "Top Upcoming Wishlisted",
                        ]}
                        // labelIndex={labelIndex}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Discover;
