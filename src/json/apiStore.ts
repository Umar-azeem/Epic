import { create } from "zustand";

const API_URL = "https://epic-backend-fslq.vercel.app/api/games";

interface Game {
  _id: string;
  title: string;
  description: string;
  currentPrice: number;
}

interface GameStore {
  games: Game[];
  loading: boolean;
  fetchGames: () => Promise<void>;
  addGames: (data: Game[]) => void;        // kept for backwards‑compatibility
}

export const useGameStore = create<GameStore>((set) => ({
  games: [],
  loading: false,

  // fetch helper that can be called from any component
  fetchGames: async () => {
    set({ loading: true });
    try {
      const res = await fetch(API_URL);
      const data: Game[] = await res.json();
      // console.log(data)
      set({ games: data });
    } catch (err) {
      console.error("failed to fetch games", err);
      set({ games: [] });
    } finally {
      set({ loading: false });
    }
  },

  // if you still want to push arbitrary arrays in
  addGames: (data) => set({ games: data }),
}));