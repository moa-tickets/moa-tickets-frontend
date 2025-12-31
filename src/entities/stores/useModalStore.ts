import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  openModal: (title: string, message: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: '',
  message: '',
  openModal: (title: string, message: string) =>
    set({ isOpen: true, title, message }),
  closeModal: () => set({ isOpen: false, title: '', message: '' }),
}));
