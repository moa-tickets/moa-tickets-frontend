import { useLoginData } from '@/entities/stores/useLoginData';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type UserData = {
  email: string;
  nickname: string;
  seller: boolean;
};

export const useLoginDataFunction = () => {
  const { setUserData, setIsLoggedIn } = useLoginData();

  const goSeller = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        'http://localhost:8080/api/members/seller',
        {},
        { withCredentials: true },
      );
    },
  });

  const getLoginData = useMutation<UserData>({
    mutationFn: async () => {
      const res = await axios.get('http://localhost:8080/api/members/me', {
        withCredentials: true,
      });
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
