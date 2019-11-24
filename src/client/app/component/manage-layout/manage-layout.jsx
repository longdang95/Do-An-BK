import React from 'react';
import {AppHeader} from "../app-layout/app-header/app-header";
import {cartState} from "../../../../security/services/cart-state";
import {AppFooter} from "../app-layout/app-footer/app-footer";
export class ManageLayout  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const cart  = cartState.getState() || null;
        return(
            <div className='manage-layout'>
                <AppHeader
                    cart={cart}
                />
                <div className="main-container main-center">
                    {this.props.children}
                </div>
                <AppFooter/>
            </div>
        )
    }
}