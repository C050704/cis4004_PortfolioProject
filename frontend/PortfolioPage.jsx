import React, { useEffect, useState } from "react";
import axios from "axios";

const PublicPortfolioPage = () => {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchCerts = async () => {
    const res = await axios.get("/api/certifications");
    setCerts(res.data);
  };

  return (
    <div>
      <h1>Public Portfolio</h1>

      {/* Certifications Section */}
      <h2>Certifications</h2>
      {certs.map((c) => (
        <div key={c._id}>
          <h3>{c.title}</h3>
          <p>{c.issuer}</p>
          <p>{new Date(c.date).toLocaleDateString()}</p>
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PublicPortfolioPage;