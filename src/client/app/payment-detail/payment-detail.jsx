import React, {Fragment} from 'react';
import {ManageLayout} from "../component/manage-layout/manage-layout";
import {paymentApi} from "../../api/payment/payment-api";
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {formatter} from "../commond";
export class PaymentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentDetail : null

        };

        this.sessionId = props.match.params.sessionId  ;
        console.log(this.sessionId)
        paymentApi.getPaymentDetail(this.sessionId).then(data =>{
            console.log(data)
            this.setState({
                paymentDetail:  data
            })
        })
    }

    render() {
        const {paymentDetail} =this.state ;
        return(
            <AdminLayout
                showMenu={false}
                {...this.props}
            >
                <div className='payment-detail'>
                    {paymentDetail &&
                        (
                            <Fragment>
                                <h1>
                                    Thanh toán thành công !
                                </h1>
                                <div className="main-container row justify-content-center">
                                    <div className="col-lg-4">
                                        <div className="sumary">
                                            <h3>Danh sách sản phẩm</h3>
                                            <h4>
                                                {paymentDetail.display_items.reduce((o, u) => o + u.quantity, 0)} sản phẩm
                                            </h4>
                                            <hr/>
                                            <div className="products">
                                                {
                                                    paymentDetail.display_items.map((o, i) => (
                                                        <div key={i} className='product flex-row'>
                                                            <img width={60} src={o.custom.images[0]} alt=""/>
                                                            <div className="product-detail">
                                                                <h4>
                                                                    {o.custom.name}
                                                                </h4>
                                                                <span>Số lượng: {o.quantity}</span>
                                                            </div>

                                                            <div className="price">
                                                                <h4>{formatter.format(o.quantity * o.amount )}</h4>
                                                            </div>
                                                            <hr/>
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            <h3>
                                                Total : { formatter.format(paymentDetail.display_items.reduce((o, u) => o + u.quantity* u.amount, 0)) }
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