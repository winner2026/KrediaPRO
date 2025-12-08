import "./globals.css";

export const metadata = {
  title: "Kredia Pro — Registro rápido de gastos",
  description: "MicroSaaS minimalista para registrar gastos en 3 segundos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "white",
          margin: 0,
        }}
      >
        {/* HEADER GLOBAL */}
        <header
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            background: "white",
            zIndex: 20,
          }}
        >
          <a
            href="/landing"
            style={{
              fontSize: 20,
              fontWeight: 700,
              textDecoration: "none",
              color: "black",
            }}
          >
            Kredia PRO
          </a>

          <nav style={{ display: "flex", gap: 16 }}>
            <a
              href="/"
              style={{
                textDecoration: "none",
                color: "black",
                opacity: 0.7,
                fontSize: 16,
              }}
            >
              Dashboard
            </a>

            <a
              href="/add"
              style={{
                textDecoration: "none",
                color: "black",
                opacity: 0.7,
                fontSize: 16,
              }}
            >
              Agregar
            </a>
          </nav>
        </header>

        {/* CONTENIDO */}
        <main>{children}</main>
      </body>
    </html>
  );
}
