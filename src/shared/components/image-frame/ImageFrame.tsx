import { cn } from '@/shared';

const ImageFrame = ({
  imgComponent,
  w,
  h,
}: {
  imgComponent: React.ReactNode;
  w?: number;
  h?: number;
}) => {
  return (
    <div
      className={cn('image__component')}
      style={{ width: `${w}px`, height: `${h}px` }}
    >
      {imgComponent}
    </div>
  );
};

export default ImageFrame;
