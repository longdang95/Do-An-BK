import $ from "jquery";
import React from 'react'

export var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
});


export const addComparedDevice= (products)=>{
    $('body .compare-panel .main-container').empty();

    for(let product of products ) {
        let dv = `<div class='compared-device' style='display: inline-block ;'>
                <img style="border-radius: 5px;" width="50" src="${product.images[0].filePath}" alt="${product.name}">
            </div>`;
        $('body .compare-panel .main-container').append(dv)
    }

    if(products.length >=2 ){

        let url ='/compare?' + products.reduce((u,o,i) => u+'id'+(i+1)+'='+o.slug+'&','').slice(0,-1);
        console.log(url)

        let linkto = `<div class='btn-compare'>
            <a class="linkto" href="${url}">
                <i class="far fa-arrow-alt-circle-right"></i>COMPARE</a>
        </div>`;
        $('body .compare-panel .main-container').append(linkto)

        let trash = `<div class='btn-trash'>
            <i class="fas fa-trash-alt"></i>
        </div>`

        $('body .compare-panel .main-container').append(trash)

    }



}

export const brandsEnum={
    APPLE :1 ,
    SAMSUNG : 2 ,
    XIAOMI : 3,
    SONY : 4,
    LG : 5 ,
    OTHER : 6
}

export const brands=[
    {
        value : 'apple',
        type : brandsEnum.APPLE,
        label :'Apple',
        icon : <div className="logo-phone"><img src="/assets/img/apple.png" /></div>
    },
    {
        value : 'samsung',
        label :'Sam Sung',
        type : brandsEnum.SAMSUNG,
        icon : <div className="logo-phone"><img src="/assets/img/samsung.png" /></div>
    },
    {
        value : 'xiaomi',
        label :'Xiao Mi',
        type : brandsEnum.XIAOMI,
        icon : <div className="logo-phone"><img src="/assets/img/xiaomi.png" /></div>
    },
    {
        value : 'sony',
        label :'Sony',
        type  : brandsEnum.SONY,
        icon : <div className="logo-phone"><img src="/assets/img/sony.png" /></div>
    },
    {
        value :  'lg',
        label :'LG',
        type : brandsEnum.LG,
        icon : <div className="logo-phone"><img src="/assets/img/lg.png" /></div>
    },
    {
        value  :'other',
        label :'Other',
        type : brandsEnum.OTHER,
        icon : <div className="logo-phone"><img src="/assets/img/smartphone-call.png" /></div>
    }
]
export const  getParameterByName =(name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const covertToQueryString = (obj)=>{
    let str = new URLSearchParams();
    Object.keys(obj).map((o,i) =>{
        if(obj[o] !== undefined){
            str.append(o, encodeURI(obj[o]));
        }
    })
    console.log(str.toString())
    return str.toString();
}


export const setTitle = (tit) => document.title = tit ;