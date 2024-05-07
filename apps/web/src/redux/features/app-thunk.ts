import { FetchPoint } from './../../models/point-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPointThunk = createAsyncThunk(
  'app/getPoint',
  async (id: string) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/point-management/point/${id}`,
      );

      const resData: FetchPoint = res.data;

      return resData;
    } catch (error) {
      return undefined;
    }
  },
);
