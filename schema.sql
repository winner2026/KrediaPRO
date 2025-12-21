-- Schema para Oratoria Efectiva
-- Base de datos: Neon PostgreSQL

-- ============================================
-- TABLA: voice_sessions
-- Responsabilidad: Guardar TODOS los resultados del análisis de voz
-- ============================================

CREATE TABLE IF NOT EXISTS voice_sessions (
  -- Identificación
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Transcripción
  transcription TEXT NOT NULL,
  transcription_with_silences TEXT NOT NULL,

  -- Métricas técnicas del audio
  words_per_minute INTEGER NOT NULL,
  avg_pause_duration DECIMAL(5,2) NOT NULL,
  pause_count INTEGER NOT NULL,
  filler_count INTEGER NOT NULL,
  pitch_variation DECIMAL(5,2) NOT NULL,
  energy_stability DECIMAL(5,2) NOT NULL,
  duration_seconds DECIMAL(6,2) NOT NULL,

  -- Score de autoridad
  authority_level TEXT NOT NULL CHECK (authority_level IN ('LOW', 'MEDIUM', 'HIGH')),
  authority_score INTEGER NOT NULL CHECK (authority_score >= 0 AND authority_score <= 100),
  strengths JSONB NOT NULL,           -- Array de strings
  weaknesses JSONB NOT NULL,          -- Array de strings
  priority_adjustment TEXT NOT NULL CHECK (
    priority_adjustment IN ('SLOW_DOWN', 'PAUSE_MORE', 'INCREASE_ENERGY', 'STABILIZE_PITCH')
  ),

  -- Feedback generado por GPT-4o-mini
  feedback_diagnostico TEXT NOT NULL,
  feedback_lo_que_suma JSONB NOT NULL,    -- Array de strings
  feedback_lo_que_resta JSONB NOT NULL,   -- Array de strings
  feedback_decision TEXT NOT NULL,
  feedback_payoff TEXT NOT NULL
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_voice_sessions_user_id ON voice_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_voice_sessions_created_at ON voice_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_voice_sessions_authority_level ON voice_sessions(authority_level);

-- ============================================
-- TABLA: users (para cuando implementes auth)
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  sessions_count INTEGER DEFAULT 0
);

-- ============================================
-- FUNCIONES AUXILIARES
-- ============================================

-- Función para obtener historial de un usuario
CREATE OR REPLACE FUNCTION get_user_history(p_user_id TEXT, p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
  session_id UUID,
  created_at TIMESTAMP WITH TIME ZONE,
  authority_level TEXT,
  authority_score INTEGER,
  transcription_preview TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    id,
    voice_sessions.created_at,
    voice_sessions.authority_level,
    voice_sessions.authority_score,
    LEFT(transcription, 100) || '...' as transcription_preview
  FROM voice_sessions
  WHERE user_id = p_user_id
  ORDER BY voice_sessions.created_at DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Función para obtener estadísticas de un usuario
CREATE OR REPLACE FUNCTION get_user_stats(p_user_id TEXT)
RETURNS TABLE (
  total_sessions INTEGER,
  avg_authority_score DECIMAL,
  high_sessions INTEGER,
  medium_sessions INTEGER,
  low_sessions INTEGER,
  avg_words_per_minute DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::INTEGER as total_sessions,
    ROUND(AVG(authority_score), 1) as avg_authority_score,
    COUNT(*) FILTER (WHERE authority_level = 'HIGH')::INTEGER as high_sessions,
    COUNT(*) FILTER (WHERE authority_level = 'MEDIUM')::INTEGER as medium_sessions,
    COUNT(*) FILTER (WHERE authority_level = 'LOW')::INTEGER as low_sessions,
    ROUND(AVG(words_per_minute), 1) as avg_words_per_minute
  FROM voice_sessions
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- DATOS DE EJEMPLO (para testing)
-- ============================================

-- Insertar un usuario anónimo de prueba
INSERT INTO users (id, email, subscription_tier)
VALUES ('anonymous', NULL, 'free')
ON CONFLICT (id) DO NOTHING;

-- Comentarios sobre la arquitectura de la base de datos:
--
-- 1. NO hay lógica de negocio en la base de datos
-- 2. NO hay triggers que calculen scoring
-- 3. Neon SOLO guarda lo que le llega desde saveVoiceAnalysis()
-- 4. Las funciones auxiliares son solo para consultas (lectura)
-- 5. Toda la lógica está en src/application/ y src/domain/
