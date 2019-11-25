import {api} from "../api";

export const cartApi = {
    checkCart : (cartId) => api.get("/api/init-cart/"),
    cartOverview : (cartId) => api.get(`/api/cart-overview/${cartId}`) ,
    submitCart : (cartId = null , productId = null , quantity = 1 ) => api.post(`/api/cart`,{ cartId ,productId, quantity}),
    clearProduct : (cartId =null ,productId ) => api.get(`/api/cart/${cartId}/clear-product/${productId}`)
};