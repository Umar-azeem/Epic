// src/components/WishlistButton.tsx
"use client";

import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function WishlistButton({ gameId, gameData }: { gameId: string; gameData: any }) {
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // ✅ Fix: Save correct wishlist path
      localStorage.setItem("redirectAfterLogin", "/home/wishList");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const gameDataToSend = {
        title: gameData.title,
        price: gameData.price || gameData.currentPrice || 0,
        image: gameData.image || gameData.mainImage || "",
        description: gameData.description || "",
        category: gameData.category || "",
        discount: gameData.discount || 0,
        originalPrice: gameData.originalPrice || 0,
        currentPrice: gameData.currentPrice || 0,
        _id: gameData._id || gameId,
      };

      const res = await fetch(
        "https://epic-backend-fslq.vercel.app/api/users/wishlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ gameId, gameData: gameDataToSend }),
        }
      );

      if (res.ok) {
        setAdded(true);
        // ✅ Fix: Redirect to correct wishlist page
        router.push("/home/wishList");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || added}
      className="bg-black/50 hover:bg-purple-600 p-2 rounded-full transition"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <Heart size={16} className={added ? "fill-red-500 text-red-500" : "text-white"} />
      )}
    </button>
  );
}