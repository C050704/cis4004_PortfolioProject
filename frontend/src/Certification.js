import React, { useEffect, useState } from "react";
import axios from "axios";

const CertificationPage = () => {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    date: "",
    description: "",
  });

  const username = "testuser";

  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchCerts = async () => {
    try {
      const res = await axios.get("/api/certifications");
      setCerts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/certifications", {
        ...form,
        username,
      });

      setForm({
        title: "",
        issuer: "",
        date: "",
        description: "",
      });

      fetchCerts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Certifications</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={form.title}
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          value={form.issuer}
          placeholder="Issuer"
          onChange={(e) => setForm({ ...form, issuer: e.target.value })}
        />
        <input
          value={form.date}
          type="date"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          value={form.description}
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button type="submit">Add</button>
      </form>

      <ul>
        {certs.map((c) => (
          <li key={c._id}>
            {c.title} - {c.issuer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificationPage;