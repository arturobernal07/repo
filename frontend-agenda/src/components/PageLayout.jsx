function PageLayout({ children, usuario, onLogout }) {
  return (
    <div style={{ padding: "20px", color: "white" }}>
      
      <header 
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h2>Agenda Inteligente</h2>

        <div>
          <span style={{ marginRight: "10px" }}>
            {usuario.nombre} ({usuario.rol})
          </span>

          <button
            onClick={onLogout}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
              background: "linear-gradient(90deg, #ff6bd5, #ffb347)",
              color: "#1a0935",
              fontWeight: "bold"
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main style={{ marginTop: "20px" }}>
        {children}
      </main>

    </div>
  );
}

export default PageLayout;
