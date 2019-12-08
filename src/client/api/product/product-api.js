import {api} from "../api";
import {covertToQueryString} from "../../../../security/commond-be";

export const productApi = {
    addProduct : (draft) => api.post('/api/add-product',draft),
    editProduct : (draft) => api.post('/api/edit-product', draft ),
    getProduct :(id) => api.get(`/api/get-product/${id}`),
    getProducts : () => api.get("/api/get-products"),
    getProductBySlug : (slug) => api.get(`/api/get-product/${slug}`),
    getSamePrice  : (slug)  => api.get(`/api/get-same-price/${slug}`),
    getFilterProducts: (filter) => api.get(`/api/get-filter-product?${covertToQueryString(filter)}`),
    deleteProduct : (id) => api.delete(`/api/product/${id}`),
    updateStatus : (id , isActive ) => api.get(`/api/product/${id}/status/${isActive}`)
};