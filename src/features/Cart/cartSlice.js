import { createSlice } from '@reduxjs/toolkit';
import { StorageKeys } from 'constant';

export const getCartNameById = (id) => `cart-${id}`;

const user = JSON.parse(localStorage.getItem(StorageKeys.USER));
console.log(user?.id);

const initialState = {
  userId: user?.id || null,
  cartItems: JSON.parse(localStorage.getItem(getCartNameById(user?.id))) || [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    changeUserId (state, action) {
      state.userId = action.payload;
      state.cartItems = JSON.parse(localStorage.getItem(getCartNameById(action.payload)));
    },
    addToCart (state, action) {
      // newItem = { idProduct, quantity }
      const newItem = action.payload;
      if (!state.cartItems) state.cartItems = []
      const index = state.cartItems.findIndex((item) => item.idProduct === newItem.idProduct);
      // if avaiable
      if (index >= 0) state.cartItems[index].quantity += newItem.quantity;
      else state.cartItems.push(newItem);
      localStorage.setItem(getCartNameById(state?.userId), JSON.stringify(state.cartItems));
    },
    logoutCart: (state) => {
      state.userId = null;
      state.cartItems = null;
    },
  },
});

export const { addToCart, changeUserId, logoutCart } = cartSlice.actions;

export default cartSlice.reducer;
