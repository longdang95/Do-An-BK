import React, {Fragment} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {BaseComponent} from "./common/base-comp";
import {userServices} from "./services/user-info";
import {LoginPage} from "./login/login";
import {HomePage} from "./home-page/home-page";
import {AppLayout} from "./component/app-layout/app-layout";
import {Contact} from "./contact/contact";
import {AddProductPage} from "./add-product/add-product-page";
import {ProductPreview} from "./product-preview/product-preview";
import {CompareDevices} from "./compare-divices/compare-devices";
import {comparedDevicesState} from "../../security/services/compared-devices-state";
import $ from 'jquery'
import {cartState} from "../../security/services/cart-state";
import {BrandList} from "./brand-list/brand-list";
import {ModalsRegistry} from "./common/modal/modals";
import {ManageTrials} from "./manage-trials/manage-trials";
import {CheckoutPage} from "./check-out-page/check-out-page";
import {ManagePayments} from "./manage-payments/manage-payments";
import {WareHousing} from "./ware-housing/ware-housing";
import {PaymentDetail} from "./payment-detail/payment-detail";
import {Dashboard} from "./dashboard/dashboard";

let redirect = (locate) => {
    return class RedirectRoute extends BaseComponent {
        constructor(props, context) {
            super(props, context);
            props.history.push(locate);

        }

        render() {

            return null;
        }
    }
};


export class MainRoutes extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.onUnmount(userServices.onChange(() => this.forceUpdate()));
        cartState.onChange(() => this.forceUpdate())
    }


    render() {

        let token = localStorage.getItem("token");
        let authenRoute = (Comp) => token ? Comp : redirect("/manage/login");
        let unAuthenRoute = (Comp) => !token ? Comp : redirect("/manage");
        const requireAdmin = (comp) => {
            if (!token) {
                return redirect("/manage/login");
            }
            let user = JSON.parse(localStorage.getItem("user-info"))
            if (user.isAdmin) {
                return comp;
            }
            return redirect("/")
        };

        let cart = cartState.getState();
        let haveCart = (Comp) => cart ? Comp : redirect('/')
        return (
            <div className="main-routes">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/login" exact component={unAuthenRoute(LoginPage)}/>
                        <Route path="/contact" exact component={Contact}/>
                        <Route path="/compare" component={CompareDevices}/>
                        <Route path="/mobile" component={BrandList}/>
                        <Route path="/checkout" component={haveCart(CheckoutPage)}/>
                        <Route path="/add-product" exact component={authenRoute(AddProductPage)}/>
                        <Route path="/trials" exact component={authenRoute(ManageTrials)}/>
                        <Route path="/warehousing" exact component={authenRoute(WareHousing)}/>
                        <Route path="/payments" exact component={authenRoute(ManagePayments)}/>
                        <Route path="/dashboard" exact component={authenRoute(Dashboard)}/>
                        <Route path="/payment-detail/:sessionId" exact component={PaymentDetail} />
                        <Route path="/preview/:slug" exact component={ProductPreview}/>
                        <Route exact render={() => <Redirect to="/"/>}/>
                    </Switch>
                </BrowserRouter>
                <ModalsRegistry/>

            </div>
        );
    }
}