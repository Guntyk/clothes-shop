import { configureStore } from '@reduxjs/toolkit';
import clothesSlice from './features/clothesSlice';

const store = configureStore({
  reducer: {
    clothes: clothesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export default store;
