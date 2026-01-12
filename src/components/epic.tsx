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
} from "./icons";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
const createMenu = [
  { label: "Unreal Engine", icon: UnrealEngine },
  { label: "Create in Fortnite", icon: F },
  { label: "MetaHuman", icon: Metahuman },
  { label: "Twinmotion", icon: Twinmotion },
  { label: "RealityScan", icon: RealityScan },
  { label: "Epic Online Services", icon: EpicGame },
  { label: "Publish on Epic Games Store", icon: EpicGame },
  { label: "Kids Web Services", icon: KidsWeb },
  { label: "Developer Community", icon: EpicGame },
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
    href: "/fab",
  },
  {
    label: "Sketchfab",
    icon: Sketchfab,
    href: "/sketchfab",
  },
  {
    label: "ArtStation",
    icon: ArtStation,
    href: "/artstation",
  },
];
const playMenu = [
  {
    label: "Fortnite",
    icon: F,
    href: "/fortnite",
  },
  {
    label: "Rocket League",
    icon: RocketLeague,
    href: "/rocket-league",
  },
  {
    label: "Fall Guys",
    icon: ArtStation,
    href: "/fall-guys",
  },
];

function Epic() {
  return (
    <>
      <div
        className=" grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#343440] text-white w-full md:w-[600px]"
      >
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
                      href="#"
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
                  href="#"
                  className="flex items-center gap-3 px-3 py-2  hover:bg-[#3a3a3a] rounded text-[15px] transition-colors"
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
