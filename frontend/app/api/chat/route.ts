import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function getLocalResponse(message: string): string {
  const text = message.toLowerCase();

  if (/hotel|stay|room|accommodation/.test(text)) {
    return "You can compare and book hotels through our Hotel booking page. Choose a destination and dates to view available stays.";
  }
  if (/transport|bus|train|taxi|car|airport|transfer/.test(text)) {
    return "For transport, open the Transport page to find buses, trains, cars with drivers, or airport transfers.";
  }
  if (/plan|itinerary|trip|destination|visit|place/.test(text)) {
    return "Start from the Traveler planning section: choose Sri Lanka as your destination, add the places you want to visit, then select hotels and transport.";
  }
  if (/booking|reservation|cancel|payment|card/.test(text)) {
    return "You can review, complete, update or cancel your bookings from the My Bookings page.";
  }
  if (/hello|hi|hey|good morning|good afternoon/.test(text)) {
    return "Hello! I can help with hotels, transport, trip planning and bookings.";
  }

  return "I can help with Sri Lanka hotels, transport, trip planning and booking questions. Please tell me what you need.";
}

export async function POST(request: Request) {
  const body = (await request.json()) as { messages?: ChatMessage[] };
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const latestMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!latestMessage?.content.trim()) {
    return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: getLocalResponse(latestMessage.content) });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              "You are Traveler Support, a friendly assistant for a Sri Lanka travel booking website. Help with hotels, transport, itineraries and booking questions. Be concise and direct users to the relevant website page. Do not claim that a booking or availability is confirmed unless the website confirmed it.",
          },
          ...messages.slice(-10).map((message) => ({
            role: message.role,
            content: message.content,
          })),
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "The AI assistant is temporarily unavailable. Please try again shortly." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const message = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      message: message || getLocalResponse(latestMessage.content),
    });
  } catch {
    return NextResponse.json(
      { message: "The AI assistant is temporarily unavailable. Please try again shortly." },
      { status: 502 },
    );
  }
}
