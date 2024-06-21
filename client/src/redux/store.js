import { configureStore } from '@reduxjs/toolkit';
import clothesSlice from './features/clothesSlice';
import ordersSlice from './features/ordersSlice';

const store = configureStore({
  reducer: {
    clothes: clothesSlice,
    orders: ordersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export default store;
