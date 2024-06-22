import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UsersService from 'services/UsersService';

const initialState = {
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
};

export const registerUser = createAsyncThunk('users/register', async (newUser, { rejectWithValue }) => {
  const { result, error } = await UsersService.registerUser(newUser);

  if (result) {
    return result;
  }

  return rejectWithValue(error || 'An error occurred while user registration. Please try again later');
});

export const loginUser = createAsyncThunk('users/login', async (userData, { rejectWithValue }) => {
  const { result, error } = await UsersService.loginUser(userData);

  if (result) {
    return result;
  }

  return rejectWithValue(error || 'An error occurred while user logging. Please try again later');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      window.localStorage.removeItem('user');
    },
    checkAuth: (state) => {
      const user = JSON.parse(window.localStorage.getItem('user'));
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true;
        window.localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true;
        window.localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { actions } = userSlice;
