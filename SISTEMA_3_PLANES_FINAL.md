# 🎯 SISTEMA FINAL DE PLANES - IMPLEMENTACIÓN COMPLETA

## ✅ Estructura de 3 Planes Aprobada

```typescript
FREE:     $0      → 3 análisis totales + 7 días protocolo
STARTER:  $12/mes → 100 análisis/mes + 21 días protocolo (solo voz)
PREMIUM:  $29/mes → 250 análisis/mes + 30 días protocolo (voz + video)
```

---

## 📊 Análisis de Márgenes

### Costos por Análisis:
- Whisper API: ~$0.006/min
- GPT-4o-mini: ~$0.002/análisis
- **Total: ~$0.01/análisis**

### Márgenes por Plan:

| Plan | Precio | Límite | Uso Promedio | Costo | Margen | % |
|------|--------|--------|--------------|-------|--------|---|
| FREE | $0 | 3 | 3 | $0.03 | -$0.03 | Loss leader |
| STARTER | $12 | 100 | 50 | $0.50 | $11.50 | 96% |
| PREMIUM | $29 | 250 | 150 | $1.50 | $27.50 | 95% |

### Peor Caso (Uso Máximo):

| Plan | Precio | Límite | Costo Máximo | Margen Mínimo | % |
|------|--------|--------|--------------|---------------|---|
| STARTER | $12 | 100 | $1.00 | $11.00 | 92% |
| PREMIUM | $29 | 250 | $2.50 | $26.50 | 91% |

**Conclusión:** Márgenes excelentes incluso en peor escenario.

---

## 🎯 Protocolo de 30 Días - Gating

### Acceso por Plan:

| Plan | Días Desbloqueados | Fases |
|------|-------------------|-------|
| FREE | 7 | HARDWARE |
| STARTER | 21 | HARDWARE + SOFTWARE + SYSTEM |
| PREMIUM | 30 | HARDWARE + SOFTWARE + SYSTEM + COMBAT |

### Mensajes de Upgrade:

**FREE → STARTER (Día 8):**
```
"¡Felicitaciones! Completaste la calibración física (HARDWARE).

Desbloquea 14 días más de entrenamiento:
✅ SOFTWARE: Dicción y velocidad
✅ SYSTEM: Estructuras de persuasión
✅ 100 análisis de voz por mes

Hábito de Alto Rendimiento - $12/mes"
```

**STARTER → PREMIUM (Día 22):**
```
"¡Increíble progreso! Completaste 21 días.

Desbloquea la fase final + Análisis de Video:
✅ COMBAT: 9 días de tácticas avanzadas
✅ Análisis de postura y gestos
✅ 250 análisis/mes (voz + video)

Presencia Ejecutiva - $29/mes"
```

---

## 💻 Implementación Técnica

### 1. Actualizar `src/types/Plan.ts`

```typescript
/**
 * Plan types - SIMPLIFIED TO 3 TIERS
 */
export type PlanType = "FREE" | "STARTER" | "PREMIUM";

export type PlanFeatures = {
  // Análisis limits
  maxAnalysesTotal: number;      // -1 = no total limit
  maxAnalysesPerMonth: number;   // -1 = unlimited (deprecated)
  
  // Protocolo access
  protocolDays: number;          // 7, 21, or 30
  
  // Features
  hasVideoAnalysis: boolean;
  hasSpectralAnalysis: boolean;  // Elite metrics (nasality, brightness, depth)
  hasPostureMetrics: boolean;    // Executive status metrics
  hasCourses: boolean;
  hasHistory: boolean;
  hasReRecord: boolean;
};

export const PLAN_CONFIGS: Record<PlanType, PlanFeatures> = {
  FREE: {
    maxAnalysesTotal: 3,
    maxAnalysesPerMonth: -1,
    protocolDays: 7,
    hasVideoAnalysis: false,
    hasSpectralAnalysis: false,
    hasPostureMetrics: false,
    hasCourses: false,
    hasHistory: true,
    hasReRecord: false
  },
  STARTER: {
    maxAnalysesTotal: -1,
    maxAnalysesPerMonth: 100,
    protocolDays: 21,
    hasVideoAnalysis: false,
    hasSpectralAnalysis: false,
    hasPostureMetrics: false,
    hasCourses: true,
    hasHistory: true,
    hasReRecord: true
  },
  PREMIUM: {
    maxAnalysesTotal: -1,
    maxAnalysesPerMonth: 250,
    protocolDays: 30,
    hasVideoAnalysis: true,
    hasSpectralAnalysis: true,
    hasPostureMetrics: true,
    hasCourses: true,
    hasHistory: true,
    hasReRecord: true
  }
};
```

### 2. Actualizar `src/lib/usage/checkUsage.ts`

```typescript
import { PlanType, PLAN_CONFIGS } from '@/types/Plan';

export async function checkUsage(fingerprint: string): Promise<UsageCheckResult> {
  try {
    const plan = await getUserPlan(fingerprint);
    const config = PLAN_CONFIGS[plan as PlanType] || PLAN_CONFIGS.FREE;
    
    // Check total limit (for FREE)
    if (config.maxAnalysesTotal !== -1) {
      const totalUsage = await prisma.voiceSession.count({
        where: { userId: fingerprint }
      });
      
      if (totalUsage >= config.maxAnalysesTotal) {
        return {
          allowed: false,
          reason: 'FREE_LIMIT_REACHED',
          currentUsage: totalUsage,
          maxAllowed: config.maxAnalysesTotal
        };
      }
    }
    
    // Check monthly limit (for STARTER/PREMIUM)
    if (config.maxAnalysesPerMonth !== -1) {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      
      const monthlyUsage = await prisma.voiceSession.count({
        where: {
          userId: fingerprint,
          createdAt: { gte: startOfMonth }
        }
      });
      
      if (monthlyUsage >= config.maxAnalysesPerMonth) {
        return {
          allowed: false,
          reason: plan === 'STARTER' ? 'STARTER_LIMIT_REACHED' : 'PREMIUM_LIMIT_REACHED',
          currentUsage: monthlyUsage,
          maxAllowed: config.maxAnalysesPerMonth,
          resetsAt: getNextMonthStart()
        };
      }
    }
    
    return { allowed: true };
  } catch (error) {
    console.error('[checkUsage] Error:', error);
    return { allowed: true }; // Fail-open
  }
}
```

### 3. Actualizar `src/lib/tips/dailyTips.ts`

```typescript
import { PlanType, PLAN_CONFIGS } from '@/types/Plan';

export interface ProtocolAccess {
  protocol: DailyProtocol;
  isLocked: boolean;
  unlockPlan?: string;
  daysUntilUnlock?: number;
  completionPercentage: number;
}

export function getDailyProtocol(
  userPlan: PlanType = 'FREE',
  daysSinceStart?: number
): ProtocolAccess {
  const currentDay = daysSinceStart ?? new Date().getDate();
  const protocolIndex = ((currentDay - 1) % THIRTY_DAY_PROTOCOL.length);
  const protocol = THIRTY_DAY_PROTOCOL[protocolIndex];
  
  const config = PLAN_CONFIGS[userPlan];
  const maxDay = config.protocolDays;
  const isLocked = currentDay > maxDay;
  
  let unlockPlan: string | undefined;
  if (isLocked) {
    if (userPlan === 'FREE') {
      unlockPlan = currentDay <= 21 ? 'STARTER' : 'PREMIUM';
    } else if (userPlan === 'STARTER') {
      unlockPlan = 'PREMIUM';
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

## 🎨 UI Messages

### Límites Alcanzados:

**STARTER (100/mes):**
```
"¡Has usado tus 100 análisis de este mes! 🎉

Esto significa que estás entrenando intensivamente.

Tu límite se resetea el 1° de [mes siguiente].

¿Necesitas más? Upgrade a Premium para 250 análisis/mes + análisis de video."
```

**PREMIUM (250/mes):**
```
"Has alcanzado el límite de uso justo de 250 análisis este mes.

Esto es excepcional - estás en el top 1% de usuarios más dedicados.

Tu límite se resetea el 1° de [mes siguiente].

¿Necesitas más de 250/mes? Contáctanos para un plan enterprise."
```

---

## 📈 Proyección de Revenue

### Escenario: 1000 usuarios FREE

**Conversión esperada:**
- FREE → STARTER: 20% (200 usuarios × $12) = $2,400/mes
- FREE → PREMIUM: 5% (50 usuarios × $29) = $1,450/mes
- STARTER → PREMIUM: 10% (20 usuarios × $29) = $580/mes

**Total: $4,430/mes**

**Costos:**
- STARTER: 200 × 50 análisis × $0.01 = $100
- PREMIUM: 70 × 150 análisis × $0.01 = $105

**Margen: $4,225 (95%)**

---

## ✅ Checklist de Implementación

- [ ] Actualizar `src/types/Plan.ts` con 3 planes
- [ ] Actualizar `src/lib/usage/checkUsage.ts` con nuevos límites
- [ ] Actualizar `src/lib/tips/dailyTips.ts` con gating por plan
- [ ] Actualizar `app/upgrade/page.tsx` con 3 opciones
- [ ] Actualizar mensajes de límite en `app/api/analysis/route.ts`
- [ ] Migrar usuarios existentes de planes antiguos
- [ ] Testing completo de flujos

---

## 🎯 Resumen Ejecutivo

**3 Planes Simples:**
- FREE: 3 análisis + 7 días protocolo
- STARTER: 100/mes + 21 días protocolo ($12)
- PREMIUM: 250/mes + 30 días protocolo ($29)

**Márgenes:**
- 91-96% en todos los planes
- Costos predecibles
- Escalable

**Conversión:**
- Mensaje claro
- Sin paradoja de elección
- Path de upgrade natural
