const { default: axiosClient } = require('./axiosClient');
const productApi = {
  getBanners() {
    const url = '/banners';
    return axiosClient.get(url);
  },
  getHotPromo() {
    const url = '/products?sale';
    return axiosClient.get(url);
  },
  getHotProduct() {
    const url = '/products?sale';
    return axiosClient.get(url);
  },
  // add(data) {
  //   const url = '/categories';
  //   return axiosClient.post(url, data);
  // },
  // update(data) {
  //   const url = `/categories/${data.id}`;
  //   return axiosClient.patch(url, data);
  // },
  // remove(id) {
  //   const url = `/categories/${id}`;
  //   return axiosClient.delete(url);
  // },
};

export default productApi;
