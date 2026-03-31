const API_URL = "/api/skills";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`
});

export const getSkills = async () => {
  const response = await fetch(API_URL, {
    headers: authHeaders()
  });
  return response.json();
};

export const createSkill = async (skillData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(skillData)
  });
  return response.json();
};

export const updateSkill = async (id, skillData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(skillData)
  });
  return response.json();
};

export const deleteSkill = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });
  return response.json();
};