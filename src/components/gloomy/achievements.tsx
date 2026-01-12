import React from "react";
import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export default function Achievements() {
  const [sortBy, setSortBy] = React.useState("alphabetical");

  const achievements = [
    {
      id: 1,
      name: "Hidden Achievement",
      xp: 30,
      unlockPercentage: 53,
      isHidden: true,
    },
    {
      id: 2,
      name: "Hidden Achievement",
      xp: 30,
      unlockPercentage: 8,
      isHidden: true,
    },
    {
      id: 3,
      name: "Hidden Achievement",
      xp: 30,
      unlockPercentage: 38,
      isHidden: true,
    },
    {
      id: 4,
      name: "Hidden Achievement",
      xp: 30,
      unlockPercentage: 51,
      isHidden: true,
    },
    {
      id: 5,
      name: "Hidden Achievement",
      xp: 30,
      unlockPercentage: 9,
      isHidden: true,
    },
    {
      id: 6,
      name: "Hidden Achievement",
      xp: 30,
      unlockPercentage: 51,
      isHidden: true,
    },
  ];

  const totalAchievements = 29;
  const totalXP = 1000;

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="bg-[#1a1a1d] border-b border-[#2a2a2d]">
        <div className="w-full mx-auto">
          <div className="flex items-center gap-6 md:gap-8">
            {/* Game Thumbnail */}
            <div className="relative w-32 h-32 md:w-96 md:h-60 flex-shrink-0  overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30">
              <Image
                width={100}
                height={100}
                src={"/img/gloomy-eyes.png"}
                alt="Gloomy Eyes"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stats Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div>
                <p className="text-gray-500 text-xs md:text-sm mb-2 uppercase tracking-wide">
                  Available Achievements
                </p>
                <p className="text-white text-2xl md:text-3xl font-bold">
                  {totalAchievements} Achievements
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm mb-2 uppercase tracking-wide">
                  Available XP
                </p>
                <p className="text-white text-2xl md:text-3xl font-bold">
                  {totalXP} XP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl bg-app-secondary mx-auto py-10">
        <div className="flex flex-col gap-4 mb-6 ">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-xl font-semibold text-white">
              Achievements ({totalAchievements})
            </h2>
            <button className="text-gray-500 hover:text-gray-400 transition-colors">
              <Info className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm">Sort</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] border-[#2a2a2d] bg-transparent text-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1d] border-[#2a2a2d]">
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
                <SelectItem value="xp-high">XP: High to Low</SelectItem>
                <SelectItem value="xp-low">XP: Low to High</SelectItem>
                <SelectItem value="unlock-rate">Unlock Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-8">
          {achievements.map((achievement, index) => (
            <div key={achievement.id}>
              <Card className=" border-0 bg-transparent rounded-none transition-colors cursor-pointer ">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                   <div className="w-12 h-12 md:w-20 md:h-20 flex-shrink-0 bg-[#1a1a1d] rounded flex items-center justify-center">
                      <svg
                        className="w-6 h-6 md:w- md:h-7 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm md:text-base mb-1">
                        {achievement.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs md:text-sm">
                        <span className="text-gray-500 font-medium">
                          {achievement.xp} XP
                        </span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-500">
                          {achievement.unlockPercentage}% of players unlock
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {index < achievements.length - 1 && (
                <div className="border-b border-[#2a2a2d]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
