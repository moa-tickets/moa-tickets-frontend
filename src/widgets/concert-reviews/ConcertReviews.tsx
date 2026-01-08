import { useReview } from '@/features/review/useReview';
import { cn } from '@/shared';
import { useEffect } from 'react';

const ConcertReviews = () => {
  const { writeReview, getReviews, reviews } = useReview();

  useEffect(() => {
    getReviews.mutate();
  }, []);

  const handleSubmit = () => {
    writeReview.mutate();
  };

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < score ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    ));
  };

  return (
    <div className={cn('concert__reviews w-full')}>
      <div
        className={cn(
          'concert__reviews__putting w-[80%] mx-auto flex gap-[10px]',
        )}
      >
        <input
          type="text"
          placeholder="리뷰를 입력하세요."
          className="p-4 outline-none border border-gray-300 rounded-md flex-1"
        />
        <button
          type="button"
          className="w-[100px] py-[10px] bg-[#4154FF] text-white rounded-md cursor-pointer"
          onClick={handleSubmit}
        >
          리뷰 작성
        </button>
      </div>
      <ul className="concert__reviews__list w-[80%] mx-auto mt-[20px] flex flex-col gap-[15px]">
        {getReviews.isPending && (
          <div className="flex justify-center py-[20px]">
            <span className="text-gray-400">리뷰를 불러오는 중...</span>
          </div>
        )}
        {!getReviews.isPending && reviews.length === 0 && (
          <div className="flex flex-col items-center py-[40px]">
            <span className="text-[40px] mb-[10px]">💬</span>
            <span className="text-gray-400">아직 리뷰가 없습니다. 첫 리뷰를 작성해보세요!</span>
          </div>
        )}
        {reviews.map((review) => (
          <li
            key={review.reviewId}
            className="p-[16px] border border-gray-200 rounded-lg bg-white"
          >
            <div className="flex items-center gap-[10px] mb-[10px]">
              <span className="font-bold text-[16px]">{review.memberNickname}</span>
              <span className="text-[14px]">{renderStars(review.score)}</span>
            </div>
            <p className="text-[14px] text-gray-700 leading-relaxed">
              {review.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConcertReviews;
