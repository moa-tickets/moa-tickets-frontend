import { cn } from '@/shared';
import SideBannerList from './SideBannerList';

export default function SideBanner() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1,
  ).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;

  return (
    <aside className={cn('side__banner mt-[30px] relative flex-1')}>
      <h2 className={cn('text-[26px] font-bold')}>인기 상품</h2>
      <h3 className={cn('text-[14px] text-[#333] mt-[4px] mb-[20px]')}>
        {formattedDate} 기준
      </h3>
      <button className={cn('absolute top-0 right-0')}>전체보기</button>
      <SideBannerList />
    </aside>
  );
}
