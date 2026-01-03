-- Migration: Create Users Table
-- Description: Stores user profile data from Google Auth
-- Created at: 2026-01-02

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- Google sub ID
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  sessions_count INTEGER DEFAULT 0
);

-- Index for fast lookups by email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
