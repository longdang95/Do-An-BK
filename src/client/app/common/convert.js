
var moment = require("moment")
export const convertMoney=(str)=>{
    var length =str.length

    str = str.trim() ;
    if(!checkSpace(str)){
        str = allDigit(str) ;
    }
    if(str.length<=3) return str
    var arr = []
    var count = Math.floor(length/3) ;
    var temp = str
    while(count!==0){
        arr.push(str.slice(temp.length-3 , temp.length))
        temp = temp.slice(0, temp.length-3)
        count-- ;
        if(temp.length===0){
            break;
        }else if(temp.length<3){
            arr.push(temp)
            break;
        }
        // console.log(temp)
    }
    var res="";
    var i;
    for (i = arr.length-1; i >=0; i--) {
        res+= arr[i]
        if(i!==0){
            res+=","
        }
    }

    return res
}

const checkSpace=(str)=>{
    if(str.includes(" ")) return true
    return false
}
export const allDigit=(str)=>{
    return str.replace(/\D/g,"")
}

export const isAllNumber=(str)=>{
    var r= /^\d+$/

    return r.test(str)
}

export function isPhoneNumber(str){
    var r = /[0]\d{9,10}/g

    return r.test(str)
}
export const isNotCashType=(str)=>{
    var r= /[^0-9^\.\,]/g

    return r.test(str)
}

export const getYesterday=(fullDate,format)=>{

    return moment(new Date(fullDate)).subtract(1, "days").format(format)
}

export const getTomorrow=(fullDate,format)=>{

    return moment(new Date(fullDate)).add(1, "days").format(format)
}

export const nameSpaceToDash=(str)=>{
    return str.trim().replace(/\s+/g, '-').toLowerCase();
}
export const nameDashToSpace=(str)=>{
    return str.trim().replace(/-/g, ' ').toLowerCase();
}
export const convertNameUpperFirst=(str)=>{
    var arrS= str.split(" ") ;
    var rs ="" ;
    for(let i=0 ; i < arrS.length ; i++){
        for(let j=0 ; j<  arrS[i].length ; j++){
            if(j==0) rs+= arrS[i][0].toUpperCase() ;
            else{
                rs+= arrS[i][j].toLowerCase();
            }
        }
        rs+= " ";
    }
    rs=rs.trim();
    console.log(rs)
    return rs ;
}
