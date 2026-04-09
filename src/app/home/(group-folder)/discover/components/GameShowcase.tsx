'use client';

import Image from 'next/image';
import { useState } from 'react';

interface FeaturedGame {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  priceText?: string;
  button?: {
    text: string;
    type: string;
  };
}

interface GameShowcaseProps {
  data: any;
  sectionKeys: string;
  bgColor?: string;
}

export default function GameShowcase({
  data,
  sectionKeys,
  bgColor = 'transparent'
}: GameShowcaseProps) {

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const section = data?.sections?.[sectionKeys];
const games: FeaturedGame[] = section?.items || [];


  if (!section) return null;

  return (
    <div className="text-white py-4" style={{ backgroundColor: bgColor }}>
      <div className="max-w-7xl mx-auto">

        <h2 className="text-2xl font-bold mb-6">
          {section.sectionTitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {games.map((game) => (
            <div key={game.id} className="space-y-4">
              <div
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 ${
                  hoveredCard === game.id ? 'scale-[1.02]' : ''
                }`}
                onMouseEnter={() => setHoveredCard(game.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-[280px] w-full">
                  <Image
                fill
                    src={game.image}
                    alt={game.title}
                    className=" object-cover"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {game.title}
                </h2>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {game.description}
                </p>
                {game.price === 0 ? (
                  <button className="bg-[#2a2a2a] px-6 py-2.5 rounded-md hover:bg-[#3a3a3a]">
                    {game.button?.text || 'Play For Free'}
                  </button>
                ) : (
                  <div className="text-xl font-semibold">
                    {game.priceText}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
