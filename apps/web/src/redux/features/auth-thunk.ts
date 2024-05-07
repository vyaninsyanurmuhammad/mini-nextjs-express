import { getSession, login, logout } from '@/lib/jwt';
import {
  FetchUser,
  User,
  UserSignInType,
  UserSignUpType,
} from '@/models/user-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (user: UserSignUpType) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/auth-management/signup',
        user,
      );

      const resData: FetchUser = res.data;

      login(res.data.data.tokens);

      return {
        id: resData.data.user.id,
        name: resData.data.user.name,
        email: resData.data.user.email,
        role: resData.data.user.userRoles.map((data) => data.roleId),
      } as User;
    } catch (error) {
      return undefined;
    }
  },
);

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (user: UserSignInType) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/auth-management/signin',
        user,
      );

      const resData: FetchUser = res.data;

      login(res.data.data.tokens);

      console.log(resData);

      return {
        id: resData.data.user.id,
        name: resData.data.user.name,
        email: resData.data.user.email,
        role: resData.data.user.userRoles.map((data) => data.roleId),
      } as User;
    } catch (error) {
      return undefined;
    }
  },
);

export const getSessionThunk = createAsyncThunk('auth/getSession', async () => {
  try {
    const auth = await getSession();

    console.log(auth)

    if (!auth) {
      return undefined;
    }

    return {
      id: auth?.id,
      name: auth?.name,
      email: auth?.email,
      role: auth?.role,
    } as User;
  } catch (error) {
    return undefined;
  }
});

export const logOutThunk = createAsyncThunk('auth/logout', async () => {
  await logout();

  return undefined;
});
