import { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject } from "../services/projectService";
import { getSkills } from "../services/skillService";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
    skills: [],
  });

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  const loadSkills = async () => {
    const data = await getSkills();
    setSkills(data);
  };

  useEffect(() => {
    loadProjects();
    loadSkills();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, skills: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProject(formData);
    setFormData({
      title: "",
      description: "",
      githubLink: "",
      skills: [],
    });
    loadProjects();
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    loadProjects();
  };

  return (
    <div>
      <h1>Projects</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="githubLink"
          placeholder="GitHub link"
          value={formData.githubLink}
          onChange={handleChange}
        />

        <select multiple value={formData.skills} onChange={handleSkillChange}>
          {skills.map((skill) => (
            <option key={skill._id} value={skill._id}>
              {skill.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Project</button>
      </form>

      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>{project.githubLink}</p>
            <p>
              Skills:{" "}
              {project.skills && project.skills.length > 0
                ? project.skills.map((skill) => skill.name).join(", ")
                : "None"}
            </p>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsPage;