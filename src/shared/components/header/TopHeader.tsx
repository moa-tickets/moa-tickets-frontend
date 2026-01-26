import { cn } from '@/shared';
import BannerSlides from '@/widgets/banner-slides/BannerSlides';
import SearchBar from '@/widgets/search-bar/SearchBar';
import LogoLink from './LogoLink';

const TopHeader = () => {
  return (
    <div className={cn('top__header__wrapper w-full')}>
      <div
        className={cn(
          'top__header h-[90px] max-w-[1080px] mx-auto flex items-center',
        )}
      >
        <LogoLink />
        <SearchBar />
        <BannerSlides />
      </div>
    </div>
  );
};

export default TopHeader;
