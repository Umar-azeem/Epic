"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Check, Download, FileText, Settings } from "lucide-react";

const platformIcons = {
  Xbox: "🎮",
  Windows: "💻",
  Android: "📱",
  PlayStation: "🎯",
  Steam: "🔥",
  Apple: "🍎",
  EGS: "⚡",
  Switch: "🎮",
  iOS: "📲",
  Linux: "🐧",
  GOG: "👾",
};

const companies = [
  "Unknown Worlds",
  "2K",
  "Supergiant Games",
  "Krafton",
  "Innersloth",
  "Facepunch",
  "FromSoftware",
  "Vaulted Sky Games",
  "505 Games",
  "Microprose",
  "Nexon",
  "Respawn Entertainment",
  "Retropixel",
  "Morefun Studios",
];

const services = [
  {
    title: "Accounts & Social",
    description:
      "Bring your players together with the Epic Games account ecosystem",
    items: [
      "Epic Account Ecosystem",
      "Crossplay",
      "Friends",
      "Overlay",
      "Presence",
    ],
    color: "from-blue-600 to-blue-400",
  },
  {
    title: "Multiplayer",
    description:
      "Power multiplayer experiences across diverse platforms and services",
    items: ["Peer-to-Peer", "Sessions", "Lobbies", "Voice Chat"],
    color: "from-purple-600 to-purple-400",
  },
  {
    title: "Player & Game Data",
    description:
      "Keep progress persistent and increase long-term engagement",
    items: [
      "Leaderboards",
      "Stats",
      "Achievements",
      "Player Data Storage",
      "Title Storage",
    ],
    color: "from-orange-600 to-orange-400",
  },
  {
    title: "Trust & Safety",
    description:
      "Protect players, build trust, and safeguard your game's integrity",
    items: ["Easy Anti Cheat", "Sanctions", "Player Reports", "Kids Web Services"],
    color: "from-red-600 to-red-400",
  },
];

const newsItems = [
  {
    id: 1,
    date: "March 19, 2026",
    title: "SEGA delivers global crossplay in Sonic Racing: CrossWorlds",
    description:
      "Discover how Sonic Racing: CrossWorlds delivered fast, seamless cross-platform multiplayer action at global scale—and how the team at SEGA used Epic Online Services",
    image: "🏎️",
    tag: "Spotlight",
  },
  {
    id: 2,
    date: "December 18, 2025",
    title: "RetroPixel Digital brings crossplay to Green Hawk Platoon",
    description:
      "With Epic Online Services handling authentication, voice, lobbies, and crossplay, RetroPixel Digital were able to focus on the creative aspects",
    image: "🪖",
    tag: "Spotlight",
  },
];

const successStories = [
  {
    title: "RetroPixel Digital brings crossplay to Green Hawk Platoon",
    description: "Focus on creative development with EOS handling the backend",
    image: "🪖",
  },
  {
    title: "Manticore Games goes all in on Epic for Out of Time",
    description: "Discover why Manticore tapped into the Epic ecosystem",
    image: "⏰",
  },
  {
    title: "Building Loftia's MMO Architecture with Epic Online Services",
    description: "Learn how Qloud is building their cozy MMO",
    image: "🏰",
  },
  {
    title: "Midnight Ghost Hunt: Building a killer multiplayer experience",
    description: "Explore how they used EOS to build seamless multiplayer",
    image: "👻",
  },
];

export default function EpicOnlineServices() {
  const [activeService, setActiveService] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-primary text-white min-w-screen overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-primary bg-opacity-90 backdrop-blur-md border-b border-gray-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r bg-secondary from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Epic Online Services
          </h1>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="hover:text-blue-400 bg-secondary transition">
              Services
            </a>
            <a href="#stories" className="hover:text-blue-400 transition">
              Success Stories
            </a>
            <a href="#docs" className="hover:text-blue-400 transition">
              Docs
            </a>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6 mb-12 animate-float">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
              Ship faster.{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Scale faster.
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Available to everyone. Elevate your team's capabilities with our
              suite of open, modular online services that free you up to do what
              you do best: develop great games.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="group-hover:translate-x-1 transition" />
              </button>
              <button className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-lg font-bold text-lg transition">
                Documentation
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden border border-gray-800 bg-gradient-to-b from-gray-900 to-black">
            <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-700">
              🎮 Epic Online Services Platform
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-4xl font-bold mb-2">Epic Online Services news</h3>
              <p className="text-gray-400">Latest updates and spotlight stories</p>
            </div>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2"
            >
              View all <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition"
              >
                <div className="h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl group-hover:scale-105 transition duration-300 overflow-hidden">
                  {item.image}
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{item.date}</span>
                    <span className="text-xs bg-blue-600 bg-opacity-30 text-blue-300 px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold group-hover:text-blue-400 transition">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Steps */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold mb-4 text-center">Get started</h3>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Epic Online Services is for everyone in the gaming world, from the
            smallest developer to the largest publisher.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Download the SDK",
                description:
                  "Download the latest Epic Online Services SDK for PC (C or C#), Android, or iOS.",
                icon: Download,
              },
              {
                step: 2,
                title: "Configure services",
                description:
                  "Log in to the Developer Portal using an Epic Games account to set up your product.",
                icon: Settings,
              },
              {
                step: 3,
                title: "Explore docs and samples",
                description:
                  "Check out the docs for technical details and information on samples.",
                icon: FileText,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="group">
                  <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-blue-600 transition h-full">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 mb-6 group-hover:scale-110 transition">
                      <Icon size={24} />
                    </div>
                    <div className="text-5xl font-bold text-gray-700 mb-4">
                      {item.step}
                    </div>
                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                    <p className="text-gray-400 mb-6">{item.description}</p>
                    <button className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2">
                      Learn more <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold mb-4 text-center">
            Mix and match services
          </h3>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Build with the same power, flexibility, and reach as the industry's
            leading studios.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                onClick={() => setActiveService(idx)}
                className={`cursor-pointer p-8 rounded-2xl border transition transform hover:scale-105 ${
                  activeService === idx
                    ? `bg-gradient-to-br ${service.color} border-transparent`
                    : "bg-gray-900 border-gray-800 hover:border-gray-600"
                }`}
              >
                <h4 className="text-2xl font-bold mb-3">{service.title}</h4>
                <p
                  className={`mb-6 ${
                    activeService === idx ? "text-gray-100" : "text-gray-400"
                  }`}
                >
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <Check size={18} />
                      <span className={activeService === idx ? "text-gray-100" : "text-gray-300"}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="mt-6 font-bold hover:underline flex items-center gap-2">
                  See all <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold mb-4 text-center">
            Build once, launch everywhere
          </h3>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Break down barriers. With Epic Online Services, you can bring your
            vision to all major platforms and stores with one integration.
          </p>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {[
              "Xbox",
              "Windows",
              "Android",
              "PlayStation",
              "Steam",
              "Apple",
              "EGS",
              "Switch",
              "iOS",
              "Linux",
              "GOG",
            ].map((platform) => (
              <div
                key={platform}
                className="flex items-center justify-center p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500 transition hover:scale-105 cursor-pointer"
              >
                <span className="text-4xl">{platformIcons[platform]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="stories" className="py-20 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold mb-4 text-center">
            Battle-tested and trusted worldwide
          </h3>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Our services are battle-tested scalability trusted by hundreds of games
            reaching tens of millions of concurrent users.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {companies.map((company) => (
              <div
                key={company}
                className="flex items-center justify-center p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500 transition hover:bg-gray-800"
              >
                <span className="font-semibold text-center">{company}</span>
              </div>
            ))}
          </div>

          {/* Success Stories Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((story, idx) => (
              <div
                key={idx}
                className="group cursor-pointer bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-600 transition"
              >
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-5xl group-hover:scale-105 transition duration-300">
                  {story.image}
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition">
                    {story.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">{story.description}</p>
                  <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center gap-2">
                    Read more <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="py-16 px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h4 className="text-2xl font-bold">Trust statement</h4>
          <p className="text-gray-400 leading-relaxed">
            We believe you should be in control of your data. That's why we're
            committed to protecting information systems, intellectual property, and
            personal and customer data from misuse or compromise.
          </p>
          <button className="text-blue-400 hover:text-blue-300 font-semibold flex items-center justify-center gap-2 mx-auto">
            Read now <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 Epic Games, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}