import axios from 'axios';
import { studentSignUpDetails, studentLoginDetails } from './dto/user.dto';

const backendUrl = 'http://localhost:3000';

// Function for student sign-up
export const studentSignUp = async (data: studentSignUpDetails) => {
    try {
        const response = await axios.post<{ access_key: string }>(
            `${backendUrl}/auth/signup?type=STUD`, 
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const accessKey = response.data?.access_key;
        return response.data;
    } catch (error) {
        console.error('Error signing up student:', error);
        throw error;
    }
};

// Function for student login
export const studentLogin = async (data: studentLoginDetails) => {
    try {
        const response = await axios.post<{ access_key: string }>(
            `${backendUrl}/auth/login?type=STUD`, 
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const accessKey = response.data?.access_key;

        if (accessKey) {
            localStorage.setItem("access-key", accessKey);
        } else {
            throw new Error("Access key not provided in response.");
        }

        return response.data;
    } catch (error) {
        console.error('Error logging in student:', error);
        throw error;
    }
};
