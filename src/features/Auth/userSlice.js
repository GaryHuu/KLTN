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
  const { data } = await userApi.login(payload);
  const user = {
    name: data.user_name,
    id: data.user_id,
    access_token: data.access_token,
  }
  //save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.access_token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
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
    change: (state, action) => {
      state.current = action.payload;
      localStorage.setItem(StorageKeys.USER, JSON.stringify(action.payload));
    },
    refreshToken: (state, action) => {
      // sendToken
      state.current.access_token = action.payload;
      localStorage.setItem(StorageKeys.USER, JSON.stringify(action.payload));
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const user = {
        name: action.payload.user_name,
        id: action.payload.user_id,
        access_token: action.payload.access_token,
      }
      state.current = user;
    },
  },
});

export const { openModal, closeModal, logout, change, refreshToken } = userSlice.actions;

export default userSlice.reducer;
