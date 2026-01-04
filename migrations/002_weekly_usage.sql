-- Migration: Add weekly usage tracking
-- Run this on your NeonDB database

-- Add weekly_analyses column if not exists
ALTER TABLE usage 
ADD COLUMN IF NOT EXISTS weekly_analyses INTEGER DEFAULT 0;

-- Add week_start column if not exists  
ALTER TABLE usage 
ADD COLUMN IF NOT EXISTS week_start TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing rows to have current week start
UPDATE usage 
SET week_start = date_trunc('week', NOW() + interval '1 day') - interval '1 day'
WHERE week_start IS NULL;

-- Create index for efficient weekly queries
CREATE INDEX IF NOT EXISTS idx_usage_week_start ON usage(week_start);

-- Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'usage';
