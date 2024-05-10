import { createSlice } from '@reduxjs/toolkit';
import { FetchPoint } from '@/models/point-model';
import {
  getDetailEventThunk,
  getDiscountsThunk,
  getLatestEventsThunk,
  getPointThunk,
} from './app-thunk';
import { FetchDiscount } from '@/models/discount-model';
import { DataEventHome, DataEventHomeDetail } from '@/models/event-model';
import { SeatPositionType } from '@/models/seat-position-model';

type InitialState = {
  point?: FetchPoint;
  discount?: FetchDiscount;
  events: DataEventHome[];
  getPointLoading: boolean;
  getDiscountLoading: boolean;
  getEventsLoading: boolean;
  event?: DataEventHomeDetail;
  unavailableSeat: SeatPositionType[];
};

const initialState: InitialState = {
  point: undefined,
  discount: undefined,
  getPointLoading: false,
  getDiscountLoading: false,
  getEventsLoading: false,
  events: [],
  event: undefined,
  unavailableSeat: [],
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

    builder.addCase(getLatestEventsThunk.pending, (state, action) => {
      state.getEventsLoading = true;
    });
    builder.addCase(getLatestEventsThunk.fulfilled, (state, action) => {
      if (action.payload) state.events = [...action.payload];
      state.getEventsLoading = false;
    });
    builder.addCase(getLatestEventsThunk.rejected, (state, action) => {
      state.getEventsLoading = false;
    });

    builder.addCase(getDetailEventThunk.pending, (state, action) => {
      state.getEventsLoading = true;
    });
    builder.addCase(getDetailEventThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.event = action.payload;

        action.payload.EventTransaction.forEach((data) => {
            state.unavailableSeat = [
              ...state.unavailableSeat,
              ...data.TicketTransaction.map((tik) => {
                return { x: tik.seatNumberX, y: tik.seatNumberY };
              }),
            ];
          });
        
      }
      state.getEventsLoading = false;
    });
    builder.addCase(getDetailEventThunk.rejected, (state, action) => {
      state.getEventsLoading = false;
    });
  },
});

export const { pointDismiss, discountDismiss } = appSlice.actions;
export default appSlice.reducer;
