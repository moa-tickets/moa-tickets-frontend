import { useEffect, useState } from 'react';
import { cn } from '@/shared';
import { FaStar } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, OPEN_MODAL } from '@/entities/reducers/ModalReducer';
import type { ModalState } from '@/entities/types/types';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import { useReview } from '@/features/review/useReview';
import { useParams } from 'react-router-dom';

interface Score {
  bool: boolean;
  index: number;
}

export default function AudienceReviewInput() {
  const initialScore = [
    {
      bool: false,
      index: 0,
    },
    {
      bool: false,
      index: 1,
    },
    {
      bool: false,
      index: 2,
    },
    {
      bool: false,
      index: 3,
    },
    {
      bool: false,
      index: 4,
    },
  ];

  const { id } = useParams<{ id: string }>();

  const [selectedScore, setSelectedScore] = useState<Score[]>(initialScore);
  const [computedScore, setComputedScore] = useState<number>(0);
  const [computedContent, setComputedContent] = useState<string>('');

  const dispatch = useDispatch();

  const { reviewWrite, reviewWritePending } = useReview();

  const { isOpen, title, message } = useSelector(
    (state: { modalReducer: ModalState }) => state.modalReducer,
  );

  const clickChange = (index: number) => {
    setSelectedScore((prev: Score[]) =>
      prev.map((p: Score, i) => (i === index ? { ...p, bool: !p.bool } : p)),
    );
  };

  const submit = () => {
    if (computedContent.trim() === '' || computedScore === 0) {
      dispatch({
        type: OPEN_MODAL,
        payload: {
          title: '오류',
          message:
            '1000자 이상으로 입력할 수 없거나, 점수를 반드시 포함해주세요.',
        },
      });
    } else {
      reviewWrite.mutate({
        concertId: Number(id),
        score: computedScore,
        content: computedContent,
      });
      setSelectedScore(initialScore);
      setComputedScore(0);
      setComputedContent('');
    }
  };

  useEffect(() => {
    setComputedScore(0);
    selectedScore.forEach((ele: Score) => {
      if (ele.bool) {
        setComputedScore((prev) => prev + 1);
      }
    });
  }, [selectedScore]);

  useEffect(() => {
    if (computedContent.length > 1000) {
      dispatch({
        type: OPEN_MODAL,
        payload: {
          title: '오류',
          message: '1000자 이상으로 입력하실 수 없습니다.',
        },
      });
    }
  }, [computedContent, dispatch]);

  return (
    <>
      {isOpen && (
        <ConfirmModal
          title={title!}
          message={message}
          isOpen={isOpen}
          onClose={() => {
            dispatch({ type: CLOSE_MODAL });
            setComputedContent((prev) => prev.slice(0, 1000));
          }}
        />
      )}
      <div className={cn('audience__review__input')}>
        <span
          className={cn(
            'text-[12px] text-[rgb(137,137,137)] inline-block mb-[20px]',
          )}
        >
          게시판 운영규정에 맞지 않는 글은 사전에 무통보로 삭제될 수 있습니다.
        </span>
        <div
          className={cn(
            'audience__review__box',
            'w-full h-[150px] border border-solid border-black rounded-[4px] p-[10px] mb-[30px]',
          )}
        >
          <div
            className={cn(
              'audience__review__score',
              'flex gap-[10px] items-center',
            )}
          >
            <ul
              className={cn(
                'audience__review__score__btn',
                'flex gap-[4px] items-center',
              )}
            >
              {selectedScore.map((s: Score, i) => (
                <button
                  key={s.index}
                  onClick={() => clickChange(i)}
                  className={cn('cursor-pointer')}
                >
                  {s.bool ? <FaStar /> : <FaStar style={{ opacity: '.45' }} />}
                </button>
              ))}
            </ul>
            <span className={cn('text-[14px]')}>{computedScore}점</span>
          </div>
          <textarea
            placeholder={'관람 후기를 남겨보세요'}
            value={computedContent}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComputedContent(e.target.value)
            }
            className={cn(
              'w-full h-[60px] mt-[10px] resize-none outline-none border-b border-solid border-[rgb(237,237,237)]',
              'text-[12px]',
            )}
          />
          <div
            className={cn(
              'audience__review__btn',
              'mt-[10px] flex items-center gap-[14px] justify-end',
            )}
          >
            <span className={cn('text-[12px]')}>
              {computedContent.length}/1000
            </span>
            <button
              className={cn(
                'text-[12px] w-[50px] py-[3px] bg-black text-white rounded-[6px]',
                'cursor-pointer',
                'disabled:opacity-45',
              )}
              onClick={submit}
              disabled={reviewWritePending}
            >
              {reviewWritePending ? '처리 중...' : '등록'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
