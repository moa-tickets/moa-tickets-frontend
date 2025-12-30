import { create } from 'zustand';
import type { FilterDataStructure } from '../types/types';

export const useSelectedFilterStore = create<FilterDataStructure>((set) => ({
  genre: [],
  addGenre: (genre: string) =>
    set((state) => {
      if (state.genre.includes(genre)) {
        return state;
      }
      return { genre: [...state.genre, genre] };
    }),
  removeGenre: (genre: string) =>
    set((state) => ({
      genre: state.genre.filter((g) => g !== genre),
    })),
  saleStatus: [],
  addSaleStatus: (status: string) =>
    set((state) => {
      if (state.saleStatus.includes(status)) {
        return state;
      }
      return { saleStatus: [...state.saleStatus, status] };
    }),
  removeSaleStatus: (status: string) =>
    set((state) => ({
      saleStatus: state.saleStatus.filter((s) => s !== status),
    })),
  dateRange: {
    from: new Date(),
    to: undefined,
  },
  setDateFrom: (from: Date | undefined) =>
    set((state) => ({
      dateRange: {
        ...state.dateRange,
        from,
      },
    })),
  setDateTo: (to: Date | undefined) =>
    set((state) => ({
      dateRange: {
        ...state.dateRange,
        to,
      },
    })),
}));
