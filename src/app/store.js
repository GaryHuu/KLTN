import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'features/Auth/userSlice';
import cartReducer from 'features/Cart/cartSlice';
import adminReducer from 'features/Admin/adminSlice';

const rootReducer = {
  user: userReducer,
  cart: cartReducer,
  admin: adminReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export const dispatch = store.dispatch;
