import { cn } from '@/shared';
import BrandProductItem from './BrandProductItem';

export default function BrandProducts({ data }: { data: any }) {
  console.log(data);

  return (
    <div
      className={cn(
        'brand__products__wrapper',
        data?.result.content.length > 0 ? 'grid grid-cols-4 gap-[20px]' : '',
      )}
    >
      {data?.result.content.map((product: any) => (
        <BrandProductItem key={product.productId} data={product} />
      ))}
    </div>
  );
}
