import { cn } from '@/shared';
import BannerSlides from '@/widgets/banner-slides/BannerSlides';
import SearchBar from '@/widgets/search-bar/SearchBar';
import LogoLink from './LogoLink';
import MobileSearchButton from '@/widgets/search-bar/MobileSearchButton';

const TopHeader = () => {
  return (
    <div
      className={cn(
        'top__header__wrapper w-full',
        'border-b border-solid border-[rgba(0,0,0,.15)] sm:border-b-0',
      )}
    >
      <div
        className={cn(
          'top__header relative sm:h-[90px] h-[70px] max-w-[90%] md:max-w-[880px] lg:max-w-[1080px] mx-auto flex items-center',
        )}
      >
        <LogoLink />
        <SearchBar />
        <BannerSlides />
        <MobileSearchButton />
      </div>
    </div>
  );
};

export default TopHeader;
