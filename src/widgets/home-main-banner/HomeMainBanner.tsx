import { useHomeProduct } from '@/features/home-product/useHomeProduct';
import { cn } from '@/shared';
import HomeMainList from './HomeMainList';

export default function HomeMainBanner({ title }: { title: string }) {
  const { potatoProducts, isPotatoProductsLoading } = useHomeProduct();

  return (
    <div className={cn('home__main__banner', 'relative')}>
      <h2
        className={cn(
          'home__main__banner__title text-[20px] font-bold mb-[20px] mt-[30px]',
        )}
      >
        {title}
      </h2>
      {!isPotatoProductsLoading && potatoProducts?.result?.content && (
        <HomeMainList products={potatoProducts} />
      )}
      <button
        className={cn(
          'absolute bottom-[-100px] w-[200px] border border-[#ccc] border-solid rounded-[40px]',
          'text-[14px] py-[10px]',
          'left-0 right-0 mx-auto',
          'hover:bg-black hover:text-white transition-colors duration-300',
          'cursor-pointer',
        )}
      >
        전체 확인하기
      </button>
    </div>
  );
}
