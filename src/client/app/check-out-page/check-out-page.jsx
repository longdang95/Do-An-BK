import React from 'react';
import {ManageLayout} from "../component/manage-layout/manage-layout";
import {brands, formatter, setTitle} from "../commond";
import {Select2} from "../common/select/select2";
import {cartState} from "../../../security/services/cart-state";
import {ShippingSelect} from "./shipping-select/shipping-select";
import {paymentTypeApi} from "../../api/momo/momo-api";
import {Button} from "antd";

export class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        setTitle('Xử lý thanh toán')
    }

    inputs = [
        {
            label: 'Họ và Tên',
            key: 'customer_name'
        },
        {
            label: 'Công ty/Tòa nhà (Nếu có)',
            key: 'company',
        },
        {
            label: 'Địa chỉ',
            key: 'address',
            type: 'area'
        },
        {
            label: 'Số điện thoại',
            key: 'phone_number',
            onlyNumber: true
        },
        {
            label: 'Email',
            key: 'email'
        },
        // {
        //     label: 'Mã thẻ',
        //     key: 'card_number',
        //     onlyNumber: true
        // },
        // {
        //     label: 'CVV',
        //     key: 'cvv',
        //     onlyNumber: true
        // },
        // {
        //     label: 'Ngày hết hạn',
        //     key: 'expired'
        // },
    ]


    initState = () => ({
        payment_type : 1,
        customer_name: '',
        company: '',
        address: '',
        phone_number: '',
        email:''
    })
    isNotValid(){
        const {customer_name , company , address ,phone_number , email} = this.state;
        let isEmpty = (val) => val === "";
        return isEmpty(customer_name) || isEmpty(company ) || isEmpty(address) || isEmpty(phone_number) || isEmpty(email) ;
    }
    render() {
        let cart = cartState.getState();
        const {payment_type} =this.state;
        return (
            <ManageLayout
                {...this.props}
            >
                <div className='checkout-page'>
                    <div className="main-container row">
                        <div className="col-lg-8">
                            <h3>Thông tin người nhận</h3>
                            <hr/>
                            <div className="col-lg-10">
                                {
                                    this.inputs.map((o, i) => (
                                        <div key={i} className="col-md-12">
                                            <h5>{o.label}
                                                <span
                                                    style={{
                                                        color: 'red',
                                                        'font-size': '12px'
                                                    }}>{o.onlyNumber ? " (CMND và CCCD)" : ""}</span></h5>
                                            <div className="form-group">
                                                {
                                                    o.type === 'area' ? (
                                                            <textarea
                                                                className="form-control description"
                                                                value={this.state[o.key]}
                                                                onChange={(e) => this.setState({[o.key]: e.target.value})}
                                                                placeholder={o.label}
                                                            />
                                                        ) :
                                                        o.type === 'select' ? (
                                                            <Select2
                                                                classNames={['form-control']}
                                                                width={300}
                                                                type={o.key}
                                                                select={this.state[o.key] || o.default}
                                                                list={o.list}
                                                                render={o.render}
                                                                onChange={(item) => {
                                                                    this.setState({
                                                                        [o.key]: item
                                                                    })
                                                                }}
                                                            />
                                                        ) : (
                                                            <input
                                                                type={o.onlyNumber ? 'number' : 'text'}
                                                                min={o.onlyNumber ? '0' : null}
                                                                className="form-control"
                                                                value={this.state[o.key]}
                                                                onChange={(e) => this.setState({[o.key]: e.target.value})}
                                                                placeholder={o.label}/>
                                                        )
                                                }

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="sumary">
                                <h3>Đơn Hàng</h3>
                                <h4 className= "gio-hang-checkout">
                                    {cart && cart.products.reduce((o, u) => o + u.quantity, 0)} sản phẩm
                                </h4>
                                <hr/>
                                <div className="products">
                                    {
                                        cart && cart.products.map((o, i) => (
                                            <div key={i} className='product flex-row'>
                                                <img width={60} src={o.images[0].filePath} alt=""/>
                                                <div className="product-detail">
                                                    <h4>
                                                        {o.name}
                                                    </h4>
                                                    <span>Số lượng: {o.quantity}</span>
                                                </div>

                                                <div className="price">
                                                    <h4>{formatter.format(o.price)}</h4>
                                                </div>
                                                <hr/>
                                            </div>
                                        ))
                                    }
                                </div>
                                <hr/>
                                <div className='total-price'>
                                    Tổng tiền: {formatter.format(cart.total_price || 0)}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="main-container row">
                        <div className="col-lg-6">
                            <ShippingSelect
                                onChange={(type) => this.setState({ payment_type : type  })}
                                type={payment_type}
                            />
                        </div>
                    </div>

                    <div className="main-container row">
                        <div className="col-lg-12">
                            <Button
                                disabled={this.isNotValid()}
                                type="primary"
                                size="large"

                                onClick={() => {
                                    let cart = cartState.getState();
                                    let draft = {
                                        ...this.state,
                                        cartId: cart._id
                                    }
                                    if(payment_type == 1){
                                        paymentTypeApi.momoPayment(draft).then(data =>{
                                            console.log(data);
                                            if(data.errorCode !=0){
                                                alert(data.message);
                                            }else{
                                                window.location.href = data.payUrl;
                                            }
                                        })
                                    }else if(payment_type == 2){
                                        paymentTypeApi.stripePayment(draft ).then(data => {
                                            console.log(data);
                                            var stripe = Stripe('pk_test_we4wQaoEXbcI2aGqGA271f6s00SezYhYRK');

                                            stripe.redirectToCheckout({
                                                sessionId: data.session.id
                                            }).then(function (result) {
                                            });
                                        })
                                    }
                                }}
                            >
                                Thanh Toán
                            </Button>
                        </div>

                    </div>

                </div>
            </ManageLayout>
        )
    }
}