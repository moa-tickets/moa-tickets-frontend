import {
  GET__SEAT__INFO,
  HOLD,
  type SeatInfo,
} from '@/entities/reducers/BookSeatReducer';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const useBooking = () => {
  const dispatch = useDispatch();

  // 좌석 정보 가져오기
  const getSeatInfo = useMutation<SeatInfo[], Error, { sessionId: number }>({
    mutationFn: async ({ sessionId }: { sessionId: number }) => {
      const response = await axios.get(`/api/sessions/${sessionId}/tickets`);
      return response.data;
    },
    onSuccess: (data: SeatInfo[]) => {
      dispatch({ type: GET__SEAT__INFO, payload: { data } });
    },
  });

  // 좌석 임시 홀드시키기
  const seatHold = useMutation<
    {
      holdToken: string;
      expiresAt: string;
    },
    Error,
    { sessionId: number; ticketIds: number[] }
  >({
    mutationFn: async ({
      sessionId,
      ticketIds,
    }: {
      sessionId: number;
      ticketIds: number[];
    }) => {
      const response = await axios.post(`/api/tickets/hold`, {
        sessionId,
        ticketIds,
      });
      return response.data;
    },
    onSuccess: (data: { holdToken: string; expiresAt: string }, variables) => {
      dispatch({
        type: HOLD,
        payload: {
          holdIndex: variables.ticketIds,
          holdToken: data.holdToken,
          expires: data.expiresAt,
        },
      });
      getSeatInfo.mutate({ sessionId: variables.sessionId });
    },
  });

  return {
    getSeatInfo,
    seatHold,
    getSeatInfoPending: getSeatInfo.isPending,
    seatHoldPending: seatHold.isPending,
  };
};
