import { GET_BOARD } from '@/entities/reducers/BoardReducer';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const useCommunity = () => {
  const dispatch = useDispatch();

  const { data: getCommunityData, isLoading: getCommunityLoading } = useQuery({
    queryKey: ['communityData'],
    queryFn: async () => {
      const response = await axios.get(`/api/board`);
      return response.data;
    },
  });

  const writeCommunity = useMutation({
    mutationFn: async (newPost: { title: string; content: string }) => {
      await axios.post(`/api/board`, newPost);
    },
    onSuccess: () => {
      dispatch({ type: GET_BOARD, payload: { data: getCommunityData } });
    },
  });

  return {
    getCommunityData,
    getCommunityLoading,
    writeCommunity,
    writeLoading: writeCommunity.isPending,
  };
};
