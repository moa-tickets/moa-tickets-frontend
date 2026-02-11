import { useEffect, useState } from 'react';
import QueryProvider from './app/provider/QueryProvider';
import ReduxStoreProvider from './app/provider/ReduxProvider';
import RouteProvider from './app/provider/RouteProvider';
import { cn } from './shared';

function FrontApplication() {
  const [isAppLoad, setIsAppLoad] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAppLoad(true);
    }, 1000); // 1초 대기 후 로딩 완료 처리

    return () => clearTimeout(timeout);
  }, []);

  if (!isAppLoad) {
    return (
      <div
        className={cn(
          'loading-screen',
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center',
        )}
      >
        <img src={'/girlShadow.gif'} alt="loading" className="w-[170px]" />
        <span className="mt-4 text-gray-500 animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <QueryProvider>
      <ReduxStoreProvider>
        <RouteProvider />
      </ReduxStoreProvider>
    </QueryProvider>
  );
}

export default FrontApplication;
