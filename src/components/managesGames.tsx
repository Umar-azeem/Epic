import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Eye, Trash2 } from "lucide-react";
import { useGameStore } from "../json/apiStore";
import { useStore } from "zustand";
import { json } from "stream/consumers";
type Props = {
  handleEdit: (game: any) => void;
  handleDelete: (id: string) => void;
};
function ManagesGames({ handleEdit, handleDelete }: Props) {
  const games = useGameStore((s) => s.games);
  const fetchGames = useGameStore((s) => s.fetchGames);
  useEffect(() => {
    fetchGames();
  }, [fetchGames]);
  console.log("panel", games);
  return (
    <>
      {games.map((game) => (
        <div
          key={game._id}
          className="flex gap-3 p-3 rounded-xl border border-gray-700 bg-gradient-to-r from-black to-gray-900"
        >
          {/* Image */}

          <div className="w-16 h-16 rounded-lg overflow-hidden bg-purple-600 flex-shrink-0">
            <img
              src={game.mainImage}
              alt={game.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-1">
            <h3 className="text-white font-semibold leading-tight">
              {game.title}
            </h3>

            <p className="text-xs text-gray-400 line-clamp-2">
              {game.description || "No description"}
            </p>

            

            {/* Tags */}
            <div className="flex gap-1 flex-wrap pt-1">
              {game.sectionType && (
                <span className="px-2 py-[2px] bg-purple-600 text-white text-[10px] rounded">
                  Featured
                </span>
              )}
              {game.isFree && (
                <span className="px-2 py-[2px] bg-yellow-600 text-black text-[10px] rounded">
                  FREE
                </span>
              )}
              <span className="px-2 py-[2px] bg-blue-600 text-white text-[10px] rounded">
                {game.gameType}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => handleEdit(game)}
            >
              <Eye size={16} />
            </Button>

            <Button
              size="icon"
              variant="destructive"
              onClick={() => handleDelete(game._id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
export default ManagesGames;
