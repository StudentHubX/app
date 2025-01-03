import axios from "axios";
import { ProfessionalData, ProfessionalLoginDetails } from "./dto/user.dto";
import { CreateSpaceDTO, createSpacePostDTO } from "./dto/space.dto";
const backendUrl = "http://localhost:3000";

export const professionalSignUp = async (data: ProfessionalData) => {
  try {
    const response = await axios.post<{
      access_token: any;
    }>(`${backendUrl}/auth/signup?type=PROF`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const accessKey = response.data?.access_token;

    if (accessKey) {
      localStorage.setItem("access-key", accessKey);
      localStorage.setItem("user-type", "PROFESSIONAL");
    } else {
      throw new Error("Access key not provided in response.");
    }
  } catch (error) {
    console.error("Error signing up student:", error);
    throw error;
  }
};
export const professionalLogin = async (data: ProfessionalLoginDetails) => {
  try {
    const response = await axios.post<{
      access_token: any;
    }>(`${backendUrl}/auth/login?type=PROF`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const accessKey = response.data?.access_token;

    if (accessKey) {
      localStorage.setItem("access-key", accessKey);
      localStorage.setItem("user-type", "PROFESSIONAL");
    } else {
      throw new Error("Access key not provided in response.");
    }
  } catch (error) {
    console.error("Error signing up student:", error);
    throw error;
  }
};

export const getSpaces = async () => {
  const accessToken = localStorage.getItem("access-key");

  try {
    // Fetch spaces from the backend
    const spaces = await axios.get(`${backendUrl}/professional/spaces`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(spaces);
    const userSpaces = spaces.data.map((space: any) => {
      return {
        id: space.id,
        name: space.name,
        description: space.description,
        skillLevel: space.skillLevel,
      };
    });
    return userSpaces;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createSpace = async (data: CreateSpaceDTO) => {
  const accessToken = localStorage.getItem("access-key");
  try {
    const newPost = await axios.post(
      `${backendUrl}/spaces/create`,
      {
        name: data.name,
        description: data.description,
        skillLevel: data.skillLevel,
        maxNumberOfStudents: data.maxNumberOfStudents,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return newPost.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSpace = async (id: number) => {
  try {
    const space = await axios.get(`${backendUrl}/spaces/${id}`);
    return space.data;


  } catch (error: any) {
    console.log(error.message);
  }
};  

export const createPostOnSpace = async (data: createSpacePostDTO) => {
  try {
    const newPostOnSpace = await axios.post(`${backendUrl}/spaces/posts/create`, {
      spaceId: data.id,
      type: data.type,
      content: data.content
    })
    return newPostOnSpace.data;
  } catch (error) {
    console.log(error);
  }
}