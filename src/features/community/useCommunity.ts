import { GET_BOARD } from '@/entities/reducers/BoardReducer';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/shared/lib/api';
import { useDispatch } from 'react-redux';

export const useCommunity = () => {
  const dispatch = useDispatch();

  const { data: getCommunityData, isLoading: getCommunityLoading } = useQuery({
    queryKey: ['communityData'],
    queryFn: async () => {
      const response = await api.get(`/board`);
      return response.data;
    },
  });

  const writeCommunity = useMutation({
    mutationFn: async (newPost: { title: string; content: string }) => {
      await api.post(`/board`, newPost);
    },
    onSuccess: () => {
      dispatch({ type: GET_BOARD, payload: { data: getCommunityData } });
    },
  });

  const modifyCommunity = useMutation({
    mutationFn: async ({
      boardId,
      title,
      content,
    }: {
      boardId: number;
      title: string;
      content: string;
    }) => {
      await api.patch(`/board/${boardId}`, { title, content });
    },
    onSuccess: () => {
      dispatch({ type: GET_BOARD, payload: { data: getCommunityData } });
    },
    onError: (error) => {
      console.error('수정 실패:', (error as any).response?.data); // 여기서 실제 에러 확인
    },
  });

  return {
    getCommunityData,
    getCommunityLoading,
    writeCommunity,
    writeLoading: writeCommunity.isPending,
    modifyCommunity,
    modifyLoading: modifyCommunity.isPending,
  };
};
