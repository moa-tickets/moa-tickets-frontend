import { useHomeProduct } from '@/features/home-product/useHomeProduct';
import { cn } from '@/shared';
import ImageBox from './ImageBox';
import BrandProducts from './BrandProducts';

export default function BrandBanner({ title }: { title: string }) {
  const { potatoProducts, isPotatoProductsLoading } = useHomeProduct(title);

  return (
    <div className={cn('brand__banner mt-[30px] flex gap-[60px]')}>
      <div className={cn('brand__title')}>
        <ImageBox
          imgElement={
            <img
              src={'/products/potato.jpg'}
              alt="potato"
              className={'w-full h-full object-cover'}
            />
          }
          boxSize={290}
        />
        <p className={cn('mt-[20px]', 'text-[26px] font-bold mb-[20px]')}>
          월간 감자
        </p>
        <span className={cn('text-[18px] font-semilight')}>
          감자로 이루어진 상품들을 만나보는 기회!
        </span>
      </div>
      <div className={cn('brand__products flex-1')}>
        <BrandProducts data={potatoProducts} />
      </div>
    </div>
  );
}
