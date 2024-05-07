import { createSlice } from '@reduxjs/toolkit';
import { FetchPoint } from '@/models/point-model';
import { getPointThunk } from './app-thunk';

type InitialState = {
  point?: FetchPoint;
  getPointLoading: boolean;
};

const initialState: InitialState = {
  point: undefined,
  getPointLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    pointDismiss: (state) => {
      console.log('dismiss');
      state.point = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(getPointThunk.pending, (state, action) => {
      state.getPointLoading = true;
    });
    builder.addCase(getPointThunk.fulfilled, (state, action) => {
      state.point = action.payload;
      state.getPointLoading = false;
    });
    builder.addCase(getPointThunk.rejected, (state, action) => {
      state.getPointLoading = false;
    });
  },
});

export const { pointDismiss } = appSlice.actions;
export default appSlice.reducer;
