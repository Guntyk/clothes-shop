import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrdersService from 'services/OrdersService';

const initialState = {
  orders: [],
  error: null,
  isLoading: false,
};

export const getOrders = createAsyncThunk('orders', async (_, { rejectWithValue }) => {
  const { result, error } = await OrdersService.getOrders();

  if (result) {
    return result;
  }

  return rejectWithValue(error || 'An error occurred while getting orders data. Please try again later');
});

export const deleteOrder = createAsyncThunk('orders/delete', async (id, { rejectWithValue }) => {
  console.log(id);
  const { result, error } = await OrdersService.deleteOrder(id);

  if (result) {
    return result;
  }

  return rejectWithValue(error || 'An error occurred while deleting order data. Please try again later');
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = [];
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.orders = [];
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.orders = state.orders.filter(({ id }) => action.payload.id !== id);
        state.error = [];
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
export const { actions } = ordersSlice;
