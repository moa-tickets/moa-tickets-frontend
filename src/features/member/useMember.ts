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

  // 쿠키 기반 인증 상태 확인 함수 (사용자 정보도 함께 가져옴)
  const checkAuthStatus = useMutation<MemberResponse | null>({
    mutationFn: async () => {
      try {
        console.log('Checking auth status with httpOnly cookie...');
        const response = await api.get('/members/me');
        console.log('Auth status: authenticated - Response:', response.status, response.data);
        return response.data;
      } catch (error: any) {
        console.log('Auth status: not authenticated - Error:', error.response?.status, error.response?.data || error.message);
        return null;
      }
    },
    onSuccess: (userData: MemberResponse | null) => {
      console.log('Setting auth state:', userData ? 'logged in' : 'logged out');
      if (userData) {
        dispatch({ type: LOGIN });
        // 사용자 정보를 직접 저장 (중복 API 호출 방지)
        dispatch({
          type: GET_MEMBER,
          payload: {
            nickname: userData.nickname,
            email: userData.email,
            isSeller: userData.seller,
          },
        });
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
      } else {
        dispatch({ type: LOGOUT });
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
      }
    },
    onError: (error) => {
      console.error('checkAuthStatus mutation error:', error);
    }
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
