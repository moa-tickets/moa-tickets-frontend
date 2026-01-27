import type { Action, ModalState } from '../types/types';

export const OPEN_MODAL = 'modal/OPEN_MODAL';
export const PAYMENT_OPEN = 'modal/PAYMENT_OPEN';
export const CLOSE_MODAL = 'modal/CLOSE_MODAL';

export const openModal = () => ({ type: OPEN_MODAL });
export const paymentOpen = () => ({ type: PAYMENT_OPEN });
export const closeModal = () => ({ type: CLOSE_MODAL });

const modalInitialState: ModalState = {
  isOpen: false,
  title: null,
  message: null,
};

export default function modalReducer(
  state: ModalState = modalInitialState,
  action: Action,
) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        title: action.payload.title,
        message: action.payload.message,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        title: null,
        message: null,
      };
    case PAYMENT_OPEN:
      return {
        ...state,
        isOpen: true,
      };
    default:
      return state;
  }
}
