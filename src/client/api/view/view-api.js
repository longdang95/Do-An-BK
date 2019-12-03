import {api} from "../api";



export const viewApi ={
    // api đếm view và trả về view .
    getView : (id) => api.get('/api/view/'+id)
}