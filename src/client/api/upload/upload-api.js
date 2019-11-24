import {api} from "../api";

export const uploadApi = {

    upload :( file)=> api.postMultipart("/api/file/upload",file) ,
};