import { useEffect, useState } from "react";
import { fetchPortfolio, updatePortfolio } from "../services/api";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(null);
  const [formData, setFormData] = useState({
    bio: "",
    github: "",
    linkedin: "",
    website: ""
  });

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    const data = await fetchPortfolio();
    setPortfolio(data);
    setFormData({
      bio: data.bio || "",
      github: data.github || "",
      linkedin: data.linkedin || "",
      website: data.website || ""
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePortfolio(portfolio._id, formData);
    alert("Portfolio updated");
    loadPortfolio();
  };

  if (!portfolio) return <p>Loading portfolio...</p>;

  return (
    <div>
      <h2>Portfolio Editor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="github"
            placeholder="GitHub"
            value={formData.github}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="linkedin"
            placeholder="LinkedIn"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Portfolio</button>
      </form>
    </div>
  );
}