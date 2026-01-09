import { cn } from '@/shared';
import BannerSlides from '@/widgets/banner-slides/BannerSlides';
import SearchBar from '@/widgets/search-bar/SearchBar';
import { Link } from 'react-router-dom';
import OptimizedImage from '@/shared/components/optimized-image/OptimizedImage';

const TopHeader = () => {
  return (
    <div className={cn('top__header__wrapper w-full')}>
      <div
        className={cn(
          'top__header h-[90px] max-w-[1080px] mx-auto flex items-center',
        )}
      >
        <Link to="/">
          <OptimizedImage
            className="w-[89px] h-[25px]"
            src="/logo.svg"
            alt="logo"
            lazy
          />
        </Link>
        <SearchBar />
        <BannerSlides />
      </div>
    </div>
  );
};

export default TopHeader;
