const { default: axiosClient } = require('./axiosClient');

const adminApi = {
  login (data) {
    const url = '/admin-login';
    return axiosClient.post(url, data);
  },
}

export default adminApi;