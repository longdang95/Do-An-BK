import React, {Fragment} from "react";
import moment from "moment";

const debounce = (fn, delay) => {
    let action;
    return function () {
        clearTimeout(action);
        action = setTimeout(() => {
            fn.apply(null, arguments)
        }, delay)
    }
};

let deniedUndefined = (str, fn, bool) => {
    if (str === undefined)
        return bool;
    return !fn();
};

let momentFormat = (type,date) => {
    let m = moment(date);
    return m.format(type);
};


let removeDuplicate = arr => Array.from(new Set(arr));

let parseTime = (x=moment()) => {
    let time = x.format("hh/mm/A").split("/");
    return {
        hour: time[0],
        minute: time[1],
        part: time[2]
    };
};



let parseDate = (day=moment()) =>{
   return day.format("DD/MM/YYYY");
};

let getValueOfObj = obj =>{
  let keys = Object.keys(obj);
  if(!keys.length)
      return [];
  return keys.map(key => obj[key]);
};

let convertTime = (str = "") => {
    if (typeof str === "number") {
        str = str.toString();
    }
    let l = str.length;
    if (l === 1) {
        str = "0" + str;
    } else if (l > 2) {
        console.log(l)
        console.log(str.slice(l - 2))
        str = str.slice(l - 2);
    }
    return str;
};

Date.prototype.ddMMhhmmss = function () {
    var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    var hh = this.getHours().toString();
    var mm = this.getMinutes().toString();
    var ss = this.getSeconds().toString();
    return (MM[1] ? MM : "0" + MM[0]) + (dd[1] ? dd : "0" + dd[0]) + (hh[1] ? hh : "0" + hh[0]) + (mm[1] ? mm : "0" + mm[0]) + (ss[1] ? ss : "0" + ss[0]);
}
let notOverFlow = data => data.reduce((total, cur) => total && cur.toString().length <= 2);

let delListener = (arr, item) => {
    if (!arr || !arr.length) {
        return;
    }
    let i = arr.indexOf(item);
    if (i === -1) {
        return;
    }
    arr.splice(i, 1);
};

let onlyDigit = str => {
    return str.split("").filter(char => char.match(/\d/)).join("");
};

let filterZero = ([first, ...rest]) => {
    if (first === '0') {
        if (!rest.length) {
            return [first];
        }
        return filterZero(rest);
    }
    return [first, ...rest];
};

let changeTimeFormat = ({hour, part}) => {
    if(!hour){
        return 0;
    }
    if (part === "PM") {
        if (Number(hour) !== 12)
            hour = 12 + Number(hour);
    } else {
        if (Number(hour) === 12) {
            hour = "00";
        }
    }
    return hour;
};

let getFulltime = ({date, minute=0, sec=0,...rest}) => {
    let [day,month,year] = date.split("/");
    let hour = changeTimeFormat(rest);
    return new Date(year,month-1,day,hour,minute,sec);
};

let filterStr = str => {
    let toArr = str.split("");
    return () => {
        let noZero = filterZero(toArr).reverse();
        return () => noZero.reduce((total, cur, i) => {
            if (Number.isInteger(i / 3) && i > 0) {
                return total + "." + cur;
            }
            return total + cur;
        }).split("").reverse().join("");
    };

};

let cashToNumber = cash => Number(cash.split("").filter(char => char !== ".").join(""));

let notEmpty = bool => str => typeof str === "string" ? deniedUndefined(str, () => !!str, bool) : deniedUndefined(str, () => !!str.length, bool);

export let maxLength = length => str => {
    return str && str.length > length
};

let convertCash = val => {
    if (!val)
        return val;
    if (typeof val === "number")
        val = val.toString();
    let ditgits = onlyDigit(val);
    if (!ditgits)
        return ditgits;
    let provideDot = filterStr(ditgits);
    let result = provideDot();
    return result();
};

let addRemove = arr => {
    return item => {
        arr.push(item);
        return () => delListener(arr, item);
    }
};

let cutString = (str, num) => {
    if (!str)
        return "";
    return str.length <= num ? str : str.substr(0, num) + "...";
};

let formatDate = str =>{
  let [day,month,year] = str.split("/");
  return {day:Number(day),month:Number(month),year:Number(year)};
};

let formatTime = (stamp) => {
    let now = new Date().getTime();
    let different = now - stamp;
    if ((different / 1000) / 3600 / 24 / 4 > 12) {
        return moment(stamp).format("ddd MMM D");
    }
    return moment(stamp).fromNow();
};

let isTele = bool => phone => deniedUndefined(phone, () => phone.match(/^\d{10,11}$/g), bool);

let highLight = (str, keyword) => {
    if (!keyword) {
        return str;
    }
    let k = keyword.toLowerCase();
    let find2Light = (s, arr) => {
        let start = s.toLowerCase().indexOf(k);
        if (start === -1) {
            if (s) {
                arr.push(<span>{s}</span>);
            }
            return arr;
        }
        let end = start + (k.length - 1);
        let first = s.slice(0, start);
        let hLight = s.slice(start, end + 1);
        arr.push(<span>{first}<span className="h-light">{hLight}</span></span>);
        return find2Light(s.slice(end + 1), arr);
    };
    let result = find2Light(str, []);
    return (
        <span>
            {
                result.map((elem, i) => (
                    <span key={i}>
                        {elem}
                    </span>
                ))

            }
        </span>
    );

};


const scrollToForm = (element, state) => {
    if (state) {
        $('html, body').animate({
            scrollTop: $(element).position().top
        }, 500);
    }
};

let searchArr = arr => keyword => {
    if (!keyword) {
        return arr;
    }
    let k = keyword.toLowerCase();
    return arr.filter(obj => obj.name.toLowerCase().indexOf(k) !== -1);
};

const getBase64 = (file) => new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        resolve({file, src: reader.result});
    };
});
const animateCount = (count, fn) => {
    let temp = 0;
    let skip = Math.ceil(count / 100);
    let interval = setInterval(() => {
        temp = temp + skip;
        if (count - temp < skip) {
            temp = count;
        }
        fn(temp);
        if (temp === count)
            clearInterval(interval);
    }, 10);
};

let isOnlyDate = str => {
    return str.match(/\d{1,2}\/\d{1,2}\/\d{4}/g)
};

let isDate = bool => str => {
    let filter = () =>{
        let [day,month,year] = str;
        return !(!day || !month || !year || !str.match(/\d{1,2}\/\d{1,2}\/\d{4}/g));
    };
    return deniedUndefined(str, filter , bool);

};



let convertDateStr = root =>{
    console.log(root);
    if(root===undefined){
        return root;
    }
    let arr = root.split("").filter(char=>char==="/");
    if(arr.length < 2){

    }
    return arr.reduce((total,cur,i)=>{
       if(i===2 || i===4){
           return total + "/" +cur;
       }
       return total+cur;
    },"")
};

let numEqual = (x,y) =>Number(x) === Number(y)

let toDateStr = ({day,month,year}) => [addZero(day),addZero(month),year].join("/");
let afterConvert = (mount,fix=0) => convertCash(mount.toFixed(fix));
let isEmail = bool => str => deniedUndefined(str, () => str.match(/^(.+)@(\w){2,8}\.(\w){2,5}(\.(\w){2,5})*/g), bool);
export {
    convertTime,
    notEmpty,
    isTele,
    isEmail,
    numEqual,
    toDateStr,
    isDate,
    convertDateStr,
    getFulltime,
    debounce,
    scrollToForm,
    searchArr,
    parseTime,
    animateCount,
    highLight,
    formatTime,
    getBase64,
    cutString,
    addRemove,
    convertCash,
    cashToNumber,
    filterZero,
    isOnlyDate,
    notOverFlow,
    parseDate,
    formatDate,
    removeDuplicate,
    deniedUndefined,
    getValueOfObj,
    afterConvert,
    momentFormat
}