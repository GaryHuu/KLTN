import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalIsOpen: false,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalIsOpen = true;
    },
    closeModal: (state) => {
      state.modalIsOpen = false;
    },
  },
});

export const { openModal, closeModal } = userSlice.actions;

export default userSlice.reducer;
