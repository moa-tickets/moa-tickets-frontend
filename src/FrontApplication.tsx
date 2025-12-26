import QueryProvider from './app/provider/QueryProvider';
import RouteProvider from './app/provider/RouteProvider';

function FrontApplication() {
  return (
    <QueryProvider>
      <RouteProvider />
    </QueryProvider>
  );
}

export default FrontApplication;
