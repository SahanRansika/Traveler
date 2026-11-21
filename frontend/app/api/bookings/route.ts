import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getBooking, type BookingCategory } from "@/lib/bookings";

const dataDirectory = path.join(process.cwd(), ".data");
const bookingsFile = path.join(dataDirectory, "booking-requests.json");

type BookingRequest = {
  name: string;
  email: string;
  phone: string;
  date: string;
  quantity: number;
  notes?: string;
};

export async function GET() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    const records = JSON.parse(await readFile(bookingsFile, "utf8")) as unknown[];
    return NextResponse.json({ bookings: records });
  } catch {
    return NextResponse.json({ bookings: [] });
  }
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const body = payload as Partial<BookingRequest & {
    category: string;
    bookingId: string;
  }>;

  const categories: BookingCategory[] = ["hotel", "transport", "travel"];
  if (!body.category || !categories.includes(body.category as BookingCategory) || !body.bookingId) {
    return NextResponse.json({ error: "Invalid booking." }, { status: 400 });
  }

  const booking = getBooking(body.category as BookingCategory, body.bookingId);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const date = typeof body.date === "string" ? body.date.trim() : "";
  const quantity = typeof body.quantity === "number" ? body.quantity : 0;
  const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 500) : "";

  if (
    name.length < 2 ||
    name.length > 80 ||
    email.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    phone.length < 7 ||
    phone.length > 25 ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 20
  ) {
    return NextResponse.json({ error: "Please check your booking details." }, { status: 400 });
  }

  await mkdir(dataDirectory, { recursive: true });

  let requests: unknown[] = [];
  try {
    requests = JSON.parse(await readFile(bookingsFile, "utf8")) as unknown[];
  } catch {
    requests = [];
  }

  const reference = `TRV-${randomUUID().slice(0, 8).toUpperCase()}`;
  const requestRecord = {
    reference,
    status: "pending",
    createdAt: new Date().toISOString(),
    category: body.category,
    bookingId: body.bookingId,
    bookingName: booking.name,
    name,
    email,
    phone,
    date,
    quantity,
    notes,
  };

  await writeFile(bookingsFile, JSON.stringify([...requests, requestRecord], null, 2), "utf8");

  return NextResponse.json({
    reference,
    status: "pending",
  }, { status: 201 });
}
