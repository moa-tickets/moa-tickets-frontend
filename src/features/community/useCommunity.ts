import { GET_BOARD } from '@/entities/reducers/BoardReducer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const useCommunity = () => {
  const { data: getCommunityData, isLoading: getCommunityLoading } = useQuery({
    queryKey: ['communityData'],
    queryFn: async () => {
      const response = await axios.get(`/api/board`);
      return response.data;
    },
  });

  return { getCommunityData, getCommunityLoading };
};
