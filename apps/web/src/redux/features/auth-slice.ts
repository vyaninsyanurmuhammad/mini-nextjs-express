import { createSlice } from '@reduxjs/toolkit';
import {
  getSessionThunk,
  logOutThunk,
  signInThunk,
  signUpOrganizerThunk,
  signUpThunk,
} from './auth-thunk';
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
    builder.addCase(signInThunk.pending, (state) => {
      state.isAuthLoading = true;
    });
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthLoading = false;
    });
    builder.addCase(signInThunk.rejected, (state) => {
      state.isAuthLoading = false;
    });

    builder.addCase(signUpThunk.pending, (state) => {
      state.isAuthLoading = true;
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthLoading = false;
    });
    builder.addCase(signUpThunk.rejected, (state) => {
      state.isAuthLoading = false;
    });

    builder.addCase(signUpOrganizerThunk.pending, (state) => {
      state.isAuthLoading = true;
    });
    builder.addCase(signUpOrganizerThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthLoading = false;
    });
    builder.addCase(signUpOrganizerThunk.rejected, (state) => {
      state.isAuthLoading = false;
    });

    builder.addCase(getSessionThunk.pending, (state) => {});
    builder.addCase(getSessionThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getSessionThunk.rejected, (state) => {});

    builder.addCase(logOutThunk.pending, (state) => {
      state.isAuthLoading = true;
    });
    builder.addCase(logOutThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthLoading = false;
    });
    builder.addCase(logOutThunk.rejected, (state) => {
      state.isAuthLoading = false;
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
