export type AuthorityLevel = "LOW" | "MEDIUM" | "HIGH";
export type PriorityAdjustment =
  | "SLOW_DOWN"
  | "PAUSE_MORE"
  | "INCREASE_ENERGY"
  | "STABILIZE_PITCH";

export interface AuthorityScore {
  level: AuthorityLevel;
  strengths: string[];
  weaknesses: string[];
  priorityAdjustment: PriorityAdjustment;
  score: number;
}
