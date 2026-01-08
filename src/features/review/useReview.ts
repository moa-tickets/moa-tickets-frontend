import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface Review {
  reviewId: number;
  concertName: string;
  memberNickname: string;
  score: number;
  content: string;
}

export const useReview = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const writeReview = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/reviews', {
        concertId: 1,
        score: 5,
        content: 'Great Concert!',
      });
      console.log('Write Review Response:', response.data);
    },
  });

  const getReviews = useMutation({
    mutationFn: async () => {
      const response = await axios.get(`/api/reviews?concertId=1`);
      console.log('Get Reviews Response:', response.data);
      return response.data;
    },
    onSuccess: (data) => {
      setReviews(data);
      writeReview.mutate();
    },
  });

  return { writeReview, getReviews, reviews };
};
