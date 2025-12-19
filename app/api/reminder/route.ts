import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  const { email, dueDay, worry } = await req.json();

  if (!email || !dueDay || !worry) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await sql`
      insert into reminders (email, due_day, worry)
      values (${email}, ${dueDay}, ${worry});
    `;

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
