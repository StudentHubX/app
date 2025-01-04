import axios from "axios";
import { postDetails } from "./dto/posts.dto";

const backendUrl = "http://localhost:3000";
export const getStudent = async () => {
  try {
    const accessToken = localStorage.getItem("access-key");
    const userType = localStorage.getItem("user-type");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    if(userType == "STUDENT") {
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
        faculty: user.data.faculty
      }
    } else {
      const user = await axios.get(`${backendUrl}/professional/profile`, {
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
        organization: user.data.organization,
        role: user.data.role,
        
      }
    }
  } catch (error) {
    console.error("Error finding student:", error);

    // Optionally handle specific error types
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    }

    throw error;
  }
};

export const getFeed = async () => {
  const accessToken = localStorage.getItem("access-key");
  const userType = localStorage.getItem('user-type')

  try {
    if(userType == "STUDENT") {
      const retrievedPosts = await axios.get(`${backendUrl}/student/feed`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }); 
  
      // Map the response data to match the Post schema
      const posts = retrievedPosts.data.map((post: any) => {
        return {
          id: post.id,
          title: post.title,
          content: post.content,
          createdAt: post.createdAt,
          student: post.student ? {
            username: post.student.username,
            fullname: post.student.fullname,
          } : null,
          professional: post.professional ? {
            username: post.professional.username,
            fullname: post.professional.fullname,
          } : null,
        };
      });
  
      return posts;
    } 
    const retrievedPosts = await axios.get(`${backendUrl}/professional/feed`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Map the response data to match the Post schema
    const posts = retrievedPosts.data.map((post: any) => {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        student: post.student ? {
          username: post.student.username,
          fullname: post.student.fullname,
        } : null,
        professional: post.professional ? {
          username: post.professional.username,
          fullname: post.professional.fullname,
        } : null,
      };
    });

    return posts;
  } catch (error) {
    console.log("Error fetching posts:", error);
    throw error;
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
export const getUser = async (username: string) => {
  try {
    const space = await axios.get(`${backendUrl}/auth/${username}`);
    return space.data;


  } catch (error: any) {
    console.log(error.message);
  }
}