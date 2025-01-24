import axios from "axios";

const BaseUrl = 'http://localhost:3000/api/v1';
// const BaseUrl = 'https://content-management-system-ieu3.onrender.com/api/v1';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: BaseUrl, 
  withCredentials: false
});

export default axiosInstance;
