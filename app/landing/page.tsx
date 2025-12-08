export default function LandingPage() {
  return (
    <div
      style={{
        padding: "60px 24px",
        maxWidth: 680,
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>
        Registro de Gastos en 3 Segundos
      </h1>

      <p style={{ fontSize: 20, lineHeight: "28px", opacity: 0.85 }}>
        La app de finanzas más rápida y minimalista.  
        Sin gráficos. Sin complicaciones.  
        Solo agrega tus gastos y listo.
      </p>

      <a
        href="/"
        style={{
          padding: "16px 24px",
          background: "black",
          color: "white",
          borderRadius: 12,
          fontSize: 18,
          fontWeight: 600,
          textDecoration: "none",
          width: "fit-content",
        }}
      >
        Ver demo
      </a>

      <p style={{ opacity: 0.6 }}>Versión MVP — En construcción.</p>
    </div>
  );
}
