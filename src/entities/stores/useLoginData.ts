import { create } from 'zustand';
import { type LoginData } from '../types/types';

export const useLoginData = create<LoginData>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),
}));
