import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from '@/entities/reducers';

const store = configureStore({
  reducer: rootReducer,
});

const ReduxStoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default ReduxStoreProvider;
