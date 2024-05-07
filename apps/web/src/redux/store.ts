import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import appReducer from './features/app-slice';

export const store = configureStore({
  reducer: {
    authReducer,
    appReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
