"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Filters from "./filters";
import { useGameStore } from "@/src/json/apiStore";
import { useEffect } from "react";
import { Spinner } from "../ui/spinner";

const Browser = () => {
  const games : any = useGameStore((s) => s.games);
  const fetchGames = useGameStore((s) => s.fetchGames);

  useEffect(() => {
    fetchGames();
    
  }, [fetchGames]);

  console.log("cat", games?.games?.filter((g) => g.category !== ""));
const gameArray = games?.games?.filter((g) => g.category !== "")
   console.log("cat2", gameArray)

  const genres = [
    {
      id: 1,
      title: "Action Games",
      images: [
        "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=200&h=200&fit=crop",
      ],
    },
    {
      id: 2,
      title: "Action-Adventure Games",
      images: [
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=200&fit=crop",
      ],
    },
    {
      id: 3,
      title: "Adventure Games",
      images: [
        "https://images.unsplash.com/photo-1614465486936-7e163f964dbb?w=200&h=200&fit=crop",
      ],
    },
    {
      id: 4,
      title: "Casual Games",
      images: [
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop",
      ],
    },
  ];

  // if (!games || games.length === 0) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-app-secondary">
  //       <Spinner className="size-8 text-[#6705FC]" />
  //     </div>
  //   );
  // }
  return (
    <div className="bg-transparent text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Popular Genres</h2>
            <div className="flex gap-2">
              <button className="bg-compt-bg hover:bg-gray-700 p-2 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="bg-compt-bg hover:bg-gray-700 p-2 rounded-full transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gameArray?.map((game) => (
              <div
                key={game._id}
                className="bg-trans rounded-lg p-4 bg-compt-bg bg-blur hover:bg-text-clr transition-colors cursor-pointer"
              >
                <div className="grid grid-cols-1 gap-2 mb-4">
                  <div className="aspect-square rounded overflow-hidden">
                    <Image
                      height={100}
                      width={100}
                      src={game.image}
                      // src={"/img/gloomy-eyes.png"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-center font-semibold w-full h-6 overflow-hidden">{game.category}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          {/* <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <div
                key={game._id}
                className="bg- rounded-lg overflow-hidden  transition-all cursor-pointer group relative"
              >
                <div className="relative h-64">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {game.overlayItems && (
                    <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-90 rounded-lg p-3 space-y-2">
                      {game.overlayItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span>{item.icon} ii</span>
                          <span className="text-white">{item.text}</span>
                          {item.color && (
                            <div
                              className={`w-3 h-3 rounded-full ${item.color}`}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="py-3 space-y-2">
                  {game.subtitle && (
                    <p className="text-[11px] font-semibold text-gray-400">
                      {game.subtitle}
                    </p>
                  )}
                  <h3 className="text-lg font-bold">{game.title}</h3>
                  <h4 className="text-sm font-medium bg-btn-secondary py-0.5 w-24 text-center rounded-sm">
                    now on epic
                  </h4>
                  <p className="text-sm">$ 6.99</p>
                </div>
              </div>
            ))}
          </div> */}

          <div className="w-64 space-y-2">
            <Filters />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Browser;

//
