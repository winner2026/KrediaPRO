import { db } from "@/infrastructure/db/client";

export async function saveVoiceSession(
  userId: string,
  authorityLevel: "LOW" | "MEDIUM" | "HIGH"
) {
  await db.query(
    `insert into voice_sessions (user_id, authority_level)
     values ($1, $2)`,
    [userId, authorityLevel]
  );
}
