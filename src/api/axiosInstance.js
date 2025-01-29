import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sneak-backend-1.onrender.com/api", // Base URL for all requests
  withCredentials: true,
});

let isRefreshing = false; // To track if the refresh token call is in progress
let failedQueue = []; // To queue requests while refreshing the token

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If refresh is already in progress, queue the requests
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true; // Mark the request as retrying
      isRefreshing = true;

      try {
        const refreshResponse = await axiosInstance.post(
          "/users/refresh-token",
          {},
          { withCredentials: true }
        );
        const newToken = refreshResponse.data.token;

        // Update the Authorization header for queued requests
        processQueue(null, newToken);

        // Retry the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        window.location.href = "/auth/login"; // Redirect to login if refresh fails
        return Promise.reject(err);
      } finally {
        isRefreshing = false; // Reset the flag after refresh process completes
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
