import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const bookingsFile = path.join(process.cwd(), ".data", "booking-requests.json");

type BookingRecord = {
  reference: string;
  status: string;
  date: string;
};

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ reference: string }> },
) {
  const { reference } = await params;
  const body = await request.json() as { status?: string; date?: string };

  await mkdir(path.dirname(bookingsFile), { recursive: true });

  let records: BookingRecord[] = [];
  try {
    records = JSON.parse(await readFile(bookingsFile, "utf8")) as BookingRecord[];
  } catch {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  const index = records.findIndex((record) => record.reference === reference);
  if (index < 0) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  if (body.status && ["confirmed", "cancelled"].includes(body.status)) {
    records[index].status = body.status;
  }
  if (body.date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
      return NextResponse.json({ error: "Invalid date." }, { status: 400 });
    }
    records[index].date = body.date;
  }

  await writeFile(bookingsFile, JSON.stringify(records, null, 2), "utf8");
  return NextResponse.json({ booking: records[index] });
}
