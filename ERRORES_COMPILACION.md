# 🔧 CAMBIOS PENDIENTES PARA COMPLETAR LA MIGRACIÓN

## ❌ Errores de Compilación Actuales

### 1. `app/listen/page.tsx`

**Problema:** Referencias a `protocol` que ya no existe (ahora es `protocolAccess.protocol`)

**Líneas a cambiar:**
- Línea 87: Eliminar referencia a `'COACHING'` (ya no existe)
- Líneas 123-137: Cambiar `protocol` por `protocolAccess?.protocol`

**Solución rápida:**
```typescript
// Línea 87 - Eliminar el caso de COACHING:
planType === 'PREMIUM' ? 'bg-blue-500/20...' :
planType === 'STARTER' ? 'bg-amber-500/20...' :
'bg-slate-800 border-slate-700 text-slate-500'

// Líneas 123-137 - Usar protocolAccess?.protocol en lugar de protocol:
{protocolAccess && (
  <div>
    <span>Día {protocolAccess.protocol.day}/30</span>
    <span>{protocolAccess.protocol.phase}</span>
    <h3>{protocolAccess.protocol.title}</h3>
    <p>"{protocolAccess.protocol.action}"</p>
    <span>{protocolAccess.protocol.science}</span>
  </div>
)}
```

---

## 📝 Archivos que Necesitan Actualización

### 2. `app/upgrade/page.tsx`
**Cambios necesarios:**
- Eliminar planes: VOICE_WEEKLY, VOICE_MONTHLY, COACHING
- Mostrar solo: FREE, STARTER, PREMIUM
- Actualizar precios y features
- Actualizar checkoutUrls

### 3. `app/api/analysis/route.ts`
**Cambios necesarios:**
- Actualizar mensajes de límite alcanzado
- Usar nuevos nombres de planes

### 4. `app/results/page.tsx`
**Cambios necesarios:**
- Actualizar feature gating para usar PLAN_CONFIGS
- Eliminar referencias a planes antiguos

### 5. `app/courses/page.tsx`
**Cambios necesarios:**
- Actualizar lógica de acceso a cursos
- Usar PLAN_CONFIGS en lugar de checks manuales

---

## ✅ Solución Rápida para Compilar

Para que compile ahora mismo, solo necesitas:

1. **Eliminar la línea 87 de `/app/listen/page.tsx`:**
```typescript
// ANTES:
planType === 'COACHING' ? 'bg-purple-500/20 border-purple-500/50 text-purple-400 shadow-purple-500/10' :

// DESPUÉS: (eliminar completamente esa línea)
```

2. **Comentar temporalmente las líneas 120-140 de `/app/listen/page.tsx`:**
```typescript
{/* TODO: Implementar UI del protocolo con paywall
{protocolAccess && (
  ...
)}
*/}
```

Esto permitirá que compile mientras implementamos el resto.

---

## 🎯 Prioridad de Implementación

1. **URGENTE:** Arreglar `app/listen/page.tsx` para que compile
2. **ALTA:** Actualizar `app/upgrade/page.tsx` (página clave de conversión)
3. **MEDIA:** Actualizar mensajes en `app/api/analysis/route.ts`
4. **BAJA:** Actualizar feature gating en otras páginas

---

## 💡 Recomendación

**Opción A (Rápida):**
- Comentar temporalmente el código del protocolo en `/listen`
- Hacer que compile
- Implementar el paywall del protocolo después

**Opción B (Completa):**
- Implementar toda la UI del paywall ahora
- Puede tomar 30-45 minutos más

¿Cuál prefieres?
