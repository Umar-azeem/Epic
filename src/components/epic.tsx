import Image from "next/image";
import React from "react";
import {
  ArtStation,
  EpicGame,
  F,
  Feb,
  KidsWeb,
  Metahuman,
  RealityScan,
  RocketLeague,
  Sketchfab,
  Twinmotion,
  UnrealEngine,
} from "./icons/indexs";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
const createMenu = [
  { label: "Unreal Engine", icon: UnrealEngine , href:"https://www.unrealengine.com/?lang=en-US", },
  { label: "Create in Fortnite", icon: F , href:"https://www.fortnite.com/developer?lang=en-US" },
  { label: "MetaHuman", icon: Metahuman , href:"https://www.metahuman.com/?lang=en-US"},
  { label: "Twinmotion", icon: Twinmotion, href:"https://www.twinmotion.com/?lang=en-US" },
  { label: "RealityScan", icon: RealityScan , href:"https://www.realityscan.com/"},
  { label: "Epic Online Services", icon: EpicGame, href:"/Epiconlineservices" },
  { label: "Publish on Epic Games Store", icon: EpicGame , href:"/Epicdistribution"},
  { label: "Kids Web Services", icon: KidsWeb , href:"/KidsWebServices"},
  { label: "Developer Community", icon: EpicGame , href:"/DeveloperCommunity"},
];
const discoverMenu = [
  {
    label: "Epic Games Store",
    icon: EpicGame,
    href: "/",
  },
  {
    label: "Fab",
    icon: Feb,
    href: "/feb",
  },
  {
    label: "Sketchfab",
    icon: Sketchfab,
    href: "https://sketchfab.com/",
  },
  {
    label: "ArtStation",
    icon: ArtStation,
    href: "https://www.artstation.com/?sort_by=community&dimension=all",
  },
];
const playMenu = [
  {
    label: "Fortnite",
    icon: F,
    href: "https://www.fortnite.com/?lang=en-US",
  },
  {
    label: "Rocket League",
    icon: RocketLeague,
    href: "https://www.rocketleague.com/en/",
  },
  {
    label: "Fall Guys",
    icon: ArtStation,
    href: "https://www.fallguys.com/en-US?lang=en-US",
  },
];

function Epic() {
  return (
    <>
      <div className="  grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#343440] text-white w-full md:w-[600px]">
        <div className="">
          <div className="flex flex-col space-y-2 p-6 text-white">
            <h3 className="text-white font-bold text-lg">Play</h3>

            <ul className="space-y-1">
              {playMenu.map((item, index) => {
                const Icon = item.icon;

                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                       target="_blank"
                      className="flex items-center gap-3 px-3 py-2  hover:bg-[#3a3a3a] rounded text-[15px] transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t flex flex-col space-y-2 border-[#343440] p-6">
            <h3 className="text-white font-bold text-lg">Discover</h3>

            <ul className="">
              {discoverMenu.map((item, index) => {
                const Icon = item.icon;

                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                       target="_blank"
                      className="flex items-center gap-3 px-3 py-2  hover:bg-[#3a3a3a] rounded text-[15px] transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col space-y-2 p-6">
          <h3 className="text-white font-bold text-lg">Create</h3>

          <ul className="">
            {createMenu.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  className="flex items-center  target:_blank gap-3 px-3 py-2  hover:bg-[#3a3a3a] rounded text-[15px] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Epic;
