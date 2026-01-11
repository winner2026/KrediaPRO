export const CATEGORY_LABELS: Record<string, string> = {
  'ALL': 'Todos',
  'BREATHING': 'Respiración',
  'ARTICULATION': 'Articulación',
  'INTONATION': 'Entonación',
  'MINDSET': 'Mentalidad',
  'IMPROVISATION': 'Improvisación',
  'PROJECTION': 'Proyección',
  'RELAXATION': 'Relajación',
  'VOCABULARY': 'Vocabulario'
};

export const getCategoryLabel = (cat: string) => CATEGORY_LABELS[cat] || cat;
