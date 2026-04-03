import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PublicPortfolioPage = () => {
  const [certs, setCerts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    fetchCerts();
  }, [username]);

  const fetchCerts = async () => {
    try {
      const res = await axios.get(`/api/certifications/${username}`);
      setCerts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>{username}'s Portfolio</h1>

      {/* Certifications Section */}
      <h2>Certifications</h2>

      {certs.length === 0 ? (
        <p>No certifications yet</p>
      ) : (
        certs.map((c) => (
          <div key={c._id}>
            <h3>{c.title}</h3>
            <p>{c.issuer}</p>
            <p>
              {c.date
                ? new Date(c.date).toLocaleDateString()
                : "No date"}
            </p>
            <p>{c.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PublicPortfolioPage;