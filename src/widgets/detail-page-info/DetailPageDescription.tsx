import type { ProductSession } from '@/entities/reducers/ConcertDetailReducer';
import { cn } from '@/shared';
import { BiCaretRight } from 'react-icons/bi';
import DetailPriceList from './DetailPriceList';

const DetailPageDescription = ({
  title,
  data,
  isPrice,
  isSession,
  buttonClick,
}: {
  title: string;
  data: string | ProductSession[];
  isPrice?: boolean;
  isSession?: boolean;
  buttonClick?: () => void;
}) => {
  return (
    <dl
      className={cn(
        'flex font-semilight mb-[20px]',
        isSession && 'items-center',
      )}
    >
      <dd
        className={cn(
          'w-[100px]',
          isSession ? 'text-[14px] text-[rgb(102,102,102)]' : '',
        )}
      >
        {title}
      </dd>
      {isPrice ? (
        <dt>
          <button
            className={cn(
              'font-bold cursor-pointer flex gap-[6px] items-center',
            )}
            onClick={buttonClick}
          >
            <span>전체가격보기</span>
            <BiCaretRight />
          </button>
          <DetailPriceList list={data as ProductSession[]} />
        </dt>
      ) : (
        <dt>{data as string}</dt>
      )}
    </dl>
  );
};

export default DetailPageDescription;
