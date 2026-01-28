import {
  GET__SEAT__INFO,
  HOLD,
  RELEASE,
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
    { sessionId: number; ticketIds: number[]; existingHoldToken?: string }
  >({
    mutationFn: async ({
      sessionId,
      ticketIds,
      existingHoldToken,
    }: {
      sessionId: number;
      ticketIds: number[];
      existingHoldToken?: string;
    }) => {
      // 기존 hold가 있으면 먼저 release
      if (existingHoldToken) {
        await axios.post(`/api/holds/${existingHoldToken}/release`);
      }
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
    onError: (e) => {
      console.error(e);
    },
  });

  // 좌석 홀드 해제하기 : Release
  const seatRelease = useMutation<
    void,
    Error,
    {
      holdToken: string;
      ticketId: number;
      sessionId: number;
      remainingTicketIds: number[];
    }
  >({
    mutationFn: async ({
      holdToken,
      sessionId,
      remainingTicketIds,
    }: {
      holdToken: string;
      sessionId: number;
      remainingTicketIds: number[];
    }) => {
      // 전체 해제
      await axios.post(`/api/holds/${holdToken}/release`);
      // 나머지 좌석 다시 홀드
      if (remainingTicketIds.length > 0) {
        seatHold.mutate({ sessionId, ticketIds: remainingTicketIds });
      }
    },
    onSuccess: (_, variables) => {
      dispatch({ type: RELEASE, payload: { target: variables.ticketId } });
      getSeatInfo.mutate({ sessionId: variables.sessionId });
    },
  });

  return {
    getSeatInfo,
    seatHold,
    seatRelease,
    getSeatInfoPending: getSeatInfo.isPending,
    seatHoldPending: seatHold.isPending,
    seatReleasePending: seatRelease.isPending,
  };
};
