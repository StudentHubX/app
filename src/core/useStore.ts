import { create } from "zustand";
import { getStudent } from "./user-http-client";

interface User {
  id: string;
  fullname: string;
  email: string;
  username: string;
  country: string;
  socials: {
    socialsData: { type: 'INSTAGRAM' | 'X'; username: string }[];
  };
  role?: string,
  organization?: string,
  isStudent: boolean;
  faculty?: string;
}

interface UserState {
  user: User | null;
  setUserAsync: () => Promise<void>;
  logout: () => void;
}

const useUserState = create<UserState>((set) => ({
  user: null,

  // Fetch and set user data
  setUserAsync: async () => {
    try {
      const userData = await getStudent();
      set({ user: userData });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  },

  // Log out the user by setting user to null
  logout: () => {
    localStorage.removeItem('access-key')
    console.log(" juetjnrss")
    set({ user: null });
    // Optional: add any additional cleanup here, like clearing local storage
    // localStorage.removeItem("userData");
  }
}));

export default useUserState;
