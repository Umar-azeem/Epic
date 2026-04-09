import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface SectionColumnProps {
  data: any[];
  sectionkey?: string;
}

export default function SectionColumn({
  data,
  sectionkey,
}: SectionColumnProps) {
  if (data.length === 0) return null;

  const games = data.slice(0, 6);

  return (
    <div className="py-4 px-4">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold">{sectionkey}</h2>
        <ChevronRight size={22} />
      </div>
      {games.map((game) => (
        <div
          key={game._id}
          className="flex gap-3 p-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
        >
          <Image
            src={game.image || game.mainImage}
            alt={game.title}
            width={64}
            height={80}
            className="rounded w-12 h-16 object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-sm truncate">{game.title}</h4>
            <p className="text-gray-400 text-xs">Base Game {JSON.stringify(game.sectionkey)}</p>
            {game.priceType === "paid" && (
              <span className="font-semibold text-sm mt-1 block">
                ${game.currentPrice}
              </span>
            )}
             {game.priceType === "freemium" &&  (
              <span className="font-semibold text-sm text-gray-500 mt-1 block">
                {game.availableDate ? `Available on ${new Date(game.availableDate).toLocaleDateString()}` : "Coming Soon"}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}