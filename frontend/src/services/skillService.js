const API_URL = "http://localhost:5000/api/skills";

export const getSkills = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createSkill = async (skillData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skillData),
  });
  return response.json();
};

export const updateSkill = async (id, skillData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skillData),
  });
  return response.json();
};

export const deleteSkill = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};