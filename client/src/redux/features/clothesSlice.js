import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ClothesService from 'services/ClothesService';

const initialState = {
  clothes: [],
  error: null,
  isLoading: false,
};

export const getClothes = createAsyncThunk('clothes', async (_, { rejectWithValue }) => {
  const { result, error } = await ClothesService.getClothes();

  if (result) {
    return result;
  }

  return rejectWithValue(error || 'An error occurred while getting clothes data. Please try again later');
});

const clothesSlice = createSlice({
  name: 'clothes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getClothes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClothes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clothes = action.payload;
        state.error = [];
      })
      .addCase(getClothes.rejected, (state, action) => {
        state.isLoading = false;
        state.users = [];
        state.error = action.payload;
      });
  },
});

export default clothesSlice.reducer;
export const { actions } = clothesSlice;
