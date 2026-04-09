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
    <div className="min-h-screen text-white">
         {/* Hero Section */}
         <div className="bg-[#1a1a1d] ">
           <div className="w-full mx-auto">
             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
               {/* Game Thumbnail */}
               <div className="relative w-full sm:w-32 h-48 sm:h-32 md:w-60 md:h-40 lg:w-96 lg:h-60 flex-shrink-0  overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30">
                 <Image
                 width={100}
                 height={80}
                   src={"/img/gloomy-eyes.png"}
                   alt="Gloomy Eyes"
                   className="w-full h-full object-cover"
                 />
               </div>
   
               {/* Stats Section */}
               <div className="flex-1 w-full grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                 <div>
                   <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2 uppercase tracking-wide">
                     Available Achievements
                   </p>
                   <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                     {totalAchievements}
                   </p>
                   <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                     Achievements
                   </p>
                 </div>
                 <div>
                   <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2 uppercase tracking-wide">
                     Available XP
                   </p>
                   <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                     {totalXP}
                   </p>
                   <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                     XP
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </div>
   
         {/* Achievements List */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">
           {/* Header */}
           <div className="flex flex-col gap-4 mb-6">
             <div className="flex items-center gap-2 sm:gap-3">
               <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white">
                 Achievements ({totalAchievements})
               </h2>
               <button className="text-gray-500 hover:text-gray-400 transition-colors">
                 <Info className="w-4 h-4 sm:w-5 sm:h-5" />
               </button>
             </div>
                <div className="flex items-center gap-3">
               <span className="text-gray-500 text-xs sm:text-sm">Sort</span>
               <select
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
                 className="px-3 py-2 text-xs sm:text-sm border border-[#2a2a2d] bg-[#1a1a1d] text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
               >
                 <option value="alphabetical">Alphabetical</option>
                 <option value="xp-high">XP: High to Low</option>
                 <option value="xp-low">XP: Low to High</option>
                 <option value="unlock-rate">Unlock Rate</option>
               </select>
             </div>
           </div>
   
           <div className="space-y-0">
             {achievements.map((achievement, index) => (
               <div key={achievement.id}>
                 <div className="py-4 sm:py-5 md:py-6 cursor-pointer hover:bg-[#1a1a1d]/30 transition-colors px-2 sm:px-3 -mx-2 sm:-mx-3 rounded">
                   <div className="flex items-start gap-3 sm:gap-4">
                     <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex-shrink-0 bg-[#1a1a1d] rounded flex items-center justify-center">
                       <svg
                         className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-600"
                         fill="currentColor"
                         viewBox="0 0 24 24"
                       >
                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                       </svg>
                     </div>
   
                     {/* Achievement Details */}
                     <div className="flex-1 min-w-0">
                       <h3 className="text-white font-medium text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                         {achievement.name}
                       </h3>
                       <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                         <span className="text-gray-400 font-medium">
                           {achievement.xp} XP
                         </span>
                         <span className="text-gray-600 hidden sm:inline">•</span>
                         <span className="text-gray-400">
                           {achievement.unlockPercentage}% of players unlock
                         </span>
                       </div>
                     </div>
                   </div>
                 </div>
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
