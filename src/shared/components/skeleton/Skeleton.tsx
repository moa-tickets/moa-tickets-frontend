import { cn } from '@/shared';

const Skeleton = ({ className }: { className: string }) => {
  return <div className={cn(className, 'animate-pulse')}></div>;
};

export default Skeleton;
