import { useNavigate } from "react-router-dom";

export default function GetStartedPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "#f8f8f8",
      gap: "12px"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>Welcome to Portfolio Builder</h1>
      <p style={{ color: "#555", marginBottom: "24px" }}>
        Build and share your professional portfolio in minutes.
      </p>
      <button
        onClick={() => navigate("/portfolio")}
        style={{
          background: "#1e1e2e",
          color: "#cba6f7",
          border: "none",
          padding: "12px 32px",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Create my portfolio
      </button>
    </div>
  );
}