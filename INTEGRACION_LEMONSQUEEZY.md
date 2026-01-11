# 🔍 Estado de Integración con Lemon Squeezy

## ✅ **SÍ, la app está integrada con Lemon Squeezy**

### Archivos Existentes:
- ✅ `app/api/webhooks/lemonsqueezy/route.ts` - Webhook handler
- ✅ Schema de Prisma tiene campos de Lemon Squeezy:
  - `lemonSqueezyCustomerId`
  - `lemonSqueezySubscriptionId`
  - `subscriptionStatus`
  - `subscriptionRenewsAt`

---

## ⚠️ **PERO necesita actualización para el nuevo sistema de 3 planes**

### Problemas Actuales:

1. **Usa planes antiguos:**
   ```typescript
   // ACTUAL (incorrecto):
   let appPlan: "PREMIUM" | "VOICE_MONTHLY" | "STARTER" = "VOICE_MONTHLY";
   
   // DEBERÍA SER:
   let appPlan: "FREE" | "STARTER" | "PREMIUM" = "STARTER";
   ```

2. **Sistema de créditos obsoleto:**
   - El webhook suma créditos (`credits: { increment: 100 }`)
   - Pero el nuevo sistema usa límites mensuales, no créditos acumulativos

3. **Mapeo de productos desactualizado:**
   - Necesita mapear los 3 planes nuevos
   - Eliminar referencias a VOICE_WEEKLY, VOICE_MONTHLY, COACHING

---

## 🔧 **Cambios Necesarios**

### 1. Actualizar Webhook Handler

```typescript
// Nuevo mapeo de productos
const PRODUCT_TO_PLAN_MAP = {
  "Hábito de Alto Rendimiento": "STARTER",  // $12/mes
  "Sprint Intensivo": "STARTER",             // $9/semana (mapea a STARTER)
  "Presencia Ejecutiva": "PREMIUM"           // $29/mes
};

// Nuevo sistema: NO usar créditos, usar plan type
async function handleSubscriptionChange(userId: string | undefined, data: any) {
  const productName = (attributes.product_name || "").toLowerCase();
  
  let appPlan: "STARTER" | "PREMIUM" = "STARTER";
  
  if (productName.includes("ejecutiva") || productName.includes("elite") || productName.includes("premium")) {
    appPlan = "PREMIUM";
  } else {
    appPlan = "STARTER";
  }
  
  if (status === "active" || status === "on_trial") {
    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: appPlan,  // Solo actualizar plan, NO créditos
        lemonSqueezyCustomerId: customerId,
        lemonSqueezySubscriptionId: subscriptionId,
        subscriptionStatus: status,
        subscriptionRenewsAt: renewsAt,
      }
    });
    
    // IMPORTANTE: También actualizar/crear registro en Usage
    await prisma.usage.upsert({
      where: { userId },
      create: {
        userId,
        fingerprint: userId,
        planType: appPlan,
        monthStart: new Date()
      },
      update: {
        planType: appPlan,
        // Resetear contadores mensuales en renovación
        monthlyAnalyses: 0,
        monthStart: new Date()
      }
    });
  }
}
```

### 2. Actualizar `/upgrade` Page

Actualmente tiene checkout URLs para planes antiguos:

```typescript
// ACTUAL (líneas 18-23 de app/upgrade/page.tsx):
const checkoutUrls: Record<string, string> = {
  STARTER: "https://...", // Pro Semanal
  PREMIUM: "https://...", // Elite Mensual
  VOICE_WEEKLY: "https://...",
  VOICE_MONTHLY: "https://...",
};

// DEBERÍA SER:
const checkoutUrls: Record<string, string> = {
  STARTER: "https://oratoria-efectiva.lemonsqueezy.com/checkout/buy/[VARIANT_ID_STARTER]",
  PREMIUM: "https://oratoria-efectiva.lemonsqueezy.com/checkout/buy/[VARIANT_ID_PREMIUM]",
};
```

### 3. Configurar Productos en Lemon Squeezy

Necesitas crear/actualizar 2 productos:

#### **Producto 1: Hábito de Alto Rendimiento**
- Precio: $12/mes
- Tipo: Suscripción mensual
- Variant ID: [obtener de Lemon Squeezy]
- Custom data: `user_id={USER_ID}`

#### **Producto 2: Presencia Ejecutiva**
- Precio: $29/mes
- Tipo: Suscripción mensual
- Variant ID: [obtener de Lemon Squeezy]
- Custom data: `user_id={USER_ID}`

---

## 📋 **Checklist de Integración**

### Backend:
- [ ] Actualizar `app/api/webhooks/lemonsqueezy/route.ts`
  - [ ] Cambiar mapeo de planes (3 en lugar de 6)
  - [ ] Eliminar lógica de créditos
  - [ ] Actualizar tabla `Usage` en webhooks
  - [ ] Manejar reseteo mensual de contadores

### Frontend:
- [ ] Actualizar `app/upgrade/page.tsx`
  - [ ] Mostrar solo 2 planes pagos (STARTER, PREMIUM)
  - [ ] Actualizar checkout URLs con Variant IDs correctos
  - [ ] Eliminar referencias a planes antiguos

### Lemon Squeezy Dashboard:
- [ ] Crear/actualizar productos
- [ ] Obtener Variant IDs
- [ ] Configurar webhook URL: `https://tu-dominio.com/api/webhooks/lemonsqueezy`
- [ ] Configurar webhook secret en `.env`
- [ ] Activar eventos:
  - `subscription_created`
  - `subscription_updated`
  - `subscription_cancelled`
  - `subscription_expired`

### Testing:
- [ ] Test de compra STARTER
- [ ] Test de compra PREMIUM
- [ ] Test de renovación automática
- [ ] Test de cancelación
- [ ] Verificar que límites se aplican correctamente

---

## 🎯 **Respuesta Directa**

**¿Está apta para integrar con Squeezy?**

**Casi, pero necesita actualización:**

✅ **Tiene:** Webhook handler, campos en DB, estructura básica  
⚠️ **Falta:** Actualizar para 3 planes, eliminar sistema de créditos, configurar productos

**Tiempo estimado para completar:** 1-2 horas

---

## 💡 **Recomendación**

1. **Primero:** Actualiza el webhook handler (30 min)
2. **Segundo:** Actualiza `/upgrade` page (15 min)
3. **Tercero:** Configura productos en Lemon Squeezy (30 min)
4. **Cuarto:** Testing completo (30 min)

¿Quieres que implemente las actualizaciones del webhook ahora?
