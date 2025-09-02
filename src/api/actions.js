import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// Request interceptor for logging
api.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// API functions
export const actionsAPI = {
    // Get all actions
    getAll: () => api.get('/actions/'),

    // Create new action
    create: (actionData) => api.post('/actions/', actionData),

    // Update action
    update: (actionId, actionData) => api.put(`/actions/${actionId}/`, actionData),

    // Delete action
    delete: (actionId) => api.delete(`/actions/${actionId}/`),
};

export default api;
