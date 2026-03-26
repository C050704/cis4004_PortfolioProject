import { useEffect, useState } from "react";
import { getSkills, createSkill, deleteSkill } from "../services/skillService";

function SkillsPage() {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "Language",
        level: "Beginner",
    });

    const loadSkills = async () => {
        const data = await getSkills();
        setSkills(data);
    };

    useEffect(() => {
        loadSkills();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            alert("Skill name is required");
            return;
        }

        await createSkill(formData);
        setFormData({ name: "", category: "Language", level: "Beginner" });
        loadSkills();
    };

    const handleDelete = async (id) => {
        await deleteSkill(id);
        loadSkills();
    };

    return (
        <div>
            <h1>Skills</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Skill Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="Language">Language</option>
                    <option value="Framework">Framework</option>
                    <option value="Tool">Tool</option>
                    <option value="Technology">Technology</option>
                    <option value="Certification">Certification</option>
                    <option value="Other Skills">Other Skills</option>
                </select>

                <select name="level" value={formData.level} onChange={handleChange}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                <button type="submit">Add Skill</button>
            </form>

            <ul>
                {skills.map((skill) => (
                    <li key={skill._id}>
                        {skill.name} - {skill.category} - {skill.level}
                        <button onClick={() => handleDelete(skill._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SkillsPage;