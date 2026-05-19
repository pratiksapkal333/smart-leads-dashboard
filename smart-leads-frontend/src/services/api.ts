import axios from "axios";

const api = axios.create({
    // This points to the /api root of your backend
    baseURL: "https://smart-leads-dashboard-backend-1m9c.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor to attach JWT token to every request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;