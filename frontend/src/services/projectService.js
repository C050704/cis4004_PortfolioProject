const API_URL = "/api/projects";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`
});

export const getProjects = async () => {
  const response = await fetch(API_URL, {
    headers: authHeaders()
  });
  return response.json();
};

export const createProject = async (projectData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(projectData)
  });
  return response.json();
};

export const updateProject = async (id, projectData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(projectData)
  });
  return response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });
  return response.json();
};