import { combineReducers } from 'redux';
import modalReducer from './ModalReducer';
import loginReducer from './LoginReducer';
import concertListReducer from './ConcertListReducer';
import concertDetailReducer from './ConcertDetailReducer';
import bookSeatReducer from './BookSeatReducer';
import paymentReducer from './PaymentReducer';
import reservationReducer from './ReservationReducer';
import reservationDetailReducer from './ReservationDetailReducer';

const rootReducer = combineReducers({
  modalReducer,
  loginReducer,
  concertListReducer,
  concertDetailReducer,
  bookSeatReducer,
  paymentReducer,
  reservationReducer,
  reservationDetailReducer,
});

export default rootReducer;
