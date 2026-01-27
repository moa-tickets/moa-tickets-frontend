import { cn } from '@/shared/lib/utils';

const ViewSelector = ({
  title,
  element,
}: {
  title: string;
  element: React.ReactNode;
}) => {
  return (
    <div className={cn('view__selector', 'flex gap-[10px] items-center')}>
      <span className="text-[14px]">{title}</span>
      {element}
    </div>
  );
};

export default ViewSelector;
