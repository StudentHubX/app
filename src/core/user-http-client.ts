import axios from "axios";
import { postDetails } from "./dto/posts.dto";

const backendUrl = "http://localhost:3000";
export const getStudent = async () => {
  try {
    const accessToken = localStorage.getItem("access-key");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const user = await axios.get(`${backendUrl}/student/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(user.data)

    return {
      id: user.data.userId,
      fullname: user.data.fullname,
      email: user.data.email,
      username: user.data.username,
      country: user.data.country,
      socials: user.data.socials,
      isStudent: user.data.isStudent,
    };
  } catch (error) {
    console.error("Error finding student:", error);

    // Optionally handle specific error types
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    }

    throw error;
  }
};
