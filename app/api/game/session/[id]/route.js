import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  const { searchParams } = new URL(request.url);
  const discord_id = searchParams.get("discord_id");

  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/game/${id}?discord_id=${discord_id}`,
      {
        method: "GET",
      },
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);

      throw new Error(errorData?.detail || "Failed to fetch game session");
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching session:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
