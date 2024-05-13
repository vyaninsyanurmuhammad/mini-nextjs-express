import { getToken } from '@/lib/jwt';
import {
  EventForm,
  FetchEvent,
  FetchEventDetail,
  FetchEvents,
} from '@/models/event-model';
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
        'http://localhost:8000/event-management/store/event',
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

export const getEventsActiveThunk = createAsyncThunk(
  'mystore/getEventsActive',
  async () => {
    try {
      const token = await getToken();

      const res = await axios.get(
        'http://localhost:8000/event-management/store/events/active',
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const resData: FetchEvents = res.data;

      console.log(resData);

      return resData.data;
    } catch (error) {
      return undefined;
    }
  },
);

export const getEventsInactiveThunk = createAsyncThunk(
  'mystore/getEventsInactive',
  async () => {
    try {
      const token = await getToken();

      const res = await axios.get(
        'http://localhost:8000/event-management/store/events/inactive',
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const resData: FetchEvents = res.data;

      console.log(resData);

      return resData.data;
    } catch (error) {
      return undefined;
    }
  },
);

export const getEventActiveDetailThunk = createAsyncThunk(
  'mystore/getEventActiveDetail',
  async (id: string) => {
    try {
      const token = await getToken();

      const res = await axios.get(
        `http://localhost:8000/event-management/store/events/active/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const resData: FetchEventDetail = res.data;

      console.log(resData);

      return resData.data;
    } catch (error) {
      return undefined;
    }
  },
);

export const getEventInactiveDetailThunk = createAsyncThunk(
  'mystore/getEventInactiveDetail',
  async (id: string) => {
    try {
      const token = await getToken();

      const res = await axios.get(
        `http://localhost:8000/event-management/store/events/inactive/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const resData: FetchEventDetail = res.data;

      console.log(resData);

      return resData.data;
    } catch (error) {
      return undefined;
    }
  },
);
