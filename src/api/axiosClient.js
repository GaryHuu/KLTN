import { dispatch } from 'app/store';
import axios from 'axios';
import { StorageKeys } from 'constant';
import { logout, openModal, refreshToken } from 'features/Auth/userSlice';
import { logoutCart } from 'features/Cart/cartSlice';
import { toast } from 'react-toastify';
import userApi from './userApi';

const axiosClient = axios.create({
  baseURL: 'https://phanolink.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const URLS = [
      '/user/user-profile',
      '/user/change-profile',
      '/user/refresh',
      '/user/favorites',
      '/user/user-profile?with=address',
      '/user/change-address',
      '/user/orders',
      '/is-favorite',
    ];

    const dynamicURL = [
      '/user/favorites/',
    ]
    const dynamicURLNeedToken = dynamicURL.some(item => {
      return config.url.includes(item)
    })

    if (URLS.includes(config.url) || dynamicURLNeedToken) {
      const token = localStorage.getItem(StorageKeys.TOKEN);
      config.headers.Authorization = token ? `Bearer ${token}` : '';
    }

    const URLSADMIN = [
      'admin/product-list',
      '/admin/products',
      '/admin/orders',
      '/admin/user',
      '/admin/users',
    ]
    const dynamicURLAdminNeedToken = URLSADMIN.some(item => {
      return config.url.includes(item)
    })

    if (dynamicURLAdminNeedToken) {
      const admin = JSON.parse(localStorage.getItem(StorageKeys.ADMIN));
      const token = admin.access_token;
      config.headers.Authorization = token ? `Bearer ${token}` : '';
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, status } = error.response;


    // if (status === 401 && !config._retry) {
    //   config._retry = true;
    //   try {
    //     const token = localStorage.getItem(StorageKeys.TOKEN);
    //     console.log(token);
    //     const res = await axios.post('https://phanolink.herokuapp.com/api/user/refresh', {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       },
    //     });
    //     console.log(res.data.access_token);
    //     const action = refreshToken(res.data.access_token);
    //     dispatch(action);
    //     return axiosClient(config);
    //   } catch (err) {
    //     return Promise.reject(err);
    //   }
    // }

    if (status === 401) {
      toast.warn('Vui lòng đặng nhập lại!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
      if (config.url.includes('/user') && !config.url.includes('/admin')) {
        dispatch(logout());
        dispatch(openModal());
        dispatch(logoutCart());
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
