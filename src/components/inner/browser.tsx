"use client";
import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Filters from "./filters";
import { useGameStore } from "@/src/json/apiStore";
import { useEffect } from "react";
import { Spinner } from "../ui/spinner";
import GameGridBrowser from "./GameGridBrowser";

const Browser = () => {
  const games: any = useGameStore((s) => s.games);
  const fetchGames = useGameStore((s) => s.fetchGames);
  
  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const gameArray = games?.games?.filter((g) => g.category !== "");
 const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  const itemWidth = 500; // width of one item

  // 👉 Scroll Left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const newScroll =
        scrollContainerRef.current.scrollLeft - itemWidth;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });

      setScrollPosition(newScroll);
    }
  };

  // 👉 Scroll Right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const newScroll =
        scrollContainerRef.current.scrollLeft + itemWidth;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });

      setScrollPosition(newScroll);
    }
  };

  // 👉 Handle disable buttons properly
  const isLeftDisabled = scrollPosition <= 0;

  // const isRightDisabled =
  //   scrollContainerRef.current
  //     ? scrollPosition >=
  //       scrollContainerRef.current.scrollWidth -
  //         scrollContainerRef.current.clientWidth
  //     : false

  if (!games || games.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app-secondary">
        <Spinner className="size-8 text-[#6705FC]" />
      </div>
    );
  }
  return (
    <div className="bg-transparent text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="md:-4- md:mb-12">
          <div className="flex items-center justify-between  mb-6">
            <h2 className="text-3xl font-bold">Popular Genres</h2>
            <div className="flex gap-2">
              <button
                onClick={scrollLeft}
                disabled={scrollPosition === 0 }
                className="w-10 h-10 rounded-full overflow-x-auto scroll-smooth no-scrollbar bg-gray-800 hover:bg-gray-700 disabled:opacity-40 flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                disabled={scrollPosition === 0}
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-40 flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div
            className="flex gap-4 overflow-x-auto max-w-full pb-2 scrollbar-hide overflow-y-hidden"
            ref={scrollContainerRef}
          >
            {gameArray?.map((game) => (
              <div
                key={game._id}
                className="bg-trans max-w-lg rounded-lg p-4 bg-compt-bg bg-blur hover:bg-text-clr transition-colors cursor-pointer"
              >
                <div className="flex max-w-lg gap-2 mb-4">
                  <div className="aspect-square rounded overflow-hidden w-48">
                    <Image
                      height={300}
                      width={300}
                      src={game.image}
                      // src={"/img/gloomy-eyes.png"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-center font-semibold w-full h-6 overflow-hidden">
                  {game.category}
                </h3>
              </div>
            ))}
          </div>
        </div>









        <div className="flex flex-row gap-6">
          <GameGridBrowser gameArray={gameArray} />
         
        </div>
      </div>
    </div>
  );
};
export default Browser;

//

