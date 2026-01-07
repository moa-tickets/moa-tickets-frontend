import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type LoginData } from '../types/types';

export const useLoginData = create<LoginData>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userData: {
        email: '',
        nickname: '',
        seller: false,
      },
      setUserData: (data: {
        email: string;
        nickname: string;
        seller: boolean;
      }) => set({ userData: data }),
      setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),
    }),
    {
      name: 'login-storage',
    },
  ),
);
