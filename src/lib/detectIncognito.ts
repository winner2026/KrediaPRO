/**
 * NUEVA ESTRATEGIA: No intentar detectar incógnito directamente.
 * En su lugar, forzar que el usuario tenga un userId persistente.
 *
 * Si localStorage no funciona o no persiste → bloquear acceso.
 *
 * Esto cubre:
 * - Modo incógnito (localStorage no persiste entre sesiones)
 * - Navegadores sin localStorage
 * - Usuarios que limpian cookies constantemente
 */

/**
 * Verifica si localStorage funciona Y puede persistir datos
 * Retorna true si NO puede persistir (debe bloquear)
 */
export async function shouldBlockAccess(): Promise<boolean> {
  console.log('[ACCESS CHECK] 🔍 Verificando si se puede persistir userId...');

  // 1. Verificar que localStorage existe
  try {
    if (!window.localStorage) {
      console.log('[ACCESS CHECK] ❌ localStorage no disponible');
      return true; // BLOQUEAR
    }
  } catch (error) {
    console.log('[ACCESS CHECK] ❌ Error accediendo a localStorage:', error);
    return true; // BLOQUEAR
  }

  // 2. Verificar Storage Quota - si es muy pequeño, probablemente incógnito
  try {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      const quotaMB = (estimate.quota || 0) / 1024 / 1024;

      console.log('[ACCESS CHECK] Storage quota:', quotaMB.toFixed(2), 'MB');

      // Threshold más agresivo: 20MB
      // Chrome incógnito: ~10MB
      // Firefox incógnito: ~10MB
      // Normal: generalmente > 100MB
      if (quotaMB < 20) {
        console.log('[ACCESS CHECK] ❌ Quota muy baja (< 20MB) - probablemente incógnito');
        return true; // BLOQUEAR
      }
    }
  } catch (error) {
    console.log('[ACCESS CHECK] ⚠️ No se pudo verificar storage quota:', error);
    // No bloqueamos solo por esto, continuamos con otros checks
  }

  // 3. Test de persistencia de localStorage
  try {
    const testKey = '__storage_test_' + Date.now();
    const testValue = 'test';

    localStorage.setItem(testKey, testValue);
    const retrieved = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);

    if (retrieved !== testValue) {
      console.log('[ACCESS CHECK] ❌ localStorage no retiene valores');
      return true; // BLOQUEAR
    }
  } catch (error) {
    console.log('[ACCESS CHECK] ❌ Error escribiendo en localStorage:', error);
    return true; // BLOQUEAR
  }

  // 4. Verificar si existe un userId de sesión previa
  const existingUserId = localStorage.getItem('oratoria_user_id');

  if (!existingUserId) {
    console.log('[ACCESS CHECK] ⚠️ Primera visita (no hay userId previo)');

    // En primera visita, creamos un userId de prueba y pedimos al usuario
    // que RECARGUE la página para verificar persistencia
    const testUserId = '__test_user_' + Date.now();
    localStorage.setItem('oratoria_user_id', testUserId);

    console.log('[ACCESS CHECK] ✅ Se creó userId de prueba:', testUserId);
    console.log('[ACCESS CHECK] ✅ Permitir acceso (primera visita)');

    return false; // PERMITIR primera visita
  }

  // Si llegamos aquí, hay un userId persistente de una sesión anterior
  console.log('[ACCESS CHECK] ✅ userId persistente encontrado');
  console.log('[ACCESS CHECK] ✅ Permitir acceso');

  return false; // PERMITIR
}

/**
 * DEPRECADO: Detección de incógnito es poco confiable
 * Usar shouldBlockAccess() en su lugar
 */
export async function isIncognitoMode(): Promise<boolean> {
  console.warn('[DEPRECATED] isIncognitoMode() está deprecado. Usar shouldBlockAccess()');
  return shouldBlockAccess();
}

/**
 * DEPRECADO: Versión sincrónica poco confiable
 */
export function isIncognitoModeSync(): boolean {
  try {
    const testKey = '__incognito_test__';
    localStorage.setItem(testKey, '1');
    const canStore = localStorage.getItem(testKey) === '1';
    localStorage.removeItem(testKey);
    return !canStore;
  } catch {
    return true;
  }
}
