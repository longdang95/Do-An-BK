import React from 'react';
import {AppLayout} from "../component/app-layout/app-layout";
import {AdsItem} from "./ads-item/ads-item";
import {FeaturedProducts} from "./featured-products/featured-products";
import {productApi} from "../../api/product/product-api";
import {cartState} from "../../../security/services/cart-state";
import {cartApi} from "../../api/cart/cart-api";
import {api} from "../../api/api";
import {setTitle} from "../commond";

export class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products : null
        };
        productApi.getProducts().then(data => {
            this.setState({
                products: data.list
            })
        })
        setTitle('Trang chủ')

    }

    render() {
        return (
            <AppLayout
                {...this.props}
            >
                <div className='home-page'>
                    <AdsItem/>
                    <FeaturedProducts
                        products={this.state.products || []}
                        label='Sản Phẩm Nổi Bật'
                        onAddProduct={(prd , quantity = 1  )=>{
                            let cart =  cartState.getState();

                            cartApi.submitCart( cart ? cart._id : null , prd._id ,  quantity).then(data =>{
                                if(!cart){
                                    localStorage.setItem('cartId',data._id);
                                }
                                console.log(data)
                                cartState.setState(data);
                            })
                        }}
                    />
                </div>
            </AppLayout>
        )
    }
}