"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";

function News() {
  "use client";

  const [games, setGames] = useState([]);
  const [visibleCount, setVisibleCount] = useState(7);

  const handleShowMore = () => {
    setVisibleCount((prev) => {
      const next = prev + 10;
      return next > 50 ? 50 : next;
    });
  };
const maxLimit = Math.min(games?.length || 0, 50);
const canShowMore = visibleCount < maxLimit;  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("/api/gamesNews");
        const data = await res.json();

        console.log("CLIENT DATA:", data);

        setGames(data);
      } catch (error) {
        console.log("ERROR:", error);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    console.log("STATE UPDATED:", games);
  }, [games]);
 if (!games || games.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app-secondary">
        <Spinner className="size-8 text-[#6705FC]" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-transparent min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game: any) => (
              <div key={game.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    width={500}
                    height={300}
                    src={game.image}
                    alt={game.title}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-gray-400 tracking-wider">
                    {new Date(game.published_date).toDateString()}
                  </p>

                  <h2 className="text-white text-2xl font-bold group-hover:text-gray-300 transition-colors">
                    {game.title}
                  </h2>

                  <p className="text-gray-400 text-base leading-relaxed">
                    {game.description}
                  </p>

                  <a
                    href={game.open_giveaway_url}
                    target="_blank"
                    className="text-white text-sm font-semibold hover:text-gray-300 transition-colors"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3 md:space-y-4">
          {games?.slice(0, visibleCount).map((item, index) => {
            const updateTexts = [
              "New update has been rolled out with performance improvements and bug fixes.",
              "Developers have introduced fresh features and gameplay enhancements.",
              "A major patch update improves stability and user experience.",
            ];

            const timeTexts = ["1 day ago", "2 days ago", "3 days ago"];

            return (
              <div
                key={item.id}
                className="bg-transparent border-t border-text-clr p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 hover:bg-gray-750 transition-colors cursor-pointer"
              >
                <div className="w-full md:w-32 h-32 rounded-lg flex items-center justify-center text-4xl">
                  <Image
                    width={100}
                    height={100}
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 rounded-2xl object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg md:text-xl text-white font-semibold mb-2">
                    {item.title} — Latest Update
                  </h3>

                  <p className="text-sm md:text-base text-gray-400 mb-3">
                    {updateTexts[index % updateTexts.length]} More details about{" "}
                    {item.title} are coming soon.
                  </p>

                  <span className="text-xs md:text-sm text-gray-500">
                    {timeTexts[index % timeTexts.length]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {canShowMore && (
          <button
            onClick={handleShowMore}
            className="text-white text-sm font-semibold hover:text-gray-300 transition-colors mt-4"
          >
            <div className="flex gap-2 items-center">
              Show more <ChevronDown />
            </div>
          </button>
        )}
      </div>
    </>
  );
}

export default News;
