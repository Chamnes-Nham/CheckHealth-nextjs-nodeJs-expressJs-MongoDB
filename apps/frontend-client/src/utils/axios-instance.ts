import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}`, // auth service route
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("Token expired, attempting to refresh...");
      originalRequest._retry = true;
      try {
        // const { accessToken, idToken } = await refreshToken();
        console.log("Token refreshed successfully");
        // The new tokens are automatically set in cookies by the backend
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Redirect to login page or handle authentication failure
        window.location.href = "/user-profile/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
