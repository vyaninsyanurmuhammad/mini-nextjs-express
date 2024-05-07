import { createSlice } from '@reduxjs/toolkit';
import { getSessionThunk, logOutThunk, signInThunk, signUpThunk } from './auth-thunk';
import { User } from '@/models/user-model';

type InitialState = {
  user?: User;
  isAuthLoading: boolean;
};

const initialState: InitialState = {
  user: undefined,
  isAuthLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signInThunk.pending, (state, action) => {
      state.isAuthLoading = true;
    });
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthLoading = false;
    });
    builder.addCase(signInThunk.rejected, (state, action) => {
      state.isAuthLoading = false;
    });
    builder.addCase(signUpThunk.pending, (state, action) => {
      state.isAuthLoading = true;
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthLoading = false;
    });
    builder.addCase(signUpThunk.rejected, (state, action) => {
      state.isAuthLoading = false;
    });
    builder.addCase(getSessionThunk.pending, (state, action) => {
      state.isAuthLoading = true;
    });
    builder.addCase(getSessionThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthLoading = false;
    });
    builder.addCase(getSessionThunk.rejected, (state, action) => {
      state.isAuthLoading = false;
    });
    builder.addCase(logOutThunk.pending, (state, action) => {
      state.isAuthLoading = true;
    });
    builder.addCase(logOutThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthLoading = false;
    });
    builder.addCase(logOutThunk.rejected, (state, action) => {
      state.isAuthLoading = false;
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
