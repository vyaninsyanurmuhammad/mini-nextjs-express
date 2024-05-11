import { getToken } from '@/lib/jwt';
import { FetchPoint } from './../../models/point-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchDiscount } from '@/models/discount-model';
import {
  BuyEvent,
  EventForm,
  FetchEventsHome,
  FetchEventsHomeDetail,
} from '@/models/event-model';

export const getPointThunk = createAsyncThunk('app/getPoint', async () => {
  try {
    const token = await getToken();

    const res = await axios.get(
      `http://localhost:8000/point-management/point`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const resData: FetchPoint = res.data;

    return resData;
  } catch (error) {
    return undefined;
  }
});

export const getDiscountsThunk = createAsyncThunk(
  'app/getDiscounts',
  async () => {
    try {
      const token = await getToken();

      const res = await axios.get(
        `http://localhost:8000/discount-management/discounts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const resData: FetchDiscount = res.data;

      return resData;
    } catch (error) {
      return undefined;
    }
  },
);

export const getLatestEventsThunk = createAsyncThunk(
  'app/getLatestEvents',
  async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/event-management/events`,
      );

      const resData: FetchEventsHome = res.data;

      return resData.data;
    } catch (error) {
      return undefined;
    }
  },
);

export const getDetailEventThunk = createAsyncThunk(
  'app/getDetailEvent',
  async (id: string) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/event-management/event/${id}`,
      );

      const resData: FetchEventsHomeDetail = res.data;

      return resData.data;
    } catch (error) {
      return undefined;
    }
  },
);

export const buyEventThunk = createAsyncThunk(
  'app/buyEvent',
  async ({ id, buy }: { id: string; buy: BuyEvent }) => {
    try {
      const token = await getToken();

      const res = await axios.post(
        `http://localhost:8000/event-management/event/${id}/buy`,
        buy,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);

      const resData = res.data;

      return resData.data;
    } catch (error) {
      return undefined;
    }
  },
);

export const findEventThunk = createAsyncThunk(
  'app/findEvent',
  async ({
    title,
    eventLocation,
    category,
  }: {
    title?: string;
    eventLocation?: string[];
    category?: string[];
  }) => {
    try {
      const titleSearch = title ? `?title=${title}` : '';

      const eventLocationSearch =
        eventLocation && eventLocation.length > 0
          ? `?${eventLocation
              .map((data) => {
                return `eventLocation=${data}`;
              })
              .join('&')}`
          : '';

      const categorySearch =
        category && category.length > 0
          ? `?${category
              .map((data) => {
                return `category=${data}`;
              })
              .join('&')}`
          : '';

      const res = await axios.get(
        `http://localhost:8000/event-management/events/search${titleSearch}${categorySearch}${eventLocationSearch}`,
      );

      console.log(res.data);

      const resData = res.data;

      return resData.data;
    } catch (error) {
      return undefined;
    }
  },
);
