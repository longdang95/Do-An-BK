import React from "react"
import ReactDOM from "react-dom";

import "./flickity.css";
import {MainRoutes} from "./app/main-routes";
import {security} from "../security/secuiry-fe";
import {cartState} from "../security/services/cart-state";

security.init().then(()=>{
    security.checkCart().then(cart => {
        cartState.setState(cart)
        ReactDOM.render(<MainRoutes/>,document.getElementById("wrapper"));
    })
})
