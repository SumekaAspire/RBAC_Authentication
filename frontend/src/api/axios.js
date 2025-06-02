import axios from "axios";

//centralizes authentication logic

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/auth", 
});

// Attach token to every request if exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
