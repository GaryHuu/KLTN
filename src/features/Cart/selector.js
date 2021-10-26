import { createSelector } from '@reduxjs/toolkit';

const cartItemsSelector = (state) => state.cart.cartItems;

// count number of product
export const cartItemsCountSelector = createSelector(
  cartItemsSelector,
  (cartItems) => {
    if (!cartItems) return;
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }
);

// caculate total of cart
export const cartTotalSelector = createSelector(
  cartItemsSelector,
  (cartItems) => {
    if (!cartItems) return;
    return cartItems.reduce(
      (total, item) => total + item.priceAfterDiscount * item.quantity,
      0
    )
  }

);

export const cartDiscountSelector = createSelector(
  cartItemsSelector,
  (cartItems) => {
    if (!cartItems) return;
    return cartItems.reduce(
      (total, item) => total + (item.price - item.priceAfterDiscount) * item.quantity,
      0
    )
  }
);

