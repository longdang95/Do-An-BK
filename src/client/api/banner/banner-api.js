import {api} from "../api";


export const bannerApi ={
    getBannes : () => api.get('/api/banners') ,
    updateBanners : (data) => api.post('/api/update-banners' , data)
}