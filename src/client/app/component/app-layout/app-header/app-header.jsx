import React, {Fragment} from 'react';
import {MenuPanel} from "./menu-panel/menu-panel";
import {cartState} from "../../../../../security/services/cart-state";
import {Link} from "react-router-dom";
import {SearchPanel} from "./search-panel/search-panel";
import {productApi} from "../../../../api/product/product-api";
import {formatter} from "../../../commond";
import {cartApi} from "../../../../api/cart/cart-api";
import {Avatar, Button, Dropdown, Menu} from "antd";
import {userServices} from "../../../services/user-info";

export class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };

        productApi.getProducts().then(data => {
            this.setState({products: data.list})
        })
    }

    render() {
        const cart = cartState.getState() || null;
        let user = userServices.getUser();
        let userMenu = (
            <Menu>
                <Menu.Item>
                    <Link to="/edit-user">
                        Sửa Thông Tin
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/user-payments">
                        Danh Sách Payments
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Button
                        type='danger'
                        size="small"
                        className='btn-logout'
                    >
                        Thoát
                    </Button>
                </Menu.Item>
            </Menu>
        )
        return (
            <div className='app-header'>
                <div className='header-top'>
                </div>
                <div className='header-mid'>
                    <div className="main-container">
                        <div className="header-left">
                            <Link to='/'>
                                <img
                                    height='40'
                                    src="https://i.imgur.com/fPq8Yb8.png"
                                    alt=""/>
                            </Link>
                        </div>

                        <div className="header-right">
                            <SearchPanel
                                list={this.state.products || []}
                                renderResult={(item) => (
                                    <div
                                        onClick={() => this.props.history.push(`/preview/${item.slug}`)}
                                        className='content-rs flex-row'>
                                        <span className='device-name'>{item.name}</span>
                                        <img className='device-image' src={item.images[0].filePath} height={40}
                                             alt=""/>
                                    </div>
                                )}
                            />

                            <div className='phone flex-row'>
                                <div><i className="fas fa-phone"></i></div>
                                <div className='info'>
                                    <span>Hotline</span>
                                    <br/>
                                    <span className='number'>098.345.2388</span>
                                </div>
                                <CartInfoDropdown
                                    cart={cart}
                                />

                                {user &&
                                <div className='flex-row'>
                                    <Dropdown
                                        overlay={userMenu} placement="bottomLeft">
                                        <Avatar
                                            src={user.avatar ? user.avatar : 'https://vomoa-images.s3.amazonaws.com/channel/b9cb1970a1242e3d456955a994090e1e-crop-c0-5__0-5-100x100.png'}/>
                                    </Dropdown>
                                </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>

                <MenuPanel/>
            </div>
        )
    }
}


export class CartInfoDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown: false
        };
    }

    mouseAction = {
        onMouseLeave: () => {
            this.setState({
                dropdown: false
            })
        },
        onMouseEnter: () => {
            this.setState({
                dropdown: true
            })
        }
    }

    render() {
        const {cart} = this.props;
        const {dropdown} = this.state;
        let counter = cart ? cart.products.reduce((o, u) => o + u.quantity, 0) : 0;
        let cartPreview = (
            <div
                className='cart-dropdown box-shadow'>
                <div className='top'>
                    <span>{((cart && cart.products.length) || 0) + " sản phẩm"}</span>
                    <span>Giỏ hàng</span>
                </div>
                <hr/>
                {
                    cart && cart.products.length && cart.products.map((o, i) => {
                        return (
                            <Fragment>
                                <div
                                    key={i}
                                >
                                    <div className='cart-product flex-row'>
                                        <div className="product-details">
                                            <h4 className='no-margin'>{o.name}</h4>
                                            <span> {o.quantity + " x " + formatter.format(o.price)}</span>
                                        </div>
                                        <div className='product-image-container'>
                                            <img
                                                width={50}
                                                src={o.images[0].filePath} alt=""/>
                                            <i
                                                onClick={() => {
                                                    cartApi.clearProduct(cart._id, o._id).then(data => {
                                                        cartState.setState(data)
                                                    })
                                                }}
                                                className="fas fa-times"></i>
                                        </div>

                                    </div>
                                </div>
                                <hr/>
                            </Fragment>
                        )
                    })
                }
                {
                    cart && (
                        <div className='dropdown-cart-total'>
                            <span>Tổng tiền:</span>
                            <span>{formatter.format(cart.total_price)}</span>
                        </div>
                    )
                }
                {
                   cart && cart.total_price > 0 &&
                    <div

                        onClick={() => {
                            this.props.push('/check-out')
                        }}
                        className='view-cart-action'>
                        <Link className='none-underline' to='/checkout'>
                            Thanh Toán
                        </Link>
                    </div>
                }

            </div>
        )
        return (
            <div className='flex-row'>
                <Dropdown
                    overlay={cartPreview}
                    placement="bottomRight">
                    <div
                        className='cart-info'>
                        <span className='counting'>{counter}</span>
                        <i className="fas fa-shopping-cart"></i>
                        <i className='fas fa-chevron-down'></i>
                    </div>
                </Dropdown>
            </div>
        )
        // return (
        //     <div
        //         {...this.mouseAction}
        //         className='cart-info'>
        //         <span className='counting'>{counter}</span>
        //         <i className="fas fa-shopping-cart"></i>
        //         <i className='fas fa-chevron-down'></i>
        //         {/*{*/}
        //         {/*    dropdown && cart && (*/}
        //         {/*        */}
        //         {/*    )*/}
        //         {/*}*/}
        //
        //     </div>
        // )
    }
}