import { useEffect, useState } from 'react';
import QueryProvider from './app/provider/QueryProvider';
import ReduxStoreProvider from './app/provider/ReduxProvider';
import RouteProvider from './app/provider/RouteProvider';
import AppLoading from './widgets/app-loading/AppLoading';

function FrontApplication() {
  const [isAppLoad, setIsAppLoad] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAppLoad(true);
    }, 1000); // 1초 대기 후 로딩 완료 처리

    return () => clearTimeout(timeout);
  }, []);

  if (!isAppLoad) {
    return <AppLoading />;
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
