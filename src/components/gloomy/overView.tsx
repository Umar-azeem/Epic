"use clinet";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Info,
  ArrowRight,
  Bookmark,
} from "lucide-react";

import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Cart, Gift, Report, Share, Star, Wishlist } from "../icons";

function OverView() {
  const [activeImage, setActiveImage] = React.useState(0);

  // Add this line:
  const [showMore, setShowMore] = useState(false);
  const screenshots = [
    "/api/placeholder/1200/675",
    "/api/placeholder/1200/675",
    "/api/placeholder/1200/675",
    "/api/placeholder/1200/675",
  ];

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
      unlockPercentage: 51,
      isHidden: true,
    },
  ];

  const totalAchievements = 29;
  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setActiveImage(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length
    );
  };

  return (
    <>
      <main className="w-full max-w-screen mx-auto ">
        <div className="grid lg:grid-cols-3 border-b border-text-clr items-start gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden group">
              <Image
                src={screenshots[activeImage]}
                width={40}
                height={40}
                alt="Game screenshot"
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 flex gap-2">
                <Badge className="bg-black/80 text-white border-0 text-xs sm:text-sm">
                  Adventure
                </Badge>
                <Badge className="bg-black/80 text-white border-0 text-xs sm:text-sm">
                  Puzzle
                </Badge>
              </div>
            </div>

            <div className="hidden sm:grid grid-cols-4  gap-2">
              {screenshots.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-video rounded overflow-hidden border-2 transition-all ${
                    activeImage === idx
                      ? "border-blue-500"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    width={40}
                    height={40}
                    alt={`Screenshot ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
 <div className="md:hidden flex flex-col gap-6 justify-center items-center">
            
            <Card className="w-full text-white flex p-0 flex-row max-w-sm bg-app-secondary border border-text-clr/60">
              <div className="w-full flex p-3">
                {" "}
                <Image
                  src={"/img/7+.png"}
                  width={100}
                  height={100}
                  alt="Game screenshot"
                  className="w-14 h-14 object-cover "
                />
                <CardHeader className="w-full p-2">
                  <CardTitle className="">7+</CardTitle>
                  <CardDescription>Fear, Mild Violence </CardDescription>
                </CardHeader>
              </div>
            </Card>

            

            <div className="w-full max-w-sm bg-app-secondary rounded-lg p-0 md:p-4 space-y-3 text-sm  font-sans ">
             <div className="w-full">
              <h5 className="text-xs p-0.5 w-24 text-center rounded-xs sm:text-sm lg:text-md font-medium text-white bg-btn-secondary mb-2">
                Base Game
              </h5>
              <span className="font-semibold text-white text-sm">$14.99</span>
            </div>
              <div className="flex w-full gap-2">
                {/* Buy Now Button */}
                <Button
                  className=" flex-1 h-10 bg-sky-400 text-sm font-medium  hover:bg-sky-500 text-black rounded-md
        "
                >
                  Buy Now
                </Button>

                <Button
                  className=" h-10 p-0  w-14 bg-btn-secondary  text-white rounded-md flex items-center justify-center
        "
                >
                  <Cart className="w-6 h-6" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full hover:text-white bg-btn-secondary  border-0 hover:bg-[#4a4a4d] text-white text-xs  font-semibold py-5 rounded-md relative"
              >
                <Gift className="w-5 h-5" />
                Gift
                <Badge className="absolute right-3 bg-btn-primary/20 text-btn-primary text-xs px-2 py-0.2">
                  New!
                </Badge>
              </Button>

              <Button
                variant="outline"
                className="w-full hover:text-white bg-btn-secondary border-0 hover:bg-[#4a4a4d] text-white  py-5 rounded-md text-xs  font-semibold"
              >
                <Wishlist className="w-5 h-5 " />
                Wishlist
              </Button>
              <div className="flex items-center justify-between pt-2 ">
                <span className="text-text-clr-light text-sm">
                  Epic Rewards
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-semibold">
                    Earn 20% Back
                  </span>
                  <Star className="w-4 h-4 text-[#0078f2]" />
                </div>
              </div>

              <div className="border-t border-text-clr/70 " />

              <div className="flex text-clr  items-center justify-between ">
                <span className="text-text-clr-light text-sm">Refund Type</span>
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">Self-Refundable</span>
                  <Info className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="border-t border-text-clr/70 " />

              <div className="flex justify-between  gap-6 ">
                <div className="text-text-clr-light text-sm ">Developer</div>
                <div className="text-white text-xs ">
                  Atlas V, Be Revolution Gaming, 3Dar, Fishing Cactus, ARTE
                  France
                </div>
              </div>
              <div className="border-t border-text-clr/70 " />

              <div className="flex justify-between  gap-6 ">
                <div className="text-text-clr-light text-sm ">Publisher</div>
                <div className="text-white text-xs ">
                  ARTE France, Untold Tales
                </div>
              </div>
              <div className="border-t border-text-clr/70 " />

              <div className="flex items-center justify-between ">
                <span className="text-text-clr-light text-sm">
                  Release Date
                </span>
                <span className="text-white text-sm">09/12/25</span>
              </div>
              <div className="border-t border-text-clr/70 " />
              <div className="flex items-center justify-between ">
                <span className="text-text-clr-light text-sm">Platform</span>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                  </svg>
                </div>
              </div>
              <div className="border-t border-text-clr/70 " />

              <button className="w-full flex items-center justify-between py-3 text-white text-sm hover:text-gray-300 transition-colors">
                <span>See All Editions and Add-Ons</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="flex flex-row justify-between w-full ">
                {" "}
                <Button
                  variant="outline"
                  className=" w-[139px] bg-btn-secondary h-7 border-0 hover:text-white hover:bg-[#4a4a4d] text-white text-xs  font-semibold  rounded-md relative"
                >
                  <Share className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  className="w-[139px] bg-btn-secondary h-7 border-0 hover:text-white hover:bg-[#4a4a4d] text-white  p-0 rounded-md text-xs  font-medium"
                >
                  <Report className="w-4 h-4 " />
                  Report
                </Button>
              </div>
            </div>

            {/* Features */}
          </div>
            <div className="sm:hidden flex justify-center gap-2">
              {screenshots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeImage === idx ? "bg-blue-500 w-6" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <section className="mb-10 sm:mb-12">
              <div className="rounded-lg px-4 sm:px-0 py-6">
                {/* Intro Text */}
                <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                  A cozy horror, {"self-coop"}, adventure about two unlikely
                  souls who forge a forbidden bond and journey together to find
                  the sun. Explore eerie yet comforting Tim Burton-esque levels,
                  switch between two unique characters, and solve brain-teasing
                  puzzles.
                </p>

                {/* Genres & Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <div className="text-gray-500 text-xs mb-2">Genres</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">
                        Action-Adventure
                      </span>
                      <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">
                        Puzzle
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-xs mb-2">Features</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">
                        Controller Support
                      </span>
                      <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">
                        Single Player
                      </span>
                    </div>
                  </div>
                </div>

                {/* Story Section */}
                <h3 className="text-white font-bold text-base sm:text-lg mb-3">
                  When the sun gave up on humanity, darkness and gloom took its
                  place.
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-6 leading-relaxed">
                  In a world plunged into eternal night and torn by conflict
                  between the living and the undead, one faint glimmer of hope
                  still flickers in the hearts of two special souls. Gloomy Eyes
                  tells the tale of Gloomy, a sweet zombie boy, and Nena, a
                  mischievous human girl, who defy the rules by teaming up and
                  embarking on a quest to bring back the daylight.
                </p>

                {/* Feature 1 */}
                <h3 className="text-white font-bold text-base sm:text-lg mb-3">
                  A {"Self-Coop"} Adventure
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-6 leading-relaxed">
                  Control both Gloomy and Nena in a completely single-player
                  experience, switching between characters to solve
                  environmental puzzles. Each character brings unique abilities,
                  and you’ll need both to progress through this delightfully
                  wretched darkness.
                </p>

                {/* Feature 2 */}
                <h3 className="text-white font-bold text-base sm:text-lg mb-3">
                  Creepy Cozy Horror
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">
                  Step into a world where the macabre meets the magical.
                  Inspired by Tim Burton’s art style, Gloomy Eyes delivers
                  spooky charm without gore or jump scares — just a beautifully
                  haunting atmosphere.
                </p>

                {/* Show More Content */}
                {showMore && (
                  <div className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg mb-3">
                        Brain-Teasing Puzzles
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                        Solve cleverly designed puzzles that rely on cooperation
                        between Gloomy and Nena. Use their unique skills to
                        overcome obstacles and uncover secrets hidden in the
                        shadows.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg mb-3">
                        Rotatable Dioramas
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                        Explore handcrafted levels designed as rotatable
                        dioramas. Change perspectives to reveal hidden paths and
                        secrets in this immersive 3D world.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg mb-3">
                        Narrated by Colin Farrell
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                        The story is brought to life through the captivating
                        narration of Academy Award nominee Colin Farrell, adding
                        emotion and depth to this unforgettable journey.
                      </p>
                    </div>
                  </div>
                )}

                {/* Toggle Button */}
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="mt-6 text-blue-500 hover:text-blue-400 text-sm sm:text-base font-semibold flex items-center gap-2 transition-colors"
                >
                  {showMore ? "Show less" : "Show more"}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      showMore ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </section>

            <section>
              <div className="max-w-7xl bg-app-secondary mx-auto py-10">
                <div className="flex flex-row gap-4  ">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg md:text-xl font-semibold text-white">
                      Available Achievements ({totalAchievements})
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
  {achievements.map((achievement) => (
    <Card
      key={achievement.id}
      className="border-0 bg-transparent rounded-none transition-colors cursor-pointer"
    >
      <CardContent className="p-0">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 md:w-20 md:h-20 bg-[#1a1a1d] rounded flex items-center justify-center">
            <svg
              className="w-6 h-6 md:w-7 md:h-7 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>

          {/* Text */}
          <div className="w-full">
            <h3 className="text-white font-medium text-sm truncate">
              {achievement.name}
            </h3>

            <div className="flex justify-center items-center gap-2 text-xs mt-1">
              <span className="text-gray-500 font-medium">
                {achievement.xp} XP
              </span>
              <span className="text-gray-600">•</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

              </div>
            </section>

            <section className="max-w-3xl w-full flex lg:mb-10 flex-col space-y-3 sm:space-y-4 justify-start items-start px-3 sm:px-0">
              <h1 className="text-white font-semibold text-base sm:text-xl">
                Gloomy Eyes DLC & Add-Ons
              </h1>

              <Card className="bg-[#1a1a1d] border-none rounded-lg overflow-hidden w-full">
                <CardContent className="p-2.5 sm:p-4">
                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4">
                    {/* Image Section */}
                    <div className="flex-shrink-0">
                      <Image
                        width={100}
                        height={100}
                        alt="Gloomy Eyes Soundtrack"
                        src="/img/gloomy-eyes.png"
                        className="w-full  sm:w-48 md:w-60 sm:h-auto rounded object-cover"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-between gap-2.5 sm:gap-0">
                      <div>
                        <div className="text-gray-400 text-[10px] sm:text-xs mb-0.5 sm:mb-1">
                          Add-On
                        </div>
                        <h2 className="text-white font-semibold text-sm sm:text-xl mb-1 sm:mb-2">
                          Gloomy Eyes - Soundtrack
                        </h2>
                        <p className="text-gray-400 text-xs sm:text-sm mb-2">
                          Gloomy tunes for gloomy souls!
                        </p>
                        <div className="border-t border-[#2a2a2d] my-2 sm:my-4" />
                        <div className="text-white font-bold text-base sm:text-lg mb-2 sm:mb-3">
                          $2.29
                        </div>
                      </div>

                      {/* Buttons Section */}
                      <div className="flex gap-1.5 sm:gap-2 items-center">
                        <Button
                          variant="default"
                          className="flex-1 h-8 sm:h-10 bg-[#0fb6e5] hover:bg-[#0da5d0] text-black font-medium text-xs sm:text-base"
                        >
                          Add To Cart
                        </Button>
                        <Button
                          size="icon"
                          className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 text-white bg-transparent border border-text-clr-light hover:bg-btn-secondary"
                          aria-label="Gift"
                        >
                          <Gift className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 hover:text-white text-white bg-transparent border border-text-clr-light hover:bg-btn-secondary"
                          aria-label="Add to wishlist"
                        >
                          <Bookmark className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
            <h1 className="text-white font-bold my-6 px-4  text-xl">
              Gloomy Eyes System Requirements{" "}
            </h1>

            <section className="max-w-3xl w-full flex lg:mb-10 flex-col space-y-3 sm:space-y-4 justify-start items-start px-3 sm:px-0 sm:mb-12">
              <div className="bg-[#1a1a1d] border border-gray-800 rounded-lg p-6">
                {/* Windows Tab */}
                <div className="border-b border-gray-800 mb-6">
                  <button className="text-white font-semibold pb-2 border-b-2 border-blue-500">
                    Windows
                  </button>
                </div>

                {/* System Requirements Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Minimum Requirements */}
                  <div>
                    <h3 className="text-white font-bold text-lg mb-4">
                      Minimum
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-gray-500 text-xs mb-1">
                          OS version
                        </div>
                        <div className="text-gray-300">Windows 7</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">CPU</div>
                        <div className="text-gray-300">
                          AMD FX-8350 or Intel i5-6400
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Memory</div>
                        <div className="text-gray-300">8</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">GPU</div>
                        <div className="text-gray-300">
                          NVIDIA GTX 1050Ti or AMD Radeon RX 580
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Requirements */}
                  <div>
                    <h3 className="text-white font-bold text-lg mb-4">
                      Recommended
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-gray-500 text-xs mb-1">
                          OS version
                        </div>
                        <div className="text-gray-300">Windows 10</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">CPU</div>
                        <div className="text-gray-300">
                          Ryzen 5 2600X or Intel i5-8600K
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Memory</div>
                        <div className="text-gray-300">16</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">GPU</div>
                        <div className="text-gray-300">
                          AMD RX 5700 XT or RTX 2060
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mt-8 space-y-4 text-sm border-t border-gray-800 pt-6">
                  <div>
                    <div className="text-gray-500 text-xs mb-1">
                      Login Accounts Required
                    </div>
                    <div className="text-gray-300">Epic ID</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-1">
                      Languages Supported
                    </div>
                    <div className="text-gray-300 mb-1">Audio: English</div>
                    <div className="text-gray-300">
                      Text: English, French, German, Spanish (Spain),
                      Portuguese, Chinese (Simplified), Chinese (Traditional),
                      Japanese, Korean
                    </div>
                  </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <p className="text-gray-500 text-xs">
                    © ARTE France / Atlas V / Untold Tale / Fishing Cactus /
                    3Dar / Be Revolution 2025 - All rights reserved
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right */}
          <div className="hidden  md:flex flex-col gap-6 justify-center items-center">
            <Image
              src={"/img/gloomy.avif"}
              width={100}
              height={100}
              alt="Game screenshot"
              className="w-40 h-40 object-cover"
            />
            <Card className="w-full text-white flex p-0 flex-row max-w-sm bg-app-secondary border border-text-clr/60">
              <div className="w-full flex p-3">
                {" "}
                <Image
                  src={"/img/7+.png"}
                  width={100}
                  height={100}
                  alt="Game screenshot"
                  className="w-14 h-14 object-cover "
                />
                <CardHeader className="w-full p-2">
                  <CardTitle className="">7+</CardTitle>
                  <CardDescription>Fear, Mild Violence </CardDescription>
                </CardHeader>
              </div>
            </Card>

            <div className="w-full">
              <h5 className="text-xs p-0.5 w-24 text-center rounded-xs sm:text-sm lg:text-md font-medium text-white bg-btn-secondary mb-2">
                Base Game
              </h5>
              <span className="font-semibold text-white text-sm">$14.99</span>
            </div>

            <div className="w-full max-w-sm bg-app-secondary rounded-lg p-4 space-y-3 text-sm  font-sans ">
              <div className="flex w-full gap-2">
                {/* Buy Now Button */}
                <Button
                  className=" flex-1 h-10 bg-sky-400 text-sm font-medium  hover:bg-sky-500 text-black rounded-md
        "
                >
                  Buy Now
                </Button>

                <Button
                  className=" h-10 p-0  w-14 bg-btn-secondary  text-white rounded-md flex items-center justify-center
        "
                >
                  <Cart className="w-6 h-6" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full hover:text-white bg-btn-secondary  border-0 hover:bg-[#4a4a4d] text-white text-xs  font-semibold py-5 rounded-md relative"
              >
                <Gift className="w-5 h-5" />
                Gift
                <Badge className="absolute right-3 bg-btn-primary/20 text-btn-primary text-xs px-2 py-0.2">
                  New!
                </Badge>
              </Button>

              <Button
                variant="outline"
                className="w-full hover:text-white bg-btn-secondary border-0 hover:bg-[#4a4a4d] text-white  py-5 rounded-md text-xs  font-semibold"
              >
                <Wishlist className="w-5 h-5 " />
                Wishlist
              </Button>
              <div className="flex items-center justify-between pt-2 ">
                <span className="text-text-clr-light text-sm">
                  Epic Rewards
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-semibold">
                    Earn 20% Back
                  </span>
                  <Star className="w-4 h-4 text-[#0078f2]" />
                </div>
              </div>

              <div className="border-t border-text-clr/70 " />

              <div className="flex text-clr  items-center justify-between ">
                <span className="text-text-clr-light text-sm">Refund Type</span>
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">Self-Refundable</span>
                  <Info className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="border-t border-text-clr/70 " />

              <div className="flex justify-between  gap-6 ">
                <div className="text-text-clr-light text-sm ">Developer</div>
                <div className="text-white text-xs ">
                  Atlas V, Be Revolution Gaming, 3Dar, Fishing Cactus, ARTE
                  France
                </div>
              </div>
              <div className="border-t border-text-clr/70 " />

              <div className="flex justify-between  gap-6 ">
                <div className="text-text-clr-light text-sm ">Publisher</div>
                <div className="text-white text-xs ">
                  ARTE France, Untold Tales
                </div>
              </div>
              <div className="border-t border-text-clr/70 " />

              <div className="flex items-center justify-between ">
                <span className="text-text-clr-light text-sm">
                  Release Date
                </span>
                <span className="text-white text-sm">09/12/25</span>
              </div>
              <div className="border-t border-text-clr/70 " />
              <div className="flex items-center justify-between ">
                <span className="text-text-clr-light text-sm">Platform</span>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                  </svg>
                </div>
              </div>
              <div className="border-t border-text-clr/70 " />

              <button className="w-full flex items-center justify-between py-3 text-white text-sm hover:text-gray-300 transition-colors">
                <span>See All Editions and Add-Ons</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="flex flex-row justify-between w-full ">
                {" "}
                <Button
                  variant="outline"
                  className=" w-[139px] bg-btn-secondary h-7 border-0 hover:text-white hover:bg-[#4a4a4d] text-white text-xs  font-semibold  rounded-md relative"
                >
                  <Share className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  className="w-[139px] bg-btn-secondary h-7 border-0 hover:text-white hover:bg-[#4a4a4d] text-white  p-0 rounded-md text-xs  font-medium"
                >
                  <Report className="w-4 h-4 " />
                  Report
                </Button>
              </div>
            </div>

            {/* Features */}
          </div>
        </div>
        <h5 className="text-white text-xs">
          * The lowest price offered on The Epic Games Store in the last 30 days
          before discount
        </h5>
      </main>
    </>
  );
}

export default OverView;
