// app/api/games/wishlist/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { gameIds } = await request.json();
    
    if (!gameIds || gameIds.length === 0) {
      return NextResponse.json({ games: [] });
    }
    
    // Fetch games from your database
    // const games = await Game.find({ _id: { $in: gameIds } });
    
    // For now, using mock data
    const games = gameIds.map((id: string) => ({
      // Your game data here
      _id: id,
      // ... other fields
    }));
    
    return NextResponse.json({ games });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch wishlist games" },
      { status: 500 }
    );
  }
}