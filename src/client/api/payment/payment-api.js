import {api} from "../api";


export const paymentApi ={
    submit: (data)=> api.post('/api/payment', data),
    getPayments : () => api.get('/api/payments'),
    getPaymentDetail : (sessionId) => api.get(`/api/payment-detail/${sessionId}`)
}