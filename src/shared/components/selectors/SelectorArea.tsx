import { cn } from '@/shared/lib/utils';

const SelectorArea = ({
  title,
  area,
}: {
  title: string;
  area: React.ReactNode;
}) => {
  return (
    <div className={cn('selector__area', 'mt-[26px]')}>
      <h2 className={cn('font-bold')}>{title}</h2>
      {area}
    </div>
  );
};

export default SelectorArea;
