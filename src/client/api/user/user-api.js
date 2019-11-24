import {api} from "../api";

export const userApi = {
    me:() => api.get("/api/me"),


    login: (data)=> {
        return api.post("/api/login",data)
    },
    // getUsers: ()=> api.get("/api/users"),
    register: (data)=>{
        return api.post("/api/register",data);
    },
    changePassword :(data) =>{
        return api.post("/api/changepass",data)
    }

};