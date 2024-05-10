import { createSlice } from '@reduxjs/toolkit';
import { FetchPoint } from '@/models/point-model';
import { getDiscountsThunk, getPointThunk } from './app-thunk';
import { FetchDiscount } from '@/models/discount-model';
import { addEventThunk, getEventActiveDetailThunk, getEventsActiveThunk, getEventsInactiveThunk } from './mystore-thunk';
import { Data as DataEvent, DataEventDetail } from '@/models/event-model';

type InitialState = {
  events: DataEvent[];
  inactiveEvents: DataEvent[];
  isFetchEventLoading: boolean;
  event?: DataEventDetail;
};

const initialState: InitialState = {
  events: [],
  inactiveEvents: [],
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

    builder.addCase(getEventsActiveThunk.pending, (state) => {
      state.isFetchEventLoading = true;
    });
    builder.addCase(getEventsActiveThunk.fulfilled, (state, action) => {
      if (action.payload) state.events = [...action.payload];
      state.isFetchEventLoading = false;
    });
    builder.addCase(getEventsActiveThunk.rejected, (state) => {
      state.isFetchEventLoading = false;
    });


    builder.addCase(getEventsInactiveThunk.pending, (state) => {
      state.isFetchEventLoading = true;
    });
    builder.addCase(getEventsInactiveThunk.fulfilled, (state, action) => {
      if (action.payload) state.inactiveEvents = [...action.payload];
      state.isFetchEventLoading = false;
    });
    builder.addCase(getEventsInactiveThunk.rejected, (state) => {
      state.isFetchEventLoading = false;
    });


    builder.addCase(getEventActiveDetailThunk.pending, (state) => {
      state.isFetchEventLoading = true;
    });
    builder.addCase(getEventActiveDetailThunk.fulfilled, (state, action) => {
      if (action.payload) state.event = action.payload;
      state.isFetchEventLoading = false;
    });
    builder.addCase(getEventActiveDetailThunk.rejected, (state) => {
      state.isFetchEventLoading = false;
    });
  },
});

export const {} = mystoreSlice.actions;
export default mystoreSlice.reducer;
