import axios from "axios";
import { studentSignUpDetails, studentLoginDetails } from "./dto/user.dto";
import { postDetails } from "./dto/posts.dto";

const backendUrl = "http://localhost:3000";

export const addSocialToUser = async (socialsData: { type: string; username: string }[]) => {
  try {
    const accessToken = localStorage.getItem("access-key");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const user = await axios.post(
      `${backendUrl}/student/addSocial`,
      {
        socialsData // This is the request body
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

export const getStudent = async () => {
  try {
    const accessToken = localStorage.getItem("access-key");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    const user = await axios.get(`${backendUrl}/student/profile`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return {
      id: user.data.userId,
      fullname: user.data.fullname,
      email: user.data.email,
      username: user.data.username,
      country:  user.data.country,
      socials:  user.data.socials,
      isStudent: user.data.isStudent
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

    const newPost = await axios.post(`${backendUrl}/posts/create`, 
      {
      title: data.title,
      content: data.content,
      authorId: data.authorId,
      isStudent: data.isStudent
    },
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })

    return {newPost}

  } catch (error) {
     console.error("Error creating post", error);
    throw error;
  }
}