import { create } from "zustand";
import { getStudent } from "./http-client";

interface User {
  id: string;
  fullname: string;
  email: string;
  username: string;
  country: string;
  socials: {type: 'INSTAGRAM' | 'X', username: string}[]
}

interface UserState {
  user: User | null;
  setUserAsync: () => Promise<void>;
}

const useUserState = create<UserState>((set) => ({
  user: null,
  setUserAsync: async () => {
    try {
      const userData = await getStudent();
      set({ user: userData });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  },
}));

export default useUserState;
