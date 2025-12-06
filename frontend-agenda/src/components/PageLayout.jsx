// frontend-agenda/src/components/PageLayout.jsx
const PageLayout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        padding: "30px 20px",
        background: "linear-gradient(135deg, #ff9ae1, #7f5dff, #ffd36b)",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Contenedor central tipo tarjeta */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "rgba(5, 4, 25, 0.75)",
          borderRadius: "24px",
          padding: "24px 28px",
          boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
