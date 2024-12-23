import axios from "axios";
import { cookies } from "next/headers";

const API_URL = "http://localhost:5500";

export const getUserProfile = async () => {
  const cookieStore = cookies();
  const username = cookieStore.get("username")?.value;
  try {
    const response = await axios.get(`${API_URL}/user/${username}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
