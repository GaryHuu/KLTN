import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import { StorageKeys } from 'constant';

export const register = createAsyncThunk('auth/register', async (payload) => {
  //call API to register
  const { data } = await userApi.register(payload);
  return data;
});

export const login = createAsyncThunk('auth/login', async (payload) => {
  //call API to login
  const data = await userApi.login(payload);
  //save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.access_token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data));
  return data;
});

const initialState = {
  modalIsOpen: false,
  current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || null,
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
    logout: (state) => {
      state.current = null;
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USER);
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { openModal, closeModal, logout } = userSlice.actions;

export default userSlice.reducer;
