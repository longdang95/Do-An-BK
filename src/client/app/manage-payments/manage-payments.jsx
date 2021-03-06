import React from 'react';
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {paymentApi} from "../../api/payment/payment-api";
import {PaginationTable} from "../component/pagination-table/pagination-table";
import moment from 'moment'
import {formatter, setTitle} from "../commond";
import {Tag} from "antd";

export class ManagePayments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: null
        };
        paymentApi.getPayments().then(data => {
            this.setState({bills: data})
        })
        setTitle('Quản lý đơn hàng')

    }

    columns = [
        {
            label: 'Tên người mua',
            renderCell: (item) =>
                <div
                    className='cell name'
                >
                    {item.customer_name}
                </div>
            ,
            classNames: 'left'
        },
        {
            label: 'Địa chỉ',
            renderCell: (item) =>
                <div
                    className='cell address'
                >
                    {item.address}
                </div>
            ,
            classNames: 'left'
        },
        {
            label: 'SĐT',
            renderCell: (item) =>
                <div
                    className='cell address'
                >
                    {item.phone_number}
                </div>
            ,
            classNames: 'right'
        },
        {
            label: 'Thời gian',
            renderCell: (item) =>
                <div
                    className='cell address'
                >
                    {moment(item.created).format("DD-MM-YYYY HH:mm:ss")}
                </div>,
            classNames: 'right'
        },
        {
            label: 'Tổng tiền',
            renderCell: (item) =>
                <div
                    className='cell address'
                >
                    {formatter.format(item.cart[0].total_price || 0)}
                </div>,
            classNames: 'right'

        },
        {
            label : 'Phương thức thanh toán',
            renderCell :(item) =>
                <div
                    className='cell payment-type'
                >
                    {item.payment_type == 1 ? "MOMO" :item.payment_type == 2 ? "Thẻ Visa" : "Test"}
                </div>,
            classNames :'mid'
        },
        {
            label: 'Trạng thái',
            renderCell: (item) =>
                <div
                    className='cell status-payment'
                >
                    {item.status ==2 ? <Tag color="green">Thành công</Tag> : item ==3 ? <Tag color='red'>Thất bại</Tag>  : <Tag color='purple'> Đang chờ</Tag> }
                </div>,
            classNames: 'right'

        },

    ]

    render() {
        return (
            <AdminLayout
                {...this.props}
            >
                <div className='manage-payments'>
                    <div className="row main-container">
                        <div className="col-lg-12">
                            <h2>Quản Lý Hóa Đơn</h2>
                        </div>
                        <div className="col-lg-12">
                            {this.state.bills &&
                            <PaginationTable
                                colums={this.columns}
                                list={this.state.bills}
                                perPage={10}
                            />
                            }
                        </div>

                    </div>
                </div>
            </AdminLayout>
        )
    }
}