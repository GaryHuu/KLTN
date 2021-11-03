import { dispatch } from 'app/store';
import axios from 'axios';
import { StorageKeys } from 'constant';
import { logout, openModal } from 'features/Auth/userSlice';
import { logoutCart } from 'features/Cart/cartSlice';
import { toast } from 'react-toastify';

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
      '/admin/orders'
    ]
    const dynamicURLAdminNeedToken = URLSADMIN.some(item => {
      return config.url.includes(item)
    })
    
    if(dynamicURLAdminNeedToken) {
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
    // const URLS = ['/user/user-profile', '/user/change-profile'];
    if (status === 401) {
      // logout and back to gome,
      // toast.warn('Vui Lòng Đặng Nhập Lại');
      toast.warn('Vui lòng đặng nhập lại!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
      dispatch(logout());
      dispatch(openModal());
      dispatch(logoutCart());
      // console.log('error 401');
      // try {
      //   const token = await userApi.refeshToken();
      //   console.log({token});
      //   const action = refreshToken(token);
      //   dispatch(action);
      // } catch (err) {

      // }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
