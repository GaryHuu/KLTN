const { default: axiosClient } = require('./axiosClient');

const adminApi = {
  login (data) {
    const url = '/admin-login';
    return axiosClient.post(url, data);
  },
  getAllProduct (params) {
    const url = 'admin/product-list';
    return axiosClient.get(url, { params: { ...params, with: 'category,images', }})
  },
  addProduct (data) {
    const url = '/admin/products?with=images';
    return axiosClient.post(url, data);
  },
  deleteProduct(id) {
    const url = `/admin/products/${id}`;
    return axiosClient.delete(url);
  },
  editProduct(id, data) {
    const url = `/admin/products/${id}?_method=PATCH`;
    return axiosClient.post(url, data);
  }
}

export default adminApi;