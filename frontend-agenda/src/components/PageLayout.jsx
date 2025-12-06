// src/components/PageLayout.jsx
import { useAuth } from "../context/AuthContext.jsx";

function PageLayout({ tabs = [], activeTab, onChangeTab, children }) {
  const { user, logout } = useAuth();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #3d2b93 0, #120826 40%, #05010b 100%)",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(6, 6, 24, 0.95)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "1.4rem" }}>Agenda Inteligente</h1>
          {user && (
            <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>
              Sesión: {user.nombre || "Demo"} ({user.rol})
            </span>
          )}
        </div>

        {user && (
          <button
            onClick={logout}
            style={{
              border: "none",
              padding: "8px 18px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #ff6bd5, #ffb347)",
              color: "#1a0935",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        )}
      </header>

      {/* BARRA DE TABS */}
      {tabs.length > 0 && (
        <nav
          style={{
            margin: "14px 24px 0",
            padding: "10px 14px",
            borderRadius: "999px",
            background: "rgba(10, 8, 40, 0.95)",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            fontSize: "0.85rem",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              style={{
                border: "none",
                padding: "6px 14px",
                borderRadius: "999px",
                cursor: "pointer",
                background:
                  activeTab === tab.id
                    ? "linear-gradient(90deg, #ff6bd5, #ffb347)"
                    : "rgba(255,255,255,0.05)",
                color: activeTab === tab.id ? "#1a0935" : "#f5f5ff",
                fontWeight: activeTab === tab.id ? "bold" : "normal",
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )}

      {/* CONTENIDO */}
      <main style={{ padding: "20px 28px 32px" }}>{children}</main>
    </div>
  );
}

export default PageLayout;
