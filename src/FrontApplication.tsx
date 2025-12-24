import QueryProvider from "./app/provider/queryProvider";
import RouteProvider from "./app/provider/RouteProvider";

function FrontApplication() {
  return (
    <QueryProvider>
      <RouteProvider />
    </QueryProvider>
  );
}

export default FrontApplication;
