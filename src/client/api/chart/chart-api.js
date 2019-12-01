import {api} from "../api";


export const chartApi ={
    getSumary :() => api.get("/api/charts")
}