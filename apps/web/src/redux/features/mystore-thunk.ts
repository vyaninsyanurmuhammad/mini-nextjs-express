import { getToken } from '@/lib/jwt';
import { EventForm, FetchEvent } from '@/models/event-model';
import { FetchUser } from '@/models/user-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addEventThunk = createAsyncThunk(
  'mystore/addEvent',
  async (event: EventForm) => {
    try {
      const token = await getToken();

      console.log(`Bearer ${token}`);
      console.log(`Event`, event);

      const formData = new FormData();
      formData.append('title', event.title);
      formData.append('description', event.description);
      formData.append('location', event.location);
      formData.append('price', event.price.toString());
      formData.append('dateTime', event.dateTime.toString());
      formData.append('categories', JSON.stringify(event.category));
      formData.append('dimensionX', event.dimensionX.toString());
      formData.append('dimensionY', event.dimensionY.toString());
      formData.append('file', event.thumbnail);

      console.log(formData);

      const res = await axios.post(
        'http://localhost:8000/event-management/event',
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const resData: FetchEvent = res.data;

      // login(res.data.data.tokens);

      console.log(resData);

      return resData.data;
    } catch (error) {
      return undefined;
    }
  },
);

export const getEventsThunk = createAsyncThunk(
  'mystore/getEvents',
  async () => {
    try {
    } catch (error) {
      return undefined;
    }
  },
);
