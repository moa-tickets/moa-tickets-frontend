import Skeleton from '@/shared/components/skeleton/Skeleton';

const DetailSkeleton = () => {
  return (
    <div className="detail__skeleton__wrapper w-full">
      <div className="detail__skeleton__inner max-w-[1080px] mx-auto pt-[10px]">
        <Skeleton className="w-[300px] h-[30px] bg-[#ccc] rounded-[4px] mb-[30px]" />
        <Skeleton className="w-[120px] h-[40px] bg-[#ccc] rounded-[4px] mb-[20px]" />
        <Skeleton className="w-[80px] h-[30px] bg-[#ccc] rounded-[4px] mb-[30px]" />
        <div className="detail__skeleton__add__wrapper flex gap-[100px]">
          <Skeleton className="w-[300px] h-[400px] bg-[#ccc] rounded-[4px]" />
          <Skeleton className="w-[300px] h-[400px] bg-[#ccc] rounded-[4px]" />
          <Skeleton className="w-[300px] h-[400px] bg-[#ccc] rounded-[4px]" />
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
