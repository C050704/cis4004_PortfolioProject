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

  // Fetch certifications
  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchCerts = async () => {
    const res = await axios.get("/api/certifications");
    setCerts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/certifications", form);
    fetchCerts();
  };

  return (
    <div>
      <h2>Certifications</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Issuer"
          onChange={(e) => setForm({ ...form, issuer: e.target.value })}
        />
        <input
          type="date"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
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