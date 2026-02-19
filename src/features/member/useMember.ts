import { GET_MEMBER, LOGOUT } from '@/entities/reducers/LoginReducer';
import { api } from '@/shared/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

interface MemberResponse {
  nickname: string;
  email: string;
  seller: boolean;
}

export const useMember = () => {
  const dispatch = useDispatch();

  const getMember = useMutation<MemberResponse>({
    mutationFn: async () => {
      const response = await api.get('/members/me');
      return response.data;
    },
    onSuccess: (data: MemberResponse) => {
      dispatch({
        type: GET_MEMBER,
        payload: {
          nickname: data.nickname,
          email: data.email,
          isSeller: data.seller,
        },
      });
    },
  });

  const logoutMember = useMutation<void>({
    mutationFn: async () => {
      await api.post('/logout');
    },
    onSuccess: () => {
      dispatch({ type: LOGOUT });
    },
  });

  return { getMember, getMemberPending: getMember.isPending, logoutMember };
};
