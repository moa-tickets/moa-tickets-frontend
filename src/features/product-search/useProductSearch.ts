import {
  type ConcertListType,
  type ConcertDetailType,
  type TicketType,
} from '@/entities/types/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export const useProductSearch = () => {
  const [concertList, setConcertList] = useState<ConcertListType[]>([]);
  const [concertDetail, setConcertDetail] = useState<ConcertDetailType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [sessionTickets, setSessionTickets] = useState<TicketType[]>([]);
  const [isTicketsLoading, setIsTicketsLoading] = useState(false);
  const [holdToken, setHoldToken] = useState<string | null>(null);
  const [isHolding, setIsHolding] = useState(false);

  const getSearchResults = useMutation<
    ConcertListType[],
    Error,
    { query: string }
  >({
    mutationFn: async ({ query }: { query: string }) => {
      const response = await axios.get(
        `https://app.moaticket.dev/api/product/concertList`,
        {
          params: {
            searchValue: query,
            sortBy: 'date',
            sortOrder: 'desc',
            pageable: {
              page: 0,
              size: 1,
              sort: ['string'],
            },
          },
          withCredentials: true,
        },
      );
      return response.data;
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data: ConcertListType[]) => {
      setTimeout(() => {
        setConcertList(data);
        setIsLoading(false);
      }, 3000);
    },
    onError: () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    },
  });

  const productPostTest = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `https://app.moaticket.dev/api/product/concert`,
        {
          hallId: 0,
          concertName: '10cm 콘서트',
          concertDuration: '2026-01-07T08:44:48.454Z',
          age: 8,
          bookingOpen: '2026-01-07T08:44:48.454Z',
          concertStart: '2026-01-07T08:44:48.454Z',
          concertEnd: '2026-01-07T08:44:48.454Z',
          thumbnail: '/small_banner/hosinogen.gif',
          sessions: [
            {
              date: '2026-01-07T08:44:48.454Z',
              price: 0,
            },
          ],
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
    },
  });

  const getConcertDetail = useMutation<ConcertDetailType, Error, number>({
    mutationFn: async (concertId: number) => {
      const response = await axios.get(
        `https://app.moaticket.dev/api/product/detail/${concertId}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onMutate: () => {
      setIsDetailLoading(true);
    },
    onSuccess: (data: ConcertDetailType) => {
      setConcertDetail(data);
      setIsDetailLoading(false);
    },
    onError: () => {
      setIsDetailLoading(false);
    },
  });

  const getSessionTickets = useMutation<TicketType[], Error, number>({
    mutationFn: async (sessionId: number) => {
      const response = await axios.get(
        `https://app.moaticket.dev/api/sessions/${sessionId}/tickets`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onMutate: () => {
      setIsTicketsLoading(true);
    },
    onSuccess: (data: TicketType[]) => {
      setSessionTickets(data);
      setIsTicketsLoading(false);
    },
    onError: () => {
      setIsTicketsLoading(false);
    },
  });

  // 좌석 임시 점유 API
  const holdTickets = useMutation<
    string,
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
      const response = await axios.post(
        `https://app.moaticket.dev/api/tickets/hold`,
        {
          sessionId,
          ticketIds,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onMutate: () => {
      setIsHolding(true);
    },
    onSuccess: (data: string) => {
      setHoldToken(data);
      setIsHolding(false);
    },
    onError: () => {
      setIsHolding(false);
    },
  });

  return {
    getSearchResults,
    concertList,
    productPostTest,
    isLoading,
    getConcertDetail,
    concertDetail,
    isDetailLoading,
    getSessionTickets,
    sessionTickets,
    isTicketsLoading,
    holdTickets,
    holdToken,
    isHolding,
  };
};
