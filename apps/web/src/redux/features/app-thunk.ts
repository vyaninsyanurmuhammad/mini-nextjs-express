import { getToken } from '@/lib/jwt';
import { FetchPoint } from './../../models/point-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchDiscount } from '@/models/discount-model';
import { EventForm } from '@/models/event-model';

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
