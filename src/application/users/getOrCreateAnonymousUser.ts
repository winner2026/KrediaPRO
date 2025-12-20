import { cookies } from "next/headers";
import { db } from "@/infrastructure/db/client";

const COOKIE_NAME = "anon_user_id";

export async function getOrCreateAnonymousUser() {
  const cookieStore = await cookies();
  let userId = cookieStore.get(COOKIE_NAME)?.value;

  if (!userId) {
    const result = await db.query(
      "insert into users default values returning id"
    );
    userId = result.rows[0].id;
    cookieStore.set(COOKIE_NAME, userId);
  }

  return userId;
}
