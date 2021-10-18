const { default: axiosClient } = require('./axiosClient');
const categoryApi = {
  getCategories() {
    const url = '/categories';
    return axiosClient.get(url);
  },
};

export default categoryApi;
