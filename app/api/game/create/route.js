import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const res = await fetch(`${process.env.API_BASE_URL}/game/create`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);

      throw new Error(errorData?.detail || "Failed to start game");
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error starting game:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
