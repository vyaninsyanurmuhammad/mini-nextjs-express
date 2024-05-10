import { createSlice } from '@reduxjs/toolkit';
import { Data as DataEvent, DataEventDetail } from '@/models/event-model';

type InitialState = {
  events: DataEvent[];
};

const initialState: InitialState = {
  events: [],
};

const mystoreSlice = createSlice({
  name: 'myticket',
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export const {} = mystoreSlice.actions;
export default mystoreSlice.reducer;
