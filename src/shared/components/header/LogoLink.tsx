import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../lazy-loading/LazyImage';
import Skeleton from '../skeleton/Skeleton';

const LogoLink = React.memo(() => {
  return (
    <Link to="/">
      <LazyImage
        className="sm:w-[89px] w-[71px]"
        src="/logo.svg"
        alt="logo"
        skeletonComponent={
          <Skeleton className="w-full h-full bg-[#ccc] skeleton__component" />
        }
      />
    </Link>
  );
});

export default LogoLink;
