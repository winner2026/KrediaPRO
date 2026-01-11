# 🎯 Sistema de Gating del Protocolo de 30 Días - NOMENCLATURA OFICIAL

## ✅ Planes Oficiales de la Aplicación

Según `src/types/Plan.ts`, la app tiene **6 planes**:

```typescript
type PlanType = "FREE" | "STARTER" | "PREMIUM" | "COACHING" | "VOICE_WEEKLY" | "VOICE_MONTHLY";
```

### Nombres Comerciales (según `/upgrade`):

1. **FREE** - "Acceso Inicial" ($0)
2. **VOICE_MONTHLY** - "Hábito de Alto Rendimiento" ($12/mes) - Solo voz
3. **STARTER** - "Sprint Intensivo" ($9/semana) - Voz + Video
4. **PREMIUM** - "Presencia Ejecutiva" ($29/mes) - Elite completo
5. **VOICE_WEEKLY** - Voz semanal
6. **COACHING** - Coaching personalizado

---

## 📊 Mapeo Correcto: Planes → Acceso al Protocolo

### 3 Niveles de Acceso al Protocolo:

```typescript
PROTOCOL_LIMITS = {
  FREE: 7,           // Solo HARDWARE (Semana 1)
  VOICE_ONLY: 21,    // 3 semanas - Para planes de solo voz
  FULL_ACCESS: 30    // 4 semanas completas - Para planes con video
}
```

### Mapeo de Planes a Niveles:

| Plan Oficial | Nombre Comercial | Días Desbloqueados | Lógica |
|--------------|------------------|-------------------|--------|
| **FREE** | Acceso Inicial | **7 días** | Solo calibración física (HARDWARE) |
| **VOICE_WEEKLY** | Voz Semanal | **21 días** | Voz completa sin video |
| **VOICE_MONTHLY** | Hábito Alto Rendimiento | **21 días** | Voz completa sin video |
| **STARTER** | Sprint Intensivo | **30 días** | Voz + Video completo |
| **PREMIUM** | Presencia Ejecutiva | **30 días** | Voz + Video + Elite features |
| **COACHING** | Coaching | **30 días** | Acceso total |

---

## 🎯 Estrategia de Conversión Optimizada

### Path 1: FREE → VOICE_MONTHLY ($12/mes)
**Día 8 (después de completar HARDWARE):**
```
"¡Felicitaciones! Completaste la calibración física.

Desbloquea 14 días más de entrenamiento vocal:
✅ SOFTWARE: Dicción y velocidad
✅ SYSTEM: Estructuras de persuasión
✅ Eliminación de muletillas

Hábito de Alto Rendimiento - Solo $12/mes"
```

### Path 2: FREE → STARTER ($9/semana)
**Día 8 (alternativa con video):**
```
"¿Quieres el análisis completo?

Sprint Intensivo incluye:
✅ 30 días de protocolo completo
✅ Análisis de voz + video
✅ Feedback de postura y gestos

Solo $9/semana - Cancela cuando quieras"
```

### Path 3: VOICE_MONTHLY → STARTER/PREMIUM
**Día 22 (después de 3 semanas):**
```
"¡Increíble! Completaste 21 días de entrenamiento vocal.

Desbloquea la fase final COMBAT + Análisis de Video:
✅ 9 días de tácticas avanzadas
✅ Análisis de postura y gestos
✅ Métricas de presencia ejecutiva

Upgrade a Sprint Intensivo - $9/semana"
```

---

## 💡 Lógica de Upgrade Sugerido

```typescript
function getUpgradeSuggestion(currentPlan: string, currentDay: number): string {
  if (currentPlan === 'FREE') {
    if (currentDay <= 21) {
      return 'VOICE_MONTHLY'; // Más barato, suficiente para días 8-21
    } else {
      return 'STARTER'; // Necesita acceso completo
    }
  }
  
  if (currentPlan === 'VOICE_WEEKLY' || currentPlan === 'VOICE_MONTHLY') {
    return 'STARTER'; // Upgrade a voz + video
  }
  
  return 'PREMIUM'; // Fallback
}
```

---

## 🎨 Mensajes de Paywall por Plan

### Para FREE (Día 8):
```tsx
<div className="paywall">
  <h3>🎉 ¡Completaste la fase HARDWARE!</h3>
  <p>Tu cuerpo ya está calibrado. Elige tu siguiente paso:</p>
  
  <div className="options">
    {/* Opción 1: Solo Voz */}
    <button onClick={() => upgrade('VOICE_MONTHLY')}>
      <h4>Hábito de Alto Rendimiento</h4>
      <p>14 días más de entrenamiento vocal</p>
      <span>$12/mes</span>
    </button>
    
    {/* Opción 2: Voz + Video */}
    <button onClick={() => upgrade('STARTER')}>
      <h4>Sprint Intensivo</h4>
      <p>30 días completos + Análisis de video</p>
      <span>$9/semana</span>
    </button>
  </div>
</div>
```

### Para VOICE_MONTHLY (Día 22):
```tsx
<div className="paywall">
  <h3>🚀 Desbloqueaste 21 días de entrenamiento vocal</h3>
  <p>Completa tu transformación con análisis de video:</p>
  
  <button onClick={() => upgrade('STARTER')}>
    <h4>Sprint Intensivo</h4>
    <ul>
      <li>✅ 9 días finales (fase COMBAT)</li>
      <li>✅ Análisis de postura y gestos</li>
      <li>✅ Métricas de presencia ejecutiva</li>
    </ul>
    <span>$9/semana</span>
  </button>
</div>
```

---

## 📈 Proyección de Revenue

### Escenario: 1000 usuarios FREE

#### Antes (100% free):
- Conversión: ~5%
- Revenue: $600/mes

#### Después (Freemium inteligente):
- **Path 1 (FREE → VOICE_MONTHLY):** 15% × $12 = $1,800/mes
- **Path 2 (FREE → STARTER):** 8% × $36 = $2,880/mes
- **Path 3 (VOICE → STARTER):** 5% × $36 = $1,800/mes

**Total proyectado:** ~$6,480/mes (+980% incremento)

---

## ✅ Implementación Pendiente

### Archivo a modificar: `src/lib/tips/dailyTips.ts`

Reemplazar la función `getDailyProtocol` con:

```typescript
export function getProtocolTier(plan: string): 'FREE' | 'VOICE_ONLY' | 'FULL_ACCESS' {
  switch (plan) {
    case 'FREE':
      return 'FREE';
    case 'VOICE_WEEKLY':
    case 'VOICE_MONTHLY':
      return 'VOICE_ONLY';
    case 'STARTER':
    case 'PREMIUM':
    case 'COACHING':
      return 'FULL_ACCESS';
    default:
      return 'FREE';
  }
}

export function getDailyProtocol(userPlan: string = 'FREE', daysSinceStart?: number): ProtocolAccess {
  const currentDay = daysSinceStart ?? new Date().getDate();
  const protocolIndex = ((currentDay - 1) % THIRTY_DAY_PROTOCOL.length);
  const protocol = THIRTY_DAY_PROTOCOL[protocolIndex];
  
  const tier = getProtocolTier(userPlan);
  const limits = { FREE: 7, VOICE_ONLY: 21, FULL_ACCESS: 30 };
  const maxDay = limits[tier];
  const isLocked = currentDay > maxDay;
  
  let unlockPlan: string | undefined;
  if (isLocked) {
    if (tier === 'FREE') {
      unlockPlan = currentDay <= 21 ? 'Hábito de Alto Rendimiento' : 'Sprint Intensivo';
    } else if (tier === 'VOICE_ONLY') {
      unlockPlan = 'Sprint Intensivo';
    }
  }
  
  return {
    protocol,
    isLocked,
    unlockPlan,
    daysUntilUnlock: isLocked ? currentDay - maxDay : undefined,
    completionPercentage: Math.min(100, Math.round((currentDay / maxDay) * 100))
  };
}
```

---

## 🎯 Resumen

**Nomenclatura correcta:**
- ✅ FREE, STARTER, PREMIUM, COACHING, VOICE_WEEKLY, VOICE_MONTHLY
- ❌ ~~No usar "FREE", "STARTER", "PREMIUM" como únicos planes~~

**Niveles de acceso al protocolo:**
- 7 días: FREE
- 21 días: VOICE_WEEKLY, VOICE_MONTHLY
- 30 días: STARTER, PREMIUM, COACHING

**Estrategia de conversión:**
- FREE → VOICE_MONTHLY (más barato, solo voz)
- FREE → STARTER (más completo, voz + video)
- VOICE_MONTHLY → STARTER (upgrade a video)
