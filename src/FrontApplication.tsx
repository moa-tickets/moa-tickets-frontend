import QueryProvider from './app/provider/QueryProvider';
import ReduxStoreProvider from './app/provider/ReduxProvider';
import RouteProvider from './app/provider/RouteProvider';

function FrontApplication() {
  return (
    <QueryProvider>
      <ReduxStoreProvider>
        <RouteProvider />
      </ReduxStoreProvider>
    </QueryProvider>
  );
}

export default FrontApplication;
