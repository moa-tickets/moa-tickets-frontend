import { useLoginData } from '@/entities/stores/useLoginData';
import { api } from '@/shared/lib/api';
import { useMutation } from '@tanstack/react-query';

type UserData = {
  email: string;
  nickname: string;
  seller: boolean;
};

export const useLoginDataFunction = () => {
  const { setUserData, setIsLoggedIn } = useLoginData();

  const goSeller = useMutation({
    mutationFn: async () => {
      await api.post('/members/seller', {});
    },
  });

  const getLoginData = useMutation<UserData>({
    mutationFn: async () => {
      const res = await api.get('/members/me');
      return res.data;
    },
    onSuccess: (data: UserData) => {
      setUserData(data);
      setIsLoggedIn(true);
    },
    onError: () => {
      setIsLoggedIn(false);
      setUserData({ email: '', nickname: '', seller: false });
      localStorage.removeItem('login-storage');
    },
  });

  return { getLoginData, goSeller };
};
