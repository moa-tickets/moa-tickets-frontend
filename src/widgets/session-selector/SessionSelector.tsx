import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/shared';
import type { ProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import {
  SESSION_CHANGE,
  SESSION_INIT,
  type LoginState,
} from '@/entities/reducers/LoginReducer';
import {
  CLEAR_SELECTED_SEATS,
  type MainSeatInfo,
} from '@/entities/reducers/BookSeatReducer';
import { useBooking } from '@/features/booking/useBooking';
import SelectorArea from '@/shared/components/selectors/SelectorArea';
import SelectorWrapper from '@/shared/components/selectors/SelectorWrapper';
import SeatSelectEditor from '../seat-select-editor/SeatSelectEditor';
import SeatList from '../seat-list/SeatList';

const SessionSelector = ({ data }: { data: ProductDetail }) => {
  const convertedSessionList = data.sessions.map((session) => ({
    value: session.date,
    id: session.sessionId,
  }));

  const { selectedSession } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

  const { data: seatData, selectedTicketIds } = useSelector(
    (state: { bookSeatReducer: MainSeatInfo }) => state.bookSeatReducer,
  );
  const { getSeatInfo } = useBooking();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CLEAR_SELECTED_SEATS });
    getSeatInfo.mutate({ sessionId: selectedSession.sessionId });
  }, [selectedSession.sessionId]);

  useEffect(() => {
    dispatch({ type: SESSION_INIT });
    dispatch({ type: CLEAR_SELECTED_SEATS });
  }, [dispatch, data.concertId]);

  return (
    <div
      className={cn(
        'w-[700px] h-[1000px] border border-solid border-[rgb(205,205,205)] rounded-[4px]',
        'p-[20px]',
      )}
    >
      <SelectorArea
        title={'세션 선택하기'}
        area={
          <SelectorWrapper
            list={convertedSessionList}
            selectedState={selectedSession.date}
            onChanger={(element: string, sessionId: number) => {
              dispatch({ type: CLEAR_SELECTED_SEATS });
              dispatch({
                type: SESSION_CHANGE,
                payload: { date: element, sessionId },
              });
            }}
          />
        }
      />
      <SelectorArea
        title={'좌석 선택하기'}
        area={
          selectedSession.date ? (
            <SeatSelectEditor data={seatData} />
          ) : (
            <p className={cn('mt-[20px] opacity-45')}>
              먼저 세션을 선택하셔야 합니다.
            </p>
          )
        }
      />
      <SelectorArea
        title={'선택한 좌석'}
        area={
          selectedTicketIds.length === 0 ? (
            <p className={cn('mt-[20px] opacity-45')}>
              좌석을 선택해야 합니다.
            </p>
          ) : (
            <SeatList
              holdedIndex={selectedTicketIds}
              data={data}
              selectedSession={selectedSession}
              seatData={seatData}
            />
          )
        }
      />
    </div>
  );
};

export default SessionSelector;
