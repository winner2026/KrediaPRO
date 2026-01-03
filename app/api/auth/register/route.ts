
import { NextResponse } from "next/server";
import { db } from "@/infrastructure/db/client";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    // Create user
    await db.query(
      `INSERT INTO users (id, email, name, password_hash, created_at, last_login)
       VALUES ($1, $2, $3, $4, NOW(), NOW())`,
      [userId, email, name || email.split("@")[0], hashedPassword]
    );

    return NextResponse.json({ success: true, userId });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error al registrar usuario" },
      { status: 500 }
    );
  }
}
