export type ReviewItem = {
  id: number;
  rating: number;
  username: string;
  isBooker: boolean;
  title: string;
  content: string;
  viewCount: number;
  date: string;
};

export type ReviewKeyword = {
  keyword: string;
  count: number;
};

export type ReviewAnalysis = {
  likes: ReviewKeyword[];
  dislikes: ReviewKeyword[];
};

export type ReviewData = {
  averageRating: number;
  reviews: ReviewItem[];
  analysis?: ReviewAnalysis;
};
