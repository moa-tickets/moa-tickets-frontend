import type { Action } from '../types/types';

export const DATE_FILTER_CHANGE = 'dateFilter/change';
export const DATE_FILTER_RESET = 'dateFilter/reset';

export interface DateFilterState {
  from: string | null;
  to: string | null;
}

const initialState: DateFilterState = {
  from: null,
  to: null,
};

export default function dateFilterReducer(
  state: DateFilterState = initialState,
  action: Action,
) {
  switch (action.type) {
    case DATE_FILTER_CHANGE:
      return {
        ...state,
        from: action.payload.from,
        to: action.payload.to,
      };
    case DATE_FILTER_RESET:
      return initialState;
    default:
      return state;
  }
}
