import { cn } from '@/shared';
import IconButton from '../icon-button/IconButton';
import Icon from '@/shared/lib/Icon';

const BottomHeader = () => {
  return (
    <div className={cn('bottom__header__wrapper w-full h-[60px] bg-[#fbfbfb]')}>
      <div
        className={cn(
          'bottom__header max-w-[1080px] h-full mx-auto flex gap-3 items-center',
        )}
      >
        <IconButton
          iconComponent={
            <Icon ICON="PROFILE" className={'w-5 h-5 fill-none'} />
          }
          text={'로그인'}
        />
        <IconButton
          iconComponent={<Icon ICON="TICKET" className={'w-5 h-5 fill-none'} />}
          text={'내 예약'}
        />
      </div>
    </div>
  );
};

export default BottomHeader;
