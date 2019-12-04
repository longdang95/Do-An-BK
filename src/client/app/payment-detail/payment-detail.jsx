import React, {Fragment} from 'react';
import {ManageLayout} from "../component/manage-layout/manage-layout";
import {paymentApi} from "../../api/payment/payment-api";
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {formatter} from "../commond";
export class PaymentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart : null,
            error :false
        };

        this.sessionId = props.match.params.sessionId  ;
        console.log(this.sessionId)
        paymentApi.getPaymentDetail(this.sessionId).then(data =>{
            if(data.error) {
                alert(data.message) ;
                this.setState({error :true })
            }
            else{
                this.setState({
                    error :false ,
                    cart:  data.cart
                })
            }

        })
    }

    render() {
        const {cart , error } =this.state ;
        return(
            <AdminLayout
                showMenu={false}
                {...this.props}
            >
                <div className='payment-detail'>
                    {cart &&
                        (
                            <Fragment>
                                <h1>
                                    { error ? 'Thanh toán thất bại !' : "Thanh toán thành công !" }
                                </h1>
                                <div>
                                    <h3>Tên khách hàng : {cart.customer_name}</h3>
                                    <h4>Địa chỉ : {cart.address}</h4>
                                    <h4>Số điện thoại : {cart.phone_number}</h4>
                                    <h4>Công ty / Tòa Nhà (Nếu có) : {cart.company}</h4>
                                    <h4>Hình thức thanh toán: {cart.payment_type ==1 ? "MOMO" : "Thẻ Visa"}</h4>
                                </div>
                                <div className="main-container row justify-content-center">
                                    <div className="col-lg-4">
                                        <div className="sumary">
                                            <h3>Danh sách sản phẩm</h3>
                                            <h4>
                                                {cart.products.reduce((o, u) => o + u.quantity, 0)} sản phẩm
                                            </h4>
                                            <hr/>
                                            <div className="products">
                                                {
                                                    cart.products.map((o, i) => (
                                                        <div key={i} className='product flex-row'>
                                                            <img height={60} width={60} src={o.images[0].filePath} alt=""/>
                                                            <div className="product-detail">
                                                                <h4>
                                                                    {o.name}
                                                                </h4>
                                                                <span>Số lượng: {o.quantity}</span>
                                                            </div>

                                                            <div className="price">
                                                                <h4>{formatter.format(o.quantity * o.price )}</h4>
                                                            </div>
                                                            <hr/>
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            <h3 style={{'text-align':'right'}}>
                                                Tổng tiền : { formatter.format(cart.total_price || 0) }
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    }

                </div>
            </AdminLayout>
        )
    }
}