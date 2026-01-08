# Configuración de Lemon Squeezy

¡Excelente! La infraestructura básica para recibir pagos está lista. Aquí tienes los pasos finales para conectar tu cuenta de Lemon Squeezy.

## 1. Actualizar Enlaces de Checkout
En el archivo `app/upgrade/page.tsx`, debes reemplazar las URLs de ejemplo con tus "Checkout Links" reales de Lemon Squeezy.

Busca la constante `checkoutUrls` y actualiza los valores:

```typescript
const checkoutUrls: Record<string, string> = {
  STARTER: "https://tu-tienda.lemonsqueezy.com/checkout/buy/VARIANT_ID_VIDEO_START",
  PREMIUM: "https://tu-tienda.lemonsqueezy.com/checkout/buy/VARIANT_ID_ELITE",
  VOICE_WEEKLY: "https://tu-tienda.lemonsqueezy.com/checkout/buy/VARIANT_ID_VOZ_SEMANAL", 
  COACHING: "#" 
};
```

> **Tip:** En el Dashboard de Lemon Squeezy, ve a Products, selecciona tu producto y haz clic en "Share" para obtener el Checkout Link.

## 2. Configurar Webhook
Para que la aplicación sepa cuándo alguien paga, debes configurar un Webhook.

1. Ve a [Settings > Webhooks](https://app.lemonsqueezy.com/settings/webhooks) en Lemon Squeezy.
2. Crea un nuevo Webhook.
3. **URL:** `https://tu-dominio.com/api/webhooks/lemonsqueezy`
   - *Nota:* Si estás probando en local, necesitarás usar `ngrok` (ej. `https://1234.ngrok.io/api/webhooks/lemonsqueezy`).
4. **Secret:** Inventa una clave segura (ej. `mi_secreto_super_seguro_123`).
5. **Events:** Selecciona:
   - `subscription_created`
   - `subscription_updated`
   - `subscription_cancelled`
   - `subscription_expired`
   - `order_created` (si usas pagos únicos)

## 3. Variables de Entorno
Agrega el secreto que creaste en el paso anterior a tu archivo `.env`:

```env
LEMONSQUEEZY_WEBHOOK_SECRET=mi_secreto_super_seguro_123
```

## 4. Obtener Variant IDs (Opcional pero Recomendado)
Para una integración más robusta, en el archivo `app/api/webhooks/lemonsqueezy/route.ts`, actualiza `PLAN_VARIANT_MAP` con los IDs de variante de tus productos. Esto asegura que el plan correcto se asigne siempre.

---
**¡Listo!** Ahora cuando un usuario compre, se redirigirá a Lemon Squeezy, y al completar el pago, Lemon Squeezy avisará a tu app para actualizar el plan del usuario automáticamente.
