
import {addRemove} from "../../../utils/components-utils";

let listeners = [];
// let user = null;
let user = (()=> {
    let dataString = localStorage.getItem("user-info");
    let user = dataString == null || dataString=="undefined" ? null : JSON.parse(dataString);
    if (user == null || user.token == null) {
        return null;
    }
    return user;
})();
let userServices = {
    getUser: () => user,
    setInfo: (info=null) => {
        user = info;
        listeners.forEach(func => func())
    },
    setUser: (user1) => {
        user = user1;

        if (user) {
            localStorage.setItem("user-info", JSON.stringify(user));
        } else {
            localStorage.removeItem("user-info");
        }

        listeners.forEach((l) => l(user));
    },
    onChange:addRemove(listeners)
};

export {userServices};