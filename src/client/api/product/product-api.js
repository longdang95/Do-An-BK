import {api} from "../api";
import {covertToQueryString} from "../../../../security/commond-be";

export const productApi = {
    addProduct : (draft) => api.post('/api/add-product',draft),
    getProducts : () => api.get("/api/get-products"),
    getProductBySlug : (slug) => api.get(`/api/get-product/${slug}`),
    getSamePrice  : (slug)  => api.get(`/api/get-same-price/${slug}`),
    getFilterProducts: (filter) => api.get(`/api/get-filter-product?${covertToQueryString(filter)}`)
};