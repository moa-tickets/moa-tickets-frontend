import { useEffect, useState } from 'react';
import { cn } from '@/shared';
import { FaStar } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, OPEN_MODAL } from '@/entities/reducers/ModalReducer';
import type { ModalState } from '@/entities/types/types';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import { useReview } from '@/features/review/useReview';
import { useParams } from 'react-router-dom';


export default function AudienceReviewKeywordsTop7() {
  
  return (
    <>
      <div className={cn('audience__review__positive')}>
        <span
          className={cn(
            'text-[16px] text-[rgb(54, 61, 255)] inline-block mb-[0px]',
          )}
        >
          긍정 
        </span>
        <ul className={cn('flex gap-4')}>
          <li>
            <span
              className={cn(
                'text-[12px] text-[rgb(137,137,137)] inline-block mb-[20px]',
              )}
            >
              긍정 키워드 7개
            </span>
          </li>
        </ul>
        
      </div>
      <div className={cn('audience__review__negative')}>
        <span
          className={cn(
            'text-[16px] text-[rgb(0, 0, 0)] inline-block mb-[0px]',
          )}
        >
          부정
        </span>
        <ul className={cn('flex gap-4')}>
          <li>
            <span
              className={cn(
                'text-[12px] text-[rgb(137,137,137)] inline-block mb-[20px]',
              )}
            >
              부정 키워드 7개
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
