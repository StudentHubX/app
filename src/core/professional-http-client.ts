import axios from "axios";
import { ProfessionalData } from "./dto/user.dto";
const backendUrl = "http://localhost:3000";

export const professionalSignUp = async(data: ProfessionalData) => {
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
        } else {
          throw new Error("Access key not provided in response.");
        }
      } catch (error) {
        console.error("Error signing up student:", error);
        throw error;
      }
}