import { useEffect, useState } from "react";
import { fetchEducation, createEducation, deleteEducation } from "../services/api";

export default function EducationPage() {
  const [educationList, setEducationList] = useState([]);
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    const data = await fetchEducation();
    setEducationList(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEducation(formData);
    setFormData({
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: ""
    });
    loadEducation();
  };

  const handleDelete = async (id) => {
    await deleteEducation(id);
    loadEducation();
  };

  return (
    <div>
      <h2>Education</h2>

      <form onSubmit={handleSubmit}>
        <div><input name="school" placeholder="School" value={formData.school} onChange={handleChange} /></div>
        <div><input name="degree" placeholder="Degree" value={formData.degree} onChange={handleChange} /></div>
        <div><input name="fieldOfStudy" placeholder="Field of Study" value={formData.fieldOfStudy} onChange={handleChange} /></div>
        <div><input name="startDate" placeholder="Start Date" value={formData.startDate} onChange={handleChange} /></div>
        <div><input name="endDate" placeholder="End Date" value={formData.endDate} onChange={handleChange} /></div>
        <div><textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} /></div>
        <button type="submit">Add Education</button>
      </form>

      <hr />

      {educationList.map((edu) => (
        <div key={edu._id}>
          <h4>{edu.school}</h4>
          <p>{edu.degree}</p>
          <p>{edu.fieldOfStudy}</p>
          <p>{edu.startDate} - {edu.endDate}</p>
          <p>{edu.description}</p>
          <button onClick={() => handleDelete(edu._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}