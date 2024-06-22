import { configureStore } from '@reduxjs/toolkit';
import clothesSlice from './features/clothesSlice';
import ordersSlice from './features/ordersSlice';
import userSlice from './features/userSlice';

const store = configureStore({
  reducer: {
    clothes: clothesSlice,
    orders: ordersSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export default store;
