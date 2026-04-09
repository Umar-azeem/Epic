"use client";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { disconnect } from "process";
import React from "react";
const cards = [
  {
    title: "This Week in Fortnite",
    description:
      "Check out the latest updates in Fortnite, from classic Battle Royale to Blitz and Delulu. There's always something new in Fortnite!",
    image: "/img/gloomy-eyes.png",
    buttonText: "Discover Now",
    hasExternalIcon: false,
    status: "free",
    Deal: "Deal of the week",
  },
  {
    title: "Fortnite",
    description:
      "Heroic fun with Adventure Time's Ice King, Fionna, Cake, and the Earl of Lemongrab awaits.",
    image: "img/gloomy-eyes.png",
    buttonText: "See In Shop",
    hasExternalIcon: true,
    bgColor: "from-cyan-400 to-blue-500",
    status: "free",
    Deal: "Deal of the week",
  },
  {
    title: "Fortnite",
    description:
      "Take it 'round the world with the Bruno Mars World Tour Bundle!",
    image: "img/gloomy-eyes.png",
    buttonText: "See In Shop",
    hasExternalIcon: true,
    bgColor: "from-green-500 to-emerald-600",
    status: "free",
    Deal: "Deal of the week",
    discount:"15",
    discountPrize:"200",
    link:"Browse"
  },
];
function FortniteSetion() {
  return (
    <>
      <div className="h-full  text-white ">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl "
              >
                {/* Card Background */}
                <div className="relative  overflow-hidden">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden rounded-lg">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        card.bgColor || "from-text-clr to-text-clr-light"
                      } opacity-30`}
                    ></div>

                    <Image
                      src={card.image}
                      alt={card.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="py-4 space-y-4">
                    <h3 className="text-2xl font-bold">{card.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {card.description}
                    </p>

                    <button className="flex items-center gap-2 bg-btn-secondary hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                      {card.buttonText}
                      {card.hasExternalIcon && <ExternalLink size={16} />}
                    </button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FortniteSetion;
