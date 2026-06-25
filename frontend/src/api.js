import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const analyzeIssue = async (title, description) => {
  const response = await api.post('/analyze', { title, description });
  return response.data;
};

export const createIssue = async (formData) => {
  const response = await api.post('/issues', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getIssues = async () => {
  const response = await api.get('/issues');
  return response.data;
};

export const getIssue = async (id) => {
  const response = await api.get(`/issues/${id}`);
  return response.data;
};

export default api;

// Made with Bob
