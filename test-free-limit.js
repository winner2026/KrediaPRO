/**
 * Script de prueba para verificar el límite Free
 *
 * Simula dos análisis consecutivos con el mismo userId
 * para verificar que el segundo sea bloqueado.
 */

const TEST_USER_ID = 'test-user-' + Date.now();

async function testFreeLimitFlow() {
  console.log('🧪 TESTING FREE LIMIT FLOW');
  console.log('Test User ID:', TEST_USER_ID);
  console.log('');

  // Simular primer análisis
  console.log('📤 Primer análisis...');
  const firstAnalysis = await simulateAnalysis(TEST_USER_ID, 1);
  console.log('Result 1:', firstAnalysis.status, firstAnalysis.data?.error || 'SUCCESS');
  console.log('');

  // Simular segundo análisis (debe ser bloqueado)
  console.log('📤 Segundo análisis (debe fallar)...');
  const secondAnalysis = await simulateAnalysis(TEST_USER_ID, 2);
  console.log('Result 2:', secondAnalysis.status, secondAnalysis.data?.error || 'SUCCESS');
  console.log('');

  // Verificar resultado
  if (firstAnalysis.status === 200 && secondAnalysis.status === 403) {
    console.log('✅ TEST PASSED: Límite Free funciona correctamente');
    console.log('   - Primer análisis: permitido');
    console.log('   - Segundo análisis: bloqueado (403 FREE_LIMIT_REACHED)');
  } else {
    console.log('❌ TEST FAILED: Límite Free NO funciona');
    console.log('   - Primer análisis:', firstAnalysis.status);
    console.log('   - Segundo análisis:', secondAnalysis.status, '(esperado: 403)');
  }
}

async function simulateAnalysis(userId, attemptNumber) {
  try {
    // Crear un audio de prueba vacío
    const formData = new FormData();
    const blob = new Blob(['fake audio data'], { type: 'audio/webm' });
    formData.append('audio', blob, 'test.webm');
    formData.append('userId', userId);

    console.log(`  → Enviando análisis #${attemptNumber} para userId: ${userId}`);

    const response = await fetch('http://localhost:3000/api/analysis', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    return {
      status: response.status,
      data,
    };
  } catch (error) {
    console.error('Error en simulateAnalysis:', error);
    return {
      status: 500,
      data: { error: error.message },
    };
  }
}

// Ejecutar test
testFreeLimitFlow().catch(console.error);
