import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../lazy-loading/LazyImage';
import Skeleton from '../skeleton/Skeleton';

const LogoLink = React.memo(() => {
  return (
    <Link to="/">
      <LazyImage
        className="w-[89px] h-[25px]"
        src="/logo.svg"
        alt="logo"
        skeletonComponent={<Skeleton className="w-full h-full bg-[#ccc]" />}
      />
    </Link>
  );
});

export default LogoLink;
