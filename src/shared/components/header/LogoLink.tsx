import { Link } from 'react-router-dom';
import LazyImage from '../lazy-loading/LazyImage';
import Skeleton from '../skeleton/Skeleton';

const LogoLink = () => {
  return (
    <Link to="/">
      <LazyImage
        className="w-[89px]"
        src="/logo.svg"
        alt="logo"
        skeletonComponent={<Skeleton className="w-full h-full bg-[#ccc]" />}
      />
    </Link>
  );
};

export default LogoLink;
