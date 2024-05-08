import { createSlice } from '@reduxjs/toolkit';
import { FetchPoint } from '@/models/point-model';
import { getDiscountsThunk, getPointThunk } from './app-thunk';
import { FetchDiscount } from '@/models/discount-model';
import { addEventThunk } from './mystore-thunk';
import { Data as DataEvent } from '@/models/event-model';

type InitialState = {
  events: DataEvent[];
  isFetchEventLoading: boolean;
};

const initialState: InitialState = {
  events: [],
  isFetchEventLoading: false,
};

const mystoreSlice = createSlice({
  name: 'mystore',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addEventThunk.pending, (state) => {
      state.isFetchEventLoading = true;
    });
    builder.addCase(addEventThunk.fulfilled, (state, action) => {
      if (action.payload) state.events = [...state.events, action.payload];
      state.isFetchEventLoading = false;
    });
    builder.addCase(addEventThunk.rejected, (state) => {
      state.isFetchEventLoading = false;
    });
  },
});

export const {} = mystoreSlice.actions;
export default mystoreSlice.reducer;
