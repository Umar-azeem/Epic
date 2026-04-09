"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { ExternalLink, Minus } from "lucide-react";
import { Gif } from "@/src/components/icons/indexs";

export default function FreeGame({ label, data, sectionKey, bgColor }: any) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // ✅ Fix: Proper filtering logic for multiple labels
  const gamesArray = Array.isArray(data?.games)
    ? data.games
        .filter((item: any) => {
          // FreeGames filter
          if (item.label === label && label === "FreeGames") {
            return item.sectionType === "B" && item.priceType === "free";
          }

          // Deals of the Week filter
          if (item.label === label && label === "Deals of the Week") {
            return item.sectionType === "C" && item.priceType === "freemium";
          }

          return false;
        })
        .slice(0, 3)
    : [];


  if (!gamesArray.length) {
    return (
      <div className="text-white px-4 py-4" style={{ background: bgColor }}>
        <p className="text-gray-400">No games found for {label}</p>
      </div>
    );
  }

  return (
    <div className="text-white" style={{ background: bgColor }}>
      {/* Header */}
      <div className="flex justify-between rounded-4xl items-center mb-6 px-4">
        <div className="flex items-center gap-2">
          {sectionKey === "freeGames" && (
            <div className="w-5 h-5 bg-accent-blue rounded flex items-center justify-center text-xs">
              🎮
            </div>
          )}
         {label === "FreeGames" && <div className="flex gap-4 items-center m-3">
            <Gif />
            <h2 className="text-xl font-semibold">{label === "FreeGames" && "Free Games"}</h2>
          </div>}
        </div>
        {gamesArray[0]?.viewMore && (
          <Button
            variant="outline"
            className="bg-transparent text-sm px-4 py-2"
          >
            View More
          </Button>
        )}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4">
        {gamesArray.map((item: any) => (
          <div
            key={item._id}
            className={`bg-card-bg rounded-lg overflow-hidden cursor-pointer transition-transform duration-200 ${
              hoveredItem === item._id ? "-translate-y-1" : ""
            }`}
            onMouseEnter={() => setHoveredItem(item._id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="relative h-48 w-full rounded-sm overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 rounded-t-lg flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}

              {item.status && item.status === "active" && (
                <div
                  className={`absolute rounded-b-md text-center font-semibold bottom-0 w-full px-2 py-1 text-xs ${
                    item.status === "COMING SOON"
                      ? "bg-black text-white"
                      : item.status === "Free"
                        ? "bg-gradient-to-r from-[#230df6] to-[#6705FC] text-white"
                        : "bg-btn-primary text-black"
                  }`}
                >
                  {item.priceType === "free" ? "Free" : item.status}
                </div>
              )}

              {/* Sale Badge */}
              {item.saleOfTheWeek && label === "Deals of the Week" && (
                <div
                  className={`absolute rounded-b-md text-center font-semibold bottom-0 w-full px-2 py-1 text-xs ${
                    item.saleOfTheWeek?.toLowerCase()
                      ? "bg-gradient-to-r from-[#230df6] to-[#6705FC] text-white"
                      : "bg-app-primary text-black"
                  }`}
                >
                  {item.saleOfTheWeek}
                </div>
              )}
              
            </div>

            {/* Content Section */}
            <div className="p-3">
              <h3 className="text-sm md:text-md font-bold mb-1.5">
                {item.title}
              </h3>

              

              {/* Dates */}
              {(item.availableDate || item.releaseDate)  && (
                <div className="flex gap-2 mt-1">
                  {item.availableDate && (
                    <h5 className="text-text-clr-light text-xs font-medium">
                      {item.availableDate}
                    </h5>
                  )}
                  {item.availableDate && item.releaseDate && (
                    <p className="text-text-clr-light flex items-center justify-center">
                      <Minus className="w-4 h-4" />
                    </p>
                  )}
                  {item.releaseDate && (
                    <h5 className="text-text-clr-light text-xs font-medium">
                      {item.releaseDate}
                    </h5>
                  )}
                </div>
              )}

             

              
              {/* Discount Price */}
              {item.button.enabled !== true && item.discount > 0 && label !== "FreeGames" && (
                <div className="flex items-center gap-2 mt-4">
                  <span className="bg-btn-primary rounded-lg px-1.5 py-0.5 text-black text-xs">
                    -{item.discount}%
                  </span>
                  {item.originalPrice > 0 && (
                    <span className="text-gray-400 line-through text-xs">
                      ${item.originalPrice}
                    </span>
                  )}
                  {item.currentPrice > 0 && (
                    <span className="text-white text-sm font-semibold">
                      ${item.currentPrice}
                    </span>
                  )}
                </div>
              )}
              {/* Custom Button */}
              {item.button?.enabled && (
                <Button
                  className={`mt-2 w-full ${
                    item.button.style === "secondary"
                      ? "bg-btn-secondary text-white"
                      : ""
                  }`}
                >
                  <a
                    href={item.button.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {item.button.text}
                    {item.button.link && <ExternalLink size={16} />}
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
