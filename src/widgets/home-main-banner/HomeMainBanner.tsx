import { useHomeProduct } from '@/features/home-product/useHomeProduct';
import { cn } from '@/shared';
import HomeMainList from './HomeMainList';
import HomeMainListSkeleton from './HomeMainListSkeleton';

export default function HomeMainBanner({
  title,
  keyword,
}: Readonly<{ title: string; keyword: string }>) {
  const { products, isProductsLoading } = useHomeProduct(12, keyword);

  return (
    <div className={cn('home__main__banner', 'relative mt-[30px]')}>
      <h2
        className={cn(
          'home__main__banner__title text-[26px] font-bold mb-[50px]',
        )}
      >
        {title}
      </h2>
      <button
        className={cn('absolute top-0 right-0 cursor-pointer text-[14px]')}
      >
        전체보기
      </button>
      {isProductsLoading ? (
        <HomeMainListSkeleton />
      ) : (
        products?.result?.content && <HomeMainList products={products} />
      )}
    </div>
  );
}
