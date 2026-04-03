import { useEffect, useState } from "react";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load users");
        }

        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>User Management</h1>

      <div
        style={{
          overflowX: "auto",
          background: "#fff",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px",
                  borderBottom: "1px solid #ddd"
                }}
              >
                Username
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px",
                  borderBottom: "1px solid #ddd"
                }}
              >
                Email
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px",
                  borderBottom: "1px solid #ddd"
                }}
              >
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #eee"
                  }}
                >
                  {user.username}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #eee"
                  }}
                >
                  {user.email}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #eee"
                  }}
                >
                  {user.role || "user"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}