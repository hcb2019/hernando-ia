import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log estruturado pro Vercel Logs
    console.log(
      JSON.stringify({
        source: "web-vitals",
        ...body,
      })
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
