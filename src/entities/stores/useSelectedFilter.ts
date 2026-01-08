import { create } from 'zustand';
import type { FilterDataStructure } from '../types/types';

type DateSelectionStore = FilterDataStructure & {
  dateSelectCount: number;
  handleDateSelect: (date: Date) => 'selected' | 'deselected' | 'already_selected';
  resetDateSelection: () => void;
};

export const useSelectedFilterStore = create<DateSelectionStore>((set, get) => ({
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
    from: undefined,
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
  dateSelectCount: 0,
  handleDateSelect: (date: Date) => {
    const state = get();
    const { dateRange, dateSelectCount } = state;

    const isSameDate = (d1: Date | undefined, d2: Date) => {
      if (!d1) return false;
      return d1.toDateString() === d2.toDateString();
    };

    // 이미 선택된 날짜를 다시 클릭하면 해제
    if (isSameDate(dateRange.from, date)) {
      set({
        dateRange: { from: dateRange.to, to: undefined },
        dateSelectCount: Math.max(0, dateSelectCount - 1),
      });
      return 'deselected';
    }
    if (isSameDate(dateRange.to, date)) {
      set({
        dateRange: { ...dateRange, to: undefined },
        dateSelectCount: Math.max(0, dateSelectCount - 1),
      });
      return 'deselected';
    }

    // 이미 2개 선택된 경우
    if (dateSelectCount >= 2) {
      return 'already_selected';
    }

    // 첫 번째 선택
    if (dateSelectCount === 0) {
      set({
        dateRange: { from: date, to: undefined },
        dateSelectCount: 1,
      });
      return 'selected';
    }

    // 두 번째 선택 - 날짜 순서 정렬
    if (dateSelectCount === 1 && dateRange.from) {
      const fromDate = dateRange.from;
      if (date < fromDate) {
        set({
          dateRange: { from: date, to: fromDate },
          dateSelectCount: 2,
        });
      } else {
        set({
          dateRange: { from: fromDate, to: date },
          dateSelectCount: 2,
        });
      }
      return 'selected';
    }

    return 'selected';
  },
  resetDateSelection: () =>
    set({
      dateRange: { from: undefined, to: undefined },
      dateSelectCount: 0,
    }),
}));
