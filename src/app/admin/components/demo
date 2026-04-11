"use client";
import Image from "next/image";

function News() {
  const games = [
    { id: 1, title: "Fortnite", image: "🎮", color: "bg-purple-600" },
    { id: 2, title: "Duet Night Abyss", image: "🌙", color: "bg-amber-600" },
    { id: 3, title: "SILENT HILL f", image: "👻", color: "bg-red-600" },
    {
      id: 4,
      title: "Out of Words",
      image: "📝",
      color: "bg-teal-600",
      featured: true,
    },
    { id: 5, title: "Where Winds Meet", image: "🏮", color: "bg-blue-600" },
    { id: 6, title: "RAVEN2", image: "🦅", color: "bg-orange-600" },
  ];
  const articles = [
    {
      id: 1,
      timeAgo: "8D AGO",
      title: "Epic Games Store's 2026 release preview",
      description:
        "From Star Wars and Resident Evil to a plethora of indie darlings",
      image: "/img/gloomy-eyes.png",
    },
    {
      id: 2,
      timeAgo: "15D AGO",
      title: "How 007 First Light brought its characters to life",
      description:
        "We talked with IO Interactive about casting Lenny Kravitz and Patrick Gibson in 007 First Light",
      image: "/img/gloomy-eyes.png",
    },
  ];

  return (
    <>
      <div className="bg-transparent min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    width={100}
                    height={100}
                    src={article.image}
                    alt={article.title}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-3">
                  <p className="text-xs text-gray-400 tracking-wider">
                    {article.timeAgo}
                  </p>
                  <h2 className="text-white text-2xl font-bold group-hover:text-gray-300 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-400 text-base leading-relaxed">
                    {article.description}
                  </p>
                  <button className="text-white text-sm font-semibold hover:text-gray-300 transition-colors">
                    Read more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Latest News</h2>
          <div className="space-y-3 md:space-y-4">
            {games.slice(0, 3).map((game) => (
              <div
                key={game.id}
                className="bg-transparent border-t border-text-clr  p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 hover:bg-gray-750 transition-colors cursor-pointer"
              >
                <div
                  className={`w-full md:w-32 h-32 ${game.color} rounded-lg flex items-center justify-center text-4xl flex-shrink-0`}
                >
                  {game.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    {game.title} - New Updates
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 mb-3">
                    Exciting new features and improvements coming to{" "}
                    {game.title}. Stay tuned for more announcements!
                  </p>
                  <span className="text-xs md:text-sm text-gray-500">
                    2 days ago
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default News;
