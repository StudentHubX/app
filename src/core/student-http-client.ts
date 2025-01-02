import axios from "axios";
import { studentSignUpDetails, studentLoginDetails } from "./dto/user.dto";
import { postDetails } from "./dto/posts.dto";

const backendUrl = "http://localhost:3000";

export const addSocialToUser = async (
  socialsData: { type: string; username: string }[]
) => {
  try {
    const accessToken = localStorage.getItem("access-key");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const user = await axios.post(
      `${backendUrl}/student/addSocial`,
      {
        socialsData, // This is the request body
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Headers should be in this third argument
        },
      }
    );

    console.log(user);
  } catch (error) {
    console.error("Error adding socials", error);

    // Optionally handle specific error types
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    }

    throw error;
  }
};

// Function for student sign-up
export const studentSignUp = async (data: studentSignUpDetails) => {
  try {
    const response = await axios.post<{
      access_token: any;
    }>(`${backendUrl}/auth/signup?type=STUD`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const accessKey = response.data?.access_token;

    if (accessKey) {
      localStorage.setItem("access-key", accessKey);
      localStorage.setItem("user-type", "STUDENT");
    } else {
      throw new Error("Access key not provided in response.");
    }
  } catch (error) {
    console.error("Error signing up student:", error);
    throw error;
  }
};

// Function for student login
export const studentLogin = async (data: studentLoginDetails) => {
  try {
    const response = await axios.post<{
      access_token: any;
      access_key: string;
    }>(`${backendUrl}/auth/login?type=STUD`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const accessKey = response.data?.access_token;

    if (accessKey) {
      localStorage.setItem("access-key", accessKey);
      localStorage.setItem("user-type", "STUDENT");
    } else {
      throw new Error("Access key not provided in response.");
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in student:", error);
    throw error;
  }
};

export const createPost = async (data: postDetails) => {
  try {
    const accessToken = localStorage.getItem("access-key");

    const newPost = await axios.post(
      `${backendUrl}/posts/create`,
      {
        title: data.title,
        content: data.content,
        authorId: data.authorId,
        isStudent: data.isStudent,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return { newPost };
  } catch (error) {
    console.error("Error creating post", error);
    throw error;
  }
};
export const getSpaces = async () => {
  const accessToken = localStorage.getItem("access-key");

  try {
    // Fetch spaces from the backend
    const response = await axios.get(`${backendUrl}/student/spaces`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { joinedSpaces, recommendedSpaces } = response.data;

    // Map the joined spaces
    const processedJoinedSpaces = joinedSpaces.map((space: any) => ({
      type: "joined",
      id: space.id,
      name: space.name,
      description: space.description,
      professionalCoordinator: space.professionalCoordinator?.fullname || "N/A",
      skillLevel: space.skillLevel || "Unknown",
    }));

    // Map the recommended spaces
    const processedRecommendedSpaces = recommendedSpaces.map((space: any) => ({
      type: "recommended",
      id: space.id,
      name: space.name,
      description: space.description,
      professionalCoordinator: space.professionalCoordinator?.fullname || "N/A",
      skillLevel: space.skillLevel || "Unknown",
    }));

    // Combine both lists into a single array

    const allSpaces = [...processedJoinedSpaces, ...processedRecommendedSpaces]
    return allSpaces
  } catch (error: any) {
    console.error("Error fetching spaces:", error.message);
    throw new Error("Failed to fetch spaces");
  }
};
