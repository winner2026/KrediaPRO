-- Migration: Create usage tracking table for Free/Premium plans
-- This table tracks how many analyses each user has performed

CREATE TABLE IF NOT EXISTS usage (
  user_id TEXT PRIMARY KEY,
  total_analyses INTEGER NOT NULL DEFAULT 0,
  plan_type TEXT NOT NULL DEFAULT 'FREE' CHECK (plan_type IN ('FREE', 'PREMIUM')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index for faster lookups by plan type
CREATE INDEX IF NOT EXISTS idx_usage_plan_type ON usage(plan_type);

-- Index for faster lookups by created_at (for analytics)
CREATE INDEX IF NOT EXISTS idx_usage_created_at ON usage(created_at);

-- Comments for documentation
COMMENT ON TABLE usage IS 'Tracks usage and plan information for each user';
COMMENT ON COLUMN usage.user_id IS 'Unique identifier for user (fingerprint for Free, auth ID for Premium)';
COMMENT ON COLUMN usage.total_analyses IS 'Total number of voice analyses performed by this user';
COMMENT ON COLUMN usage.plan_type IS 'Plan type: FREE (1 analysis limit) or PREMIUM (unlimited)';
COMMENT ON COLUMN usage.created_at IS 'When the user first used the app';
COMMENT ON COLUMN usage.updated_at IS 'Last time the user performed an analysis';
