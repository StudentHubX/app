import axios from 'axios'
import { studentSignUpDetails } from './dto/user.dto'
const backendUrl = 'http://localhost:3001'
export const studentSignUp = async (data: studentSignUpDetails) => {
    const user = await axios.post(`${backendUrl}/auth/signup?type=STUD`, data)
    localStorage.setItem("access-key", user.data.access_key)
    return user.data

}