import axios from "axios";

export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/refresh-token`, // auth service
      {},
      { withCredentials: true }
    );

    const { accessToken, idToken } = response.data;
    return { accessToken, idToken };
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Failed to refresh token");
  }
};
