"use client";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Icon,
  MessageCircle,
  MessageSquare,
  Plus,
  User,
} from "lucide-react";
import Image from "next/image";
import { useGameStore } from "../../../json/apiStore";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "../../../components/ui/spinner";
import PublishersSection from "./PublishersSection";
import * as Icons from "lucide-react";

import {
  EpicGame,
  F,
  KidsWeb,
  Metahuman,
  RealityScan,
  Twinmotion,
  UnrealEngine,
} from "@/src/components/icons/indexs";
import Link from "next/link";

const Devforum = () => {
  const games: any = useGameStore((s) => s.games);
  const fetchGames = useGameStore((s) => s.fetchGames);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const gameArray = games?.games?.filter((g) => g.category !== "");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const itemWidth = 500; // width of one item

  // Update scroll position and max scroll when scrolling
  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const maxScrollValue =
        scrollContainerRef.current.scrollWidth -
        scrollContainerRef.current.clientWidth;

      setScrollPosition(currentScroll);
      setMaxScroll(maxScrollValue);
    }
  };

  // 👉 Scroll Left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const newScroll = scrollContainerRef.current.scrollLeft - itemWidth;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });

      // Update after scroll animation
      setTimeout(updateScrollState, 300);
    }
  };

  // 👉 Scroll Right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const newScroll = scrollContainerRef.current.scrollLeft + itemWidth;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });

      // Update after scroll animation
      setTimeout(updateScrollState, 300);
    }
  };

  // Update scroll state when component mounts and when window resizes
  useEffect(() => {
    updateScrollState();

    const handleResize = () => {
      updateScrollState();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gameArray]); // Re-run when gameArray changes

  // Handle scroll events
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollState);
      return () => {
        container.removeEventListener("scroll", updateScrollState);
      };
    }
  }, []);

  const forums = [
    {
      title: "Onboarding",
      topics: 83,
      replies: 303,
      lastTopic: "Stuck at tax interview: Cannot complete...",
      timeAgo: "2w ago",
      author: "NoVax Pureblood",
    },
    {
      title: "Store Presence & Configuration",
      topics: 283,
      replies: 925,
      lastTopic: "Is it possible to buy a game through Razer...",
      timeAgo: "4d ago",
      author: "AKSOFINIK",
    },
  ];

  const helpResources = [
    {
      icon: "🏢",
      title: "Dev Portal",
      description:
        "Your control center for product configuration and distribution.",
      link: "Dev Portal ↓",
    },
    {
      icon: "📄",
      title: "Documentation",
      description:
        "Guides and references for the Epic Games Store distribution process.",
      link: "Documentation ↓",
    },
    {
      icon: "❓",
      title: "Get Support",
      description:
        "Join our developer community, help your peers and ask questions",
      link: "Get Support →",
    },
  ];
  const tags = [
    {
      label: "Unreal Engine",
      icon: UnrealEngine,
      href: "https://www.unrealengine.com/?lang=en-US",
    },
    {
      label: "Create in Fortnite",
      icon: F,
      href: "https://www.fortnite.com/developer?lang=en-US",
    },
    {
      label: "MetaHuman",
      icon: Metahuman,
      href: "https://www.metahuman.com/?lang=en-US",
    },
    {
      label: "Twinmotion",
      icon: Twinmotion,
      href: "https://www.twinmotion.com/?lang=en-US",
    },
    {
      label: "RealityScan",
      icon: RealityScan,
      href: "https://www.realityscan.com/",
    },
    {
      label: "Epic Online Services",
      icon: EpicGame,
      href: "/Epiconlineservices",
    },
    {
      label: "Publish on Epic Games",
      icon: EpicGame,
      href: "/Epicdistribution",
    },
    { label: "Kids Web Services", icon: KidsWeb, href: "/KidsWebServices" },
    {
      label: "Developer Community",
      icon: EpicGame,
      href: "/DeveloperCommunity",
    },
  ];

  // Button disabled states
  const isLeftDisabled = scrollPosition <= 0;
  const isRightDisabled = scrollPosition >= maxScroll - 1;
  if (!games || games.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app-secondary">
        <Spinner className="size-8 text-[#6705FC]" />
      </div>
    );
  }
  return (
    <>
      <div className="text-white p-2 bg-gradient-to-b from-[#111112] to-black flex flex-col gap-10">
        <section className=" ">
          <div className="flex justify-center items-center ">
            <Image
              src="/img/devCom.svg"
              alt="apic store"
              className="object-contain w-42 rounded-lg p-2"
              width={64}
              height={64}
              priority
            />
            <Image
              src="/img/epicStore.svg"
              alt="apic store"
              className="object-contain w-36 rounded-lg  p-2"
              width={64}
              height={64}
              priority
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tags.map((item, idx) => {
 const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  target="_blank"
                  className="p-2 rounded-md border border-btn-cmpt bg-btn-cmpt hover:bg-[#3a3a3a] transition-colors"
                >
                  <div className="flex gap-2 justify-center items-center">
                      <Icon className="w-4 h-4 text-blue-400 mb-1" />
                    <span className="text-white text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <div className=" md:mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Popular Genres</h2>
            <div className="flex gap-2">
              <button
                onClick={scrollLeft}
                disabled={isLeftDisabled}
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-40 flex items-center justify-center transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                disabled={isRightDisabled}
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-40 flex items-center justify-center transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div
            className="flex gap-4 overflow-x-auto max-w-full pb-2 scrollbar-hide overflow-y-hidden"
            ref={scrollContainerRef}
          >
            {gameArray?.map((game) => (
              <div
                key={game._id}
                className="bg-trans max-w-[220] bg- rounded-lg p-4 bg-app bg-blur hover:bg-text-clr transition-colors cursor-pointer flex-shrink-0"
                style={{ width: `${itemWidth}px` }}
              >
                <div className="flex max-w-lg gap-2 mb-4">
                  <div className="aspect-square rounded overflow-hidden w-48">
                    <Image
                      height={300}
                      width={300}
                      src={game.image}
                      alt={game.category || "Game category"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-center font-semibold w-full h-6 overflow-hidden">
                  {game.category}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <section>
          <PublishersSection />
          <section className=" px-2 ">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-3xl font-bold">Forums</h3>
                  <p className="text-gray-400 text-sm mt-2">2 / week</p>
                </div>
              </div>

              <div className="space-y-4">
                {forums.map((forum, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-lg border border-btn-cmpt bg-btn-cmpt "
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-lg mb-2">
                          {forum.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MessageSquare size={18} />
                        <span>{forum.topics} Topics</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MessageCircle size={18} />
                        <span>{forum.replies} Replies</span>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-300 font-semibold text-sm">
                          Last Topic
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-800 pt-4 grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div></div>
                      <div></div>
                      <div className="md:col-span-2">
                        <p className="text-gray-300 mb-2 line-clamp-1">
                          {forum.lastTopic}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={14} />
                          <span>{forum.timeAgo} by</span>
                          <User size={14} />
                          <span className="text-blue-400 font-semibold">
                            {forum.author}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Help & Support Section */}
          <section className="py-20 px-6 bg-transparent">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-4 gap-2">
                <div className="md:col-span-1">
                  <h3 className="text-xl font-bold mb-4">
                    Get help and ask questions
                  </h3>
                  <p className="text-gray-400  text-sm leading-relaxed">
                    Share, inspire, and connect with developers across
                    industries and around the globe. Share everything from cool
                    routines to nifty shader tricks.
                  </p>
                </div>

                {helpResources.map((resource, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-lg border border-btn-cmpt bg-btn-cmpt  transition hover:bg-gray-900"
                  >
                    <span className="text-xl mb-4 ">{resource.icon}</span>
                    <h4 className="text-sm font-bold mb-3">{resource.title}</h4>
                    <p className="text-gray-400 text-sm mb-6">
                      {resource.description}
                    </p>
                    <a
                      href="#"
                      className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center gap-2"
                    >
                      {resource.link.includes("↓") ? (
                        <>
                          {resource.link.split(" ")[0]}
                          <ChevronRight size={16} />
                        </>
                      ) : (
                        <>
                          {resource.link.split(" ")[0]}
                          <ArrowRight size={16} />
                        </>
                      )}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>

        {/* <section className="flex">
          <div className="w-full mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-6">
              <div className=" rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-[#101116] to-[#162731] overflow-hidden">
                <div className="flex flex-col w-full justify-center bg-gradient-to-br from-[#0F1016] to-[#0E1128] opacity-70" />
                <div className="w-48 flex">
                  <Image
                    width={600}
                    height={400}
                    src="/img/epic-dev.svg"
                    alt="Epic Games Store"
                    className="w-full h-auto max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[600px]"
                  />
                </div>
                <div>
                  {" "}
                  <p className="text-gray-400 text-sm mb-4">
                    Join the discussion or create topics for community support
                    around distribution
                  </p>
                  <a className="text-blue-400 text-sm hover:underline">
                    Go to the community
                  </a>
                </div>
              </div>
              <div className="relative rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-[#101116] to-[#162731] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F1016] to-[#0E1128] opacity-70" />
                <div>
                  <Image
                    width={600}
                    height={400}
                    src="/img/epic+unreal.svg"
                    alt="Epic Games Store"
                    className="w-full h-auto max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[600px]"
                  />
                </div>
                <div className="">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    EPIC GAMES DEV
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Join the discussion or create topics for community support
                    around distribution
                  </p>
                  <a className="text-blue-400 text-sm hover:underline">
                    Go to the community
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="">
          <div className="max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                className="rounded-2xl p-6 border border-white/10 bg-[linear-gradient(90deg,#0E1128_0%,#0E1128_47%,#14152B_53%,#101010_100%)]
"
              >
                <div className="flex flex-row justify-center items-center">
                  <Image
                    width={100}
                    height={100}
                    src="/img/url-en.svg"
                    alt="Epic Games Store"
                    className="w-40"
                  />
                  <div className="flex flex-col p-6 m-4">
                    <p className="text-gray-400 text-md text-center  w-10">
                      The world{`'`}s most open and advanced real-time 3D
                      creation tool
                    </p>
                    <a className="text-blue-400 text-sm hover:underline">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
              <div
                className=" rounded-2xl p-6 border border-white/10 bg-[linear-gradient(90deg,#1A0C47_0%,#1A0C47_45%,#15112A_55%,#0F1012_100%)]
"
              >
                <div className="flex flex-row justify-center items-center">
                  <Image
                    width={100}
                    height={100}
                    src="/img/epic-on.svg"
                    alt="Epic Games Store"
                    className="w-40"
                  />
                  <div className="flex flex-col p-6 m-4">
                    {" "}
                    <p className="text-gray-400 text-md text-center mb-4 w-10">
                      Modular online services to connect your community across
                      platforms
                    </p>
                    <a className="text-blue-400 text-sm hover:underline">
                      Explore our services
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6 border border-white/10 bg-[linear-gradient(90deg,#4B2A7A_0%,#4B2A7A_35%,#1A1326_65%,#0C0A12_100%)]">
                <div className="flex flex-row justify-center items-center">
                  <Image
                    width={100}
                    height={100}
                    src="/img/kws.png"
                    alt="Epic Games Store"
                    className="w-40 h-40"
                  />
                  <div className="flex flex-col p-6 m-4">
                    {" "}
                    <p className="text-gray-400 text-md text-center mb-4 w-10">
                      The leading parent verification and consent management
                      toolkit
                    </p>
                    <a className="text-blue-400 text-sm hover:underline">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </>
  );
};

export default Devforum;
