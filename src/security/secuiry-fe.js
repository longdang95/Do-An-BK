import {userApi} from "../client/api/user/user-api";
import {userServices} from "../client/app/services/user-info";
import {cache} from "../client/app/common/cache";
import {cartApi} from "../client/api/cart/cart-api";

export let security = {
    login: (data) => {
        return new Promise((resolve, reject) => {
            userApi.login(data).then((res) => {
                cache.set(res.token, "token");
                userServices.setUser(res.user);
                resolve();
            }, (err) => {
                reject(err);
            })
        })
    },
    init: () => {
        return new Promise((resolve, reject) => {
            userApi.me().then((user) => {
                console.log("me")
                userServices.setUser(user);
                resolve();

            }, () => {
                localStorage.removeItem("token");
                resolve();
            })
        })

    },
    logout: () => {
        userServices.setInfo(null);
        localStorage.removeItem("token");
    },
    checkCart: () => {
        return new Promise((res, rej) => {
            let cartId = localStorage.getItem('cartId');
            if(cartId){
                cartApi.cartOverview(cartId).then(result => {
                    console.log(result)
                    if(!result.isExist ){
                        localStorage.removeItem('cartId')
                    }
                    res(result.cart)
                })
            }else res();


        })
    }
};