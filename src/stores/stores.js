import { configureStore } from '@reduxjs/toolkit';
import  userListSlice  from './userListSlice';

export const store = configureStore({
  reducer: {
    userList: userListSlice,
  },
});