import { combineReducers } from 'redux';
import modalReducer from './ModalReducer';
import loginReducer from './LoginReducer';
import concertListReducer from './ConcertListReducer';
import concertDetailReducer from './ConcertDetailReducer';
import bookSeatReducer from './BookSeatReducer';
import paymentReducer from './PaymentReducer';
import reservationReducer from './ReservationReducer';
import reservationDetailReducer from './ReservationDetailReducer';
import dateFilterReducer from './DateFilterReducer';
import audienceReviewReducer from './AudienceReviewReducer';
import keywordReducer from './KeywordReducer';

const rootReducer = combineReducers({
  modalReducer,
  loginReducer,
  concertListReducer,
  concertDetailReducer,
  bookSeatReducer,
  paymentReducer,
  reservationReducer,
  reservationDetailReducer,
  dateFilterReducer,
  audienceReviewReducer,
  keywordReducer,
});

export default rootReducer;
