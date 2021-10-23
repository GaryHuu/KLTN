const { default: axiosClient } = require('./axiosClient');
const userApi = {
  register (data) {
    const url = '/register';
    return axiosClient.post(url, data);
  },
  login (data) {
    const url = '/login';
    return axiosClient.post(url, data);
  },
  getProfile () {
    const url = '/user/user-profile';
    return axiosClient.get(url);
  },
  updateProfile (data) {
    const url = '/user/change-profile';
    return axiosClient.patch(url, data);
  },
};

export default userApi;
