import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from 'api/adminApi';
import { StorageKeys } from 'constant';


export const login = createAsyncThunk('admin/login', async (payload) => {
  const { data }  = await adminApi.login(payload);
  localStorage.setItem(StorageKeys.ADMIN, JSON.stringify(data));
  return data;
});

const initialState = {
  current : JSON.parse(localStorage.getItem(StorageKeys.ADMIN)) || null,
};
export const userSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLogout(state) {
      state.current = null;
      localStorage.removeItem(StorageKeys.ADMIN);
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { adminLogout } = userSlice.actions;

export default userSlice.reducer;