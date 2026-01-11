# Estructura de Modos de Análisis

## URLs Descriptivas

La aplicación ahora usa parámetros de URL descriptivos para diferenciar claramente los dos niveles de análisis:

### **Nivel 1: Solo Voz** 
**URL:** `/practice?mode=voice`

**Análisis incluido:**
- ✅ Transcripción completa
- ✅ Authority Score (0-100)
- ✅ Métricas Vocales Exhaustivas:
  - Velocidad (PPM)
  - Pausas Estratégicas / Silencios Incómodos
  - Estabilidad de Volumen
  - Variación Tonal
  - Detección de Muletillas
  - Repeticiones
  - Consistencia del Ritmo
  - Longitud de Frases
- ✅ Diagnóstico IA
- ✅ Reformulación del Mensaje (Nivel CEO)
- ✅ Plan Estratégico + Payoff

**Duración máxima:** 15 segundos (optimizado para tests rápidos)

---

### **Nivel 2: Voz + Video (Análisis Completo)**
**URL:** `/practice?mode=video`

**Análisis incluido:**
- ✅ **TODO lo del Nivel 1** (análisis de voz completo)
- ✅ **Métricas de Postura:**
  - Score de Postura (0-100)
  - Nivel de Hombros (balanced/uneven)
  - Posición de Cabeza (centered/tilted)
  - Porcentaje de Contacto Visual
  - Nivel de Gestos (low/optimal/excessive)
  - Indicadores de Nerviosismo (puños cerrados, manos ocultas, movimiento excesivo)
- ✅ **Métricas de Estatus Ejecutivo** (Exclusivas Elite/Premium):
  - Turtle Neck (postura adelantada)
  - Brazos Cruzados (bloqueo defensivo)
  - Manos Conectadas (torre de poder)

**Duración máxima:** 60 segundos

---

## Implementación Técnica

### Detección del Modo
```typescript
const mode = searchParams.get("mode");
const isVoiceOnly = mode === "voice";
const isVideoMode = mode === "video";
```

### Redirecciones Actualizadas
Todas las siguientes rutas ahora redirigen a `mode=video` por defecto:
- Landing page (`/`)
- Botón "Grabar otra vez" en `/results`
- Botones de "Nueva práctica" en `/my-sessions`
- Botones de navegación en `/history`
- Callback de autenticación con Google
- CTA "Probar análisis de video" en `/results`

### Redirecciones a `mode=voice`
- Botón "Test de Voz Flash" en `/listen`
- Feedback de "Más o menos" en `/sos/feedback`
- Planes que incluyen solo análisis de voz

---

## Ventajas de esta Estructura

1. **URLs Descriptivas:** Cualquiera que vea la URL sabe exactamente qué tipo de análisis está usando.
2. **Analytics Precisos:** Podemos trackear fácilmente cuántos usuarios usan cada modo.
3. **Compartir Enlaces:** Los usuarios pueden compartir links específicos a cada modo.
4. **SEO Friendly:** URLs semánticas mejoran el SEO.
5. **Debugging Simplificado:** Más fácil identificar problemas específicos de cada modo.

---

## Próximos Pasos (Opcional)

- [ ] Agregar un selector visual en `/practice` para cambiar entre modos
- [ ] Crear una página `/practice` sin parámetros que muestre ambas opciones
- [ ] Implementar deep linking para compartir resultados con el modo usado
