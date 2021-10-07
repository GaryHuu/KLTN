import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/Auth/userSlice';

const rootReducer = {
  user: userReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
