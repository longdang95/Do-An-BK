import {api} from "../api";

export const trialRegisterApi = {
    saveTrial :(data) => api.post('/api/save-trial' , data),
    getTrials : () => api.get('/api/trial'),
    acceptTrial : (id) => api.get(`/api/accept-trial/${id}`)
};