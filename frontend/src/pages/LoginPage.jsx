import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/get-started");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f4f4f4" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#fff", padding: "32px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <h1 style={{ marginBottom: "8px" }}>Login</h1>
        <p style={{ marginBottom: "24px", color: "#666" }}>Sign in to continue</p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "12px", border: "none", borderRadius: "8px", background: "#111", color: "#fff", cursor: "pointer" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Don’t have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;