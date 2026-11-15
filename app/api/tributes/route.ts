import { NextResponse } from "next/server";

let localTributes: any[] = [];

export async function GET() {
  return NextResponse.json(localTributes);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTribute = {
      ...body,
      id: body.id || `tr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: body.timestamp || Date.now(),
    };
    localTributes.unshift(newTribute);
    return NextResponse.json(newTribute);
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
