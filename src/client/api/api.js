import {userServices} from "../app/services/user-info";
import {cache} from "../app/common/cache";
let request = (url, type, data) => new Promise((resolve, reject) => {
    let ajaxConfig = {
        url: url,
        contentType: "application/json",
        type: type,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${cache.get("token")}`)
        },
        success: (data) => {
            //res.json(data);
            resolve(data);
        },
        error: (err) => {
            reject(err);
        }
    };


    if (data) {
        ajaxConfig.data = JSON.stringify(data);
    }
    $.ajax(ajaxConfig);
});
export const api = {
    get: (url) => {
        return request(url, "GET");
    },
    post: (url, data) => {
        return request(url, "POST", data);
    },
    put: (url, data) => {
        return request(url, "PUT", data);
    },
    delete: (url) => {
        return request(url, "DELETE");
    },
    postMultipart: (url, data) => {

        return new Promise((resolve, reject) => {
            let fd = new FormData();
            fd.append('imageFile', data);
            let xhr = new XMLHttpRequest();

            xhr.open('post', url, true);
            xhr.setRequestHeader("Authorization", `Bearer `);

            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(this.statusText);
                }
            };

            xhr.send(fd);

        });
    }
};


