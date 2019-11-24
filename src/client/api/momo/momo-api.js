
import {api} from "../api";


export const paymentTypeApi ={
    momoPayment : (data)=> api.post('/api/momo/payment' , data),
    stripePayment : (data) => api.post('/api/stripe/payment',data)
}