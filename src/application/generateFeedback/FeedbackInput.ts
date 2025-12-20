export interface FeedbackInput {
  authorityLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  strengths: string[]
  weaknesses: string[]
  priorityAdjustment: string
}
