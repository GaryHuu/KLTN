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
    const url = '/products?feature';
    return axiosClient.get(url);
  },
  getProductList(params) {
    console.log(params);
    const url = '/products';
    return axiosClient.get(url, { params: params });
  },
  getProductByID(id) {
    const url = `/products`;
    return axiosClient.get(url, {
      params: {
        id,
      },
    });
  },
};

export default productApi;
