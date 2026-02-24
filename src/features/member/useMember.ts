import { GET_MEMBER, LOGOUT, LOGIN } from '@/entities/reducers/LoginReducer';
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

  // 쿠키 기반 인증 상태 확인 함수
  const checkAuthStatus = useMutation<boolean>({
    mutationFn: async () => {
      try {
        console.log('Checking auth status with httpOnly cookie...');
        await api.get('/members/me');
        console.log('Auth status: authenticated');
        return true;
      } catch (error) {
        console.log('Auth status: not authenticated', error);
        return false;
      }
    },
    onSuccess: (isAuthenticated: boolean) => {
      console.log('Setting auth state:', isAuthenticated ? 'logged in' : 'logged out');
      if (isAuthenticated) {
        dispatch({ type: LOGIN });
        getMember.mutate();
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
      } else {
        dispatch({ type: LOGOUT });
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
      }
    },
  });

  const logoutMember = useMutation<void>({
    mutationFn: async () => {
      await api.post('/logout');
    },
    onSuccess: () => {
      dispatch({ type: LOGOUT });
      localStorage.setItem('isLoggedIn', JSON.stringify(false));
    },
    onError: () => {
      // 서버 로그아웃 실패해도 클라이언트에서는 로그아웃 처리
      dispatch({ type: LOGOUT });
      localStorage.setItem('isLoggedIn', JSON.stringify(false));
    },
  });

  return { 
    getMember, 
    getMemberPending: getMember.isPending, 
    logoutMember,
    checkAuthStatus
  };
};
