/**
 * User fingerprinting for Free tier identification - MVP
 *
 * ESTRATEGIA SIMPLE:
 * - Combina IP + User-Agent
 * - Hashea para crear user_id único
 * - Suficiente para MVP, no necesitas biometría ni cookies complejas
 *
 * Fuentes:
 * - x-forwarded-for (IP desde Vercel/proxy)
 * - user-agent (navegador + OS)
 *
 * Para Premium: se reemplazará con auth real
 */

/**
 * Simple hash function for fingerprinting
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

export function getUserFingerprint(req: Request): string {
  // Get IP from headers
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0] || realIp || "unknown-ip";

  // Get User-Agent
  const userAgent = req.headers.get("user-agent") || "unknown-ua";

  // Combine and hash
  const raw = `${ip}:${userAgent}`;
  const fingerprint = `fp_${simpleHash(raw)}`;

  return fingerprint;
}

/**
 * Get userId from client (localStorage UUID)
 * Preferred method: more stable than IP-based fingerprinting
 */
export function getUserIdFromClient(formData: FormData): string | null {
  return formData.get("userId") as string | null;
}
