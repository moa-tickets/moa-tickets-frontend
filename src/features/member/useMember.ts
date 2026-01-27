import { GET_MEMBER, LOGOUT } from '@/entities/reducers/LoginReducer';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
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
      const response = await axios.get(`/api/members/me`);
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

  const logoutMember = () => {
    Cookies.remove('Authorization');
    dispatch({ type: LOGOUT });
  };

  return { getMember, getMemberPending: getMember.isPending, logoutMember };
};
