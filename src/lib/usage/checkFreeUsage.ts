/**
 * DEPRECATED: This file is kept for backward compatibility only
 * Use checkUsage.ts instead which handles all plan types
 */

import { checkUsage } from "./checkUsage";

export async function checkFreeUsage(userId: string) {
  return checkUsage(userId);
}
