import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const { id } = await params;

    const body = await request.json();

    // Validate guess
    if (!body.guess || typeof body.guess !== "string") {
      return NextResponse.json({ error: "Invalid guess" }, { status: 400 });
    }

    // Send request to FastAPI backend
    const res = await fetch(`${process.env.API_BASE_URL}/game/${id}/guess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guess: body.guess,
      }),
    });

    // Backend failed
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);

      return NextResponse.json(
        {
          error: errorData?.detail || "Failed to submit guess",
        },
        {
          status: res.status,
        },
      );
    }

    // Backend success
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Submit guess error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
