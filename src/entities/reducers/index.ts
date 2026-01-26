import { combineReducers } from 'redux';
import modalReducer from './ModalReducer';
import loginReducer from './LoginReducer';
import concertListReducer from './ConcertListReducer';
import concertDetailReducer from './ConcertDetailReducer';
import bookSeatReducer from './BookSeatReducer';

const rootReducer = combineReducers({
  modalReducer,
  loginReducer,
  concertListReducer,
  concertDetailReducer,
  bookSeatReducer,
});

export default rootReducer;
