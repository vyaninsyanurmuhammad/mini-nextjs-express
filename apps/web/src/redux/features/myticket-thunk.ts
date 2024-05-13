import { getToken } from '@/lib/jwt';
import { FetchEventTransactionDetail, FetchEventTransactions, getTransactionActiveDetail } from '@/models/event-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTicketsActiveThunk = createAsyncThunk(
  'myticket/getTicketsActive',
  async () => {
    try {
      const token = await getToken();

      const res = await axios.get(
        `http://localhost:8000/event-management/tickets/active`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const resData: FetchEventTransactions = res.data;

      console.log(resData);

      return resData.data;
    } catch (error) {
      return undefined;
    }
  },
);

export const getTicketsTransactionThunk = createAsyncThunk(
  'myticket/getTicketsTransaction',
  async () => {
    try {
      const token = await getToken();

      const res = await axios.get(
        `http://localhost:8000/event-management/tickets/transaction`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const resData: FetchEventTransactions = res.data;

      console.log(resData);

      return resData.data;
    } catch (error) {
      return undefined;
    }
  },
);

export const getTicketTransactionDetailThunk = createAsyncThunk(
  'myticket/getTicketTransactionDetail',
  async (id: string) => {
    try {
      const token = await getToken();

      const res = await axios.get(
        `http://localhost:8000/event-management/tickets/transaction/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const resData: FetchEventTransactionDetail = res.data;

      console.log(resData);

      return resData.data;
    } catch (error) {
      return undefined;
    }
  },
);

export const getTicketsActiveDetailThunk = createAsyncThunk(
  'myticket/getTicketsActiveDetail',
  async (id: string) => {
    try {
      const token = await getToken();

      const res = await axios.get(
        `http://localhost:8000/event-management/tickets/active/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const resData: getTransactionActiveDetail = res.data;

      console.log(resData);

      return resData.data;
    } catch (error) {
      return undefined;
    }
  },
);
