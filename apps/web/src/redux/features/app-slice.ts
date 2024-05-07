import { createSlice } from '@reduxjs/toolkit';
import { FetchPoint } from '@/models/point-model';
import { getDiscountsThunk, getPointThunk } from './app-thunk';
import { FetchDiscount } from "@/models/discount-model";

type InitialState = {
  point?: FetchPoint;
  discount?: FetchDiscount;
  getPointLoading: boolean;
  getDiscountLoading: boolean;
};

const initialState: InitialState = {
  point: undefined,
  discount: undefined,
  getPointLoading: false,
  getDiscountLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    pointDismiss: (state) => {
      state.point = undefined;
    },
    discountDismiss: (state) => {
      state.discount = undefined;
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
    builder.addCase(getDiscountsThunk.pending, (state, action) => {
      state.getPointLoading = true;
    });
    builder.addCase(getDiscountsThunk.fulfilled, (state, action) => {
      state.discount = action.payload;
      state.getPointLoading = false;
    });
    builder.addCase(getDiscountsThunk.rejected, (state, action) => {
      state.getPointLoading = false;
    });
  },
});

export const { pointDismiss, discountDismiss } = appSlice.actions;
export default appSlice.reducer;
