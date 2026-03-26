const API_BASE = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`
});

export const fetchPortfolio = async () => {
  const res = await fetch(`${API_BASE}/portfolio`, {
    headers: authHeaders()
  });
  return res.json();
};

export const updatePortfolio = async (id, data) => {
  const res = await fetch(`${API_BASE}/portfolio/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
};

export const fetchEducation = async () => {
  const res = await fetch(`${API_BASE}/education`, {
    headers: authHeaders()
  });
  return res.json();
};

export const createEducation = async (data) => {
  const res = await fetch(`${API_BASE}/education`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateEducation = async (id, data) => {
  const res = await fetch(`${API_BASE}/education/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteEducation = async (id) => {
  const res = await fetch(`${API_BASE}/education/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });
  return res.json();
};

export const fetchExperience = async () => {
  const res = await fetch(`${API_BASE}/experience`, {
    headers: authHeaders()
  });
  return res.json();
};

export const createExperience = async (data) => {
  const res = await fetch(`${API_BASE}/experience`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateExperience = async (id, data) => {
  const res = await fetch(`${API_BASE}/experience/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteExperience = async (id) => {
  const res = await fetch(`${API_BASE}/experience/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });
  return res.json();
};