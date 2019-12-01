
import {api} from "../api";

export const inventoryApi = {
    submit : (data)=> api.post('/api/submit-inventory', data),
    getInventories : () => api.get('/api/inventories')
};