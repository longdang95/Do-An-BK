import React from 'react';
import {Table, Tag} from "antd";
import moment from "moment";
import {formatter} from "../../commond";

const columns = [
    {
        title: 'Tên khách hàng',
        dataIndex: 'customer_name',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        // filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
        // width: '20%',
    },
    {
        title: 'SDT',
        dataIndex: 'phone_number',
    },
    {
        title: 'Tgian',
        dataIndex: 'created',
        render:(item) => moment(item).format("DD-MM-YYYY HH:mm a")
    },
    {
        title :'Tổng tiền',
        dataIndex: 'cart',

        render:(item) => formatter.format(item[0].total_price || 0)
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
    }
];


export class PaymentInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                current : 1,
                total: props.payments.length
            },
        };
    }

    componentDidMount() {
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };




    render() {
        const {payments} =this.props ;
        console.log(payments)
        return(
            <div className='payment-info'>
                <Table
                    columns={columns}
                    rowKey={record => record._id}
                    dataSource={payments}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}