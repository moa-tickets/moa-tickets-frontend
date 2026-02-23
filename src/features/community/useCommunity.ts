import { CLOSE_WRITE_MODAL } from '@/entities/reducers/BoardReducer';
import type { BoardData } from '@/entities/reducers/BoardReducer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api';
import { useDispatch } from 'react-redux';

export interface Comment {
  commentId: number;
  content: string;
  nickName: string;
  createdAt: string;
}

export const useComments = (boardId: number) => {
  const queryClient = useQueryClient();

  const {
    data: comments = [],
    isLoading: commentsLoading,
    isFetching: commentsFetching,
  } = useQuery<Comment[]>({
    queryKey: ['comments', boardId],
    queryFn: async () => {
      const response = await api.get(`/boards/${boardId}/comments`);
      return response.data;
    },
    enabled: !!boardId,
  });

  const postComment = useMutation({
    mutationFn: async ({ content }: { content: string }) => {
      await api.post(`/board/${boardId}/comments`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', boardId] });
    },
  });

  const deleteComment = useMutation({
    mutationFn: async ({ commentId }: { commentId: number }) => {
      await api.delete(`/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', boardId] });
    },
  });

  const updateComment = useMutation({
    mutationFn: async ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => {
      await api.patch(`/comments/${commentId}`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', boardId] });
    },
  });

  return {
    comments,
    commentsLoading,
    commentsFetching,
    postComment,
    postCommentLoading: postComment.isPending,
    deleteComment,
    deleteCommentLoading: deleteComment.isPending,
    updateComment,
    updateCommentLoading: updateComment.isPending,
  };
};

export const useCommunityDetail = (boardId: number) => {
  const { data: boardDetail, isLoading: boardDetailLoading } =
    useQuery<BoardData>({
      queryKey: ['communityDetail', boardId],
      queryFn: async () => {
        const response = await api.get(`/board/${boardId}`);
        return response.data;
      },
      enabled: !!boardId,
    });

  return { boardDetail, boardDetailLoading };
};

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
