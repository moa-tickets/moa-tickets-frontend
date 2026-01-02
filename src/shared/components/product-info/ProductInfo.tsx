import { cn } from '@/shared';

const ProductInfo = ({
  iconComponent,
  title,
  value,
  isLine,
}: {
  iconComponent: React.ReactNode;
  title: string;
  value: number;
  isLine?: boolean;
}) => {
  return (
    <li
      className={cn(
        'flex gap-5 items-center px-[35px]',
        isLine &&
          'relative after:content-[""] after:absolute after:top-0 after:bottom-0 after:my-auto after:right-0 after:w-[1px] after:h-[16px] after:bg-[#cfd0d7]',
      )}
    >
      {iconComponent}
      <div className={cn('product__info__text flex flex-col items-center')}>
        <span className={cn('text-[14px] font-bold')}>{title}</span>
        <span className={cn('font-bold text-[#fa2828] text-[20px]')}>
          {value}
        </span>
      </div>
    </li>
  );
};

export default ProductInfo;
