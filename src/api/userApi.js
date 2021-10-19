const { default: axiosClient } = require('./axiosClient');
const userApi = {
  register(data) {
    const url = '/register';
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = '/login';
    return axiosClient.post(url, data);
  },
};

export default userApi;
