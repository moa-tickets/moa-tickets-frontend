import { cn } from '@/shared';
import BannerSlides from '@/widgets/banner-slides/BannerSlides';
import SearchBar from '@/widgets/search-bar/SearchBar';
import { Link, useLocation } from 'react-router-dom';
import OptimizedImage from '@/shared/components/lazy-loading/LazyImage';

const TopHeader = () => {
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
    }
  };

  return (
    <div className={cn('top__header__wrapper w-full')}>
      <div
        className={cn(
          'top__header h-[90px] max-w-[1080px] mx-auto flex items-center',
        )}
      >
        <Link to="/" onClick={handleLogoClick}>
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
