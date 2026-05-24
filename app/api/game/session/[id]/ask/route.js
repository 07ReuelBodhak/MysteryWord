import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const { id } = await params;

  try {
    const body = await request.json();

    /*
      VALIDATION
    */

    if (!body.question || typeof body.question !== "string") {
      return NextResponse.json(
        {
          error: "Invalid question",
        },
        {
          status: 400,
        },
      );
    }

    /*
      FORWARD TO FASTAPI
    */

    const res = await fetch(`${process.env.API_BASE_URL}/game/${id}/question`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question: body.question,
      }),
    });

    /*
      FASTAPI ERROR
    */

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);

      return NextResponse.json(
        {
          error:
            errorData?.detail || errorData?.error || "Failed to ask question",
        },
        {
          status: res.status,
        },
      );
    }

    /*
      SUCCESS
    */

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("ASK QUESTION ERROR:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
