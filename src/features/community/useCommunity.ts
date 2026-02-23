import { CLOSE_WRITE_MODAL } from '@/entities/reducers/BoardReducer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api';
import { useDispatch } from 'react-redux';

export const useCommunity = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ['communityData'] });
      dispatch({ type: CLOSE_WRITE_MODAL });
      document.body.classList.remove('modal-dimmed');
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
      queryClient.invalidateQueries({ queryKey: ['communityData'] });
      dispatch({ type: CLOSE_WRITE_MODAL });
      document.body.classList.remove('modal-dimmed');
    },
    onError: (error) => {
      console.error('수정 실패:', (error as any).response?.data); // 여기서 실제 에러 확인
    },
  });

  const deleteCommunity = useMutation({
    mutationFn: async ({ boardId }: { boardId: number }) => {
      await api.delete(`/board/${boardId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityData'] });
    },
  });

  return {
    getCommunityData,
    getCommunityLoading,
    writeCommunity,
    writeLoading: writeCommunity.isPending,
    modifyCommunity,
    modifyLoading: modifyCommunity.isPending,
    deleteCommunity,
    deleteLoading: deleteCommunity.isPending,
  };
};
