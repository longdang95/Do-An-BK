const covertToQueryString = (obj)=>{
    let str = new URLSearchParams();
    Object.keys(obj).map((o,i) =>{
        if(obj[o] !== undefined){
            str.append(o, encodeURI(obj[o]));
        }
    })
    console.log(str.toString())
    return str.toString();
}
const brandsEnum={
    APPLE :1 ,
    SAMSUNG : 2 ,
    XIAOMI : 3,
    SONY : 4,
    LG : 5 ,
    OTHER : 6
}

const brands=[
    {
        value : 'apple',
        type : brandsEnum.APPLE,
        label :'Apple',
    },
    {
        value : 'samsung',
        label :'Sam Sung',
        type : brandsEnum.SAMSUNG,
    },
    {
        value : 'xiaomi',
        label :'Xiao Mi',
        type : brandsEnum.XIAOMI,
    },
    {
        value : 'sony',
        label :'Sony',
        type  : brandsEnum.SONY,
    },
    {
        value :  'lg',
        label :'LG',
        type : brandsEnum.LG,
    },
    {
        value  :'other',
        label :'Other',
        type : brandsEnum.OTHER,
    }
]
module.exports ={
    covertToQueryString,
    brandsEnum,
    brands
}
