import { cn } from '@/shared';

const SeatItem = ({
  hi,
  foundSession,
}: {
  hi: number;
  foundSession: {
    sessionId: number;
    price: number;
    date: string;
  };
}) => {
  return (
    <div
      className={cn(
        'seat__item',
        'w-full mt-[20px] bg-[#f8f9fa] p-[10px]',
        'flex justify-between items-center',
      )}
    >
      <span>
        {Math.floor(hi / 14)}열 {hi % 14}번
      </span>
      <span>{foundSession.price.toLocaleString()}원</span>
    </div>
  );
};

export default SeatItem;
