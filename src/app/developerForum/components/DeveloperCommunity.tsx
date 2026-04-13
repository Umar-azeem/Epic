"use client";
import { useState, useEffect } from "react";
import { ChevronRight, MessageSquare, MessageCircle, Clock, User, Plus, ArrowRight } from "lucide-react";

export default function DeveloperCommunity() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const communityTabs = [
    { name: "Unreal Engine", count: "569K", icon: "🎮" },
    { name: "Fortnite", count: "32K", icon: "🎯" },
    { name: "Epic for Indies", count: "718", icon: "🎨" },
    { name: "Epic Games Store", count: "1K", icon: "🏪", highlighted: true },
  ];

  const secondaryTabs = [
    { name: "RealityScan", count: "6K", icon: "📸" },
    { name: "MetaHuman", count: "3K", icon: "🧑" },
    { name: "Twinmotion", count: "7K", icon: "🏗️" },
    { name: "Fab", count: "41K", icon: "📦" },
  ];

  const announcements = [
    {
      id: 1,
      title: "2025 Year in Review",
      description: "Epic's 2025 highlights and what's ahead",
      image: "gradient-to-r from-purple-600 to-blue-600",
      tag: "2025",
    },
    {
      id: 2,
      title: "Connecting Players in More Places",
      description: "Expanding Epic Games ecosystem reach",
      image: "gradient-to-r from-orange-600 to-pink-600",
      tag: "Community",
    },
    {
      id: 3,
      title: "Gifting Now Live on Epic Games Store",
      description: "New gifting features available now",
      image: "gradient-to-r from-blue-600 to-purple-600",
      tag: "Features",
    },
    {
      id: 4,
      title: "Introducing Epic Web Shops",
      description: "New web shop experience powered by Epic",
      image: "gradient-to-r from-pink-600 to-purple-600",
      tag: "New",
    },
  ];

  

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black bg-opacity-90 backdrop-blur-md border-b border-gray-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">EPIC</h1>
            <span className="text-gray-400">|</span>
            <h2 className="text-xl font-bold">DEV COMMUNITY</h2>
            <span className="text-gray-400">×</span>
            <h3 className="text-xl font-bold">EPIC STORE</h3>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition">
            Join Now
          </button>
        </div>
      </nav>

      {/* Hero / Communities Section */}
      <section className="pt-32 pb-12 px-6 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Primary Communities */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Featured Communities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {communityTabs.map((tab, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border transition flex items-center gap-3 ${
                    tab.highlighted
                      ? "border-blue-500 bg-blue-600 bg-opacity-10"
                      : "border-gray-700 bg-gray-900 hover:border-gray-600"
                  }`}
                >
                  <span className="text-2xl">{tab.icon}</span>
                  <div>
                    <p className="text-sm font-semibold">{tab.name}</p>
                    <p className={`text-xs ${tab.highlighted ? "text-blue-300" : "text-gray-500"}`}>
                      {tab.count} members
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Communities */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {secondaryTabs.map((tab, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-gray-700 bg-gray-900 hover:border-gray-600 transition flex items-center gap-3"
                >
                  <span className="text-2xl">{tab.icon}</span>
                  <div>
                    <p className="text-sm font-semibold">{tab.name}</p>
                    <p className="text-xs text-gray-500">{tab.count} members</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-20 px-6 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold">Announcements</h3>
            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="group cursor-pointer rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition hover:scale-105 duration-300"
              >
                <div className={`h-40 bg-gradient-to-br ${announcement.image} flex items-end justify-between p-4`}>
                  <div></div>
                  <span className="text-xs font-bold bg-black bg-opacity-50 px-3 py-1 rounded-full text-gray-300">
                    {announcement.tag}
                  </span>
                </div>
                <div className="p-4 bg-gray-950">
                  <h4 className="font-bold text-lg mb-2 group-hover:text-blue-400 transition line-clamp-2">
                    {announcement.title}
                  </h4>
                  <p className="text-gray-400 text-sm line-clamp-2">{announcement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forums Section */}
     

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-500 border-t border-blue-400">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-4xl font-bold">Join the Epic Developer Community</h3>
          <p className="text-lg text-gray-100">
            Connect with thousands of game developers, share your knowledge, ask questions, and collaborate on amazing projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition">
              Join Community
            </button>
            <button className="border-2 border-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-lg font-bold transition">
              View Guidelines
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold mb-4">Community</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Forums
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Resources</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Dev Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Social</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Epic Games, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}