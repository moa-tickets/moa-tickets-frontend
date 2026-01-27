import type { ProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/shared';
import ImageFrame from '@/shared/components/image-frame/ImageFrame';
import LazyImage from '@/shared/components/lazy-loading/LazyImage';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import SessionSelector from '../session-selector/SessionSelector';
import SubmitButton from '@/shared/components/submit-button/SubmitButton';

import type { LoginState } from '@/entities/reducers/LoginReducer';
import { CLOSE_MODAL, OPEN_MODAL } from '@/entities/reducers/ModalReducer';
import type { MainSeatInfo } from '@/entities/reducers/BookSeatReducer';
import { useNavigate, useParams } from 'react-router-dom';
import type { ModalState } from '@/entities/types/types';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';

const BookingInfoWrapper = ({ data }: { data: ProductDetail }) => {
  const { id } = useParams<{ id: string }>();

  const { isOpen, title, message } = useSelector(
    (state: { modalReducer: ModalState }) => state.modalReducer,
  );

  const { selectedSession } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

  const { holdedInfo } = useSelector(
    (state: { bookSeatReducer: MainSeatInfo }) => state.bookSeatReducer,
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goSubmitButton = () => {
    if (selectedSession.date === '' || holdedInfo.holdedIndex.length === 0) {
      dispatch({
        type: OPEN_MODAL,
        payload: { title: '경고', message: '세션 및 좌석을 먼저 선택하세요.' },
      });
    } else {
      navigate(`/detail/${Number(id)}/payment`);
    }
  };

  return (
    <>
      {isOpen && (
        <ConfirmModal
          title={title!}
          message={message}
          isOpen={isOpen}
          onClose={() => dispatch({ type: CLOSE_MODAL })}
        />
      )}
      <div
        className={cn(
          'booking__info__wrapper',
          'mt-[40px] flex justify-between mb-[30px] relative',
        )}
      >
        <ImageFrame
          imgComponent={
            <LazyImage
              src={data.thumbnail ?? '/placeholder.png'}
              alt={'detail-thumbnail'}
              className={'rounded-[10px] overflow-hidden'}
              skeletonComponent={
                <Skeleton className={'w-full h-full bg-[#ccc]'} />
              }
            />
          }
          w={300}
          h={400}
        />
        <SessionSelector data={data} />
        <SubmitButton
          title={'결제하기'}
          className="absolute left-0 top-[500px] w-[300px] cursor-pointer"
          onClick={goSubmitButton}
        />
      </div>
    </>
  );
};

export default BookingInfoWrapper;
