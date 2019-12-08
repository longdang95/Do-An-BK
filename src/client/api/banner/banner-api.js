import {api} from "../api";


export const bannerApi ={
    getBannes : (isActive = false ) => api.get('/api/banners') ,
    getActiveBanners :() => api.get('/api/banners-active'),
    updateBanners : (data) => api.post('/api/update-banners' , data),
    editBanner : (data) =>  api.post('/api/edit-banner',data),
}