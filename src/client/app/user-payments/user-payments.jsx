import React from 'react';
import {AppLayout} from "../component/app-layout/app-layout";
import {AntdTable} from "../manage-inventory/antd-table";
import {paymentApi} from "../../api/payment/payment-api";
import {formatter, setTitle} from "../commond";
import {Avatar, Tag} from "antd";
export class UserPayments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payments: []
        };
        paymentApi.getUserPayments().then(data =>{
            this.setState({ payments : data})
        })
        setTitle('Payments của người dùng')

    }

    render() {
        const {payments} = this.state ;
        let columns=[
            {
                title: 'Payment Id',
                dataIndex: '_id',
            },
            {
                title: 'Tên Người Mua',
                dataIndex: 'customer_name',
                align :'right'
            },
            {
                title: 'Địa Chỉ',
                dataIndex: 'address',
                align :'right'
            },
            {
                title: 'SĐT',
                dataIndex: 'address',
                align :'right'
            },
            {
                title : "Sản Phẩm",
                align :'center',
                render :(item) =>
                    <div className='flex-row'>
                        {item.cart.products.map((o,i)=>
                            <Avatar style={{marginRight : '5px'}} key={i} src={o.images[0].filePath} />
                        )}
                    </div>

            },
            {
                title :"Thanh toán",
                dataIndex :'payment_type',
                render :(item) => !item ? 'Test' : item == 1 ? "MOMO" :item == 2 ? "Thẻ Visa" : "Test"
            },
            {
                title : 'Trạng thái',
                dataIndex :'status',
                render : (item) => item ==2 ? <Tag color="green">Thành công</Tag> : item ==3 ? <Tag color='red'>Thất bại</Tag>  : <Tag color='purple'> Đang chờ</Tag>
            },
            {
                title : 'Tổng Tiền',
                dataIndex :'',
                render : (item) => formatter.format(item.cart.total_price)
            }
        ]
        return(
            <AppLayout
                {...this.props}
                showAds={false}
            >
                <div className='user-payments'>
                    <div className="row main-container">
                        <h3>Danh Sách Payments:</h3>
                    </div>
                    <div className="main-container">
                        <AntdTable
                            columns={columns}
                            data={payments}
                            loading={false}
                        />
                    </div>
                </div>
            </AppLayout>
        )
    }
}