import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './entities/reducers';

function renderWithRedux(ui: React.ReactNode, initialState = {}) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
  const utils = render(<Provider store={store}>{ui}</Provider>);
  return {
    ...utils,
    store,
  };
}

export default renderWithRedux;
