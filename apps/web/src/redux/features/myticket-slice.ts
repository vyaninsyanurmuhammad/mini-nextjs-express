import { createSlice } from '@reduxjs/toolkit';
import { EventTransactionTicket } from '@/models/event-model';
import { getTicketsActiveDetailThunk, getTicketsActiveThunk, getTicketsTransactionThunk, getTicketTransactionDetailThunk } from "./myticket-thunk";

type InitialState = {
  events: EventTransactionTicket[];
  event?: EventTransactionTicket;
  eventsTransaction: EventTransactionTicket[];
  eventTransaction?: EventTransactionTicket;
  isFetchEventLoading: boolean;
};

const initialState: InitialState = {
  events: [],
  eventsTransaction: [],
  event: undefined,
  eventTransaction: undefined,
  isFetchEventLoading: false,
};

const mystoreSlice = createSlice({
  name: 'myticket',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTicketsActiveThunk.pending, (state) => {
      state.isFetchEventLoading = true;
    });
    builder.addCase(getTicketsActiveThunk.fulfilled, (state, action) => {
      if (action.payload) state.events = [...action.payload];
      state.isFetchEventLoading = false;
    });
    builder.addCase(getTicketsActiveThunk.rejected, (state) => {
      state.isFetchEventLoading = false;
    });


    builder.addCase(getTicketsTransactionThunk.pending, (state) => {
      state.isFetchEventLoading = true;
    });
    builder.addCase(getTicketsTransactionThunk.fulfilled, (state, action) => {
      if (action.payload) state.eventsTransaction = [...action.payload];
      state.isFetchEventLoading = false;
    });
    builder.addCase(getTicketsTransactionThunk.rejected, (state) => {
      state.isFetchEventLoading = false;
    });



    builder.addCase(getTicketTransactionDetailThunk.pending, (state) => {
      state.isFetchEventLoading = true;
    });
    builder.addCase(getTicketTransactionDetailThunk.fulfilled, (state, action) => {
      if (action.payload) state.eventTransaction = action.payload;
      state.isFetchEventLoading = false;
    });
    builder.addCase(getTicketTransactionDetailThunk.rejected, (state) => {
      state.isFetchEventLoading = false;
    });


    builder.addCase(getTicketsActiveDetailThunk.pending, (state) => {
      state.isFetchEventLoading = true;
    });
    builder.addCase(getTicketsActiveDetailThunk.fulfilled, (state, action) => {
      if (action.payload) state.event = action.payload;
      state.isFetchEventLoading = false;
    });
    builder.addCase(getTicketsActiveDetailThunk.rejected, (state) => {
      state.isFetchEventLoading = false;
    });
  },
});

export const {} = mystoreSlice.actions;
export default mystoreSlice.reducer;
