'use client';
import Image from 'next/image';
import { useState } from 'react';

interface Game {
  id: number;
  title: string;
  image: string;
  category?: string;
  Available?: string;
  price?: number;
  status?: string;
}

interface TrendingProps {
  data: any; // your JSON
  sectionKey?: string; // default to "Trending"
  bgColor?: string;
}

export default function Trending({ data, sectionKey = 'Trending', bgColor = '' }: TrendingProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Access the section from JSON
  const section = data.sections[sectionKey];

  if (!section || !section.items) return null; // safety check

  return (
    <div className="bg-black text-white py-12 px-6" style={{ background: bgColor }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">{section.sectionTitle}</h2>
          <button className="border border-gray-600 hover:border-white px-6 py-2 rounded-md transition-colors">
            View More
          </button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {section.items.map((game: Game) => (
            <div
              key={game.id}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredId(game.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`relative rounded-lg overflow-hidden mb-3 transition-transform duration-300 ${
                  hoveredId === game.id ? 'scale-105' : ''
                }`}
              >
                <div className="relative aspect-[2/3]">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Game Info */}
              <div className="space-y-1">
                {game.category && <p className="text-xs text-gray-400">{game.category}</p>}
                <h3 className="text-sm font-semibold line-clamp-2 min-h-[40px]">{game.title}</h3>
                {game.Available && (
                  <p className="text-md text-text-clr-light font-medium">
                    Available {game.Available}
                  </p>
                )}
                {game.status && <p className="text-xs text-gray-400">{game.status}</p>}
                {game.price !== undefined && !isNaN(game.price) && (
                  <p className="text-sm font-semibold mt-2">${game.price.toFixed(2)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
