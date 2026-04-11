import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://www.gamerpower.com/api/giveaways?type=game"
    );

    const data = await res.json();

    console.log("SERVER DATA:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.log("SERVER ERROR:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}