import React from 'react';
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {formatter} from "../commond";
import {AntdTable} from "../manage-inventory/antd-table";
import {PieChart} from "../dashboard/pie-chart/pie-chart";
export class ProductInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let productInventory =[
            {
                product_name : 'IPhone 11 Pro Max',
                price_in : 25000000,
                quantity : 230 ,
                date : '11/12/2019',
                percent : 56,
                status :1
            },
            {
                product_name : 'IPhone 11 Pro Max',
                price_in : 18900000 ,
                quantity:   124,
                date : '11/12/2019',
                percent : 70,
                status :2
            },
            {
                product_name : 'IPhone 11 Pro Max',
                price_in : 12000000,
                quantity : 232,
                date : '23/11/2019',
                percent : 40,
                status :3
            },
            {
                product_name : 'IPhone 11 Pro Max',
                price_in : 22000000,
                quantity : 123,
                date : '23/11/2019',
                percent : 45,
                status :2
            },
            {
                product_name : 'IPhone 11 Pro Max',
                price_in : 18000000,
                quantity : 190,
                date : '25/11/2019',
                percent : 90,
                status :2
            }
        ]
        let columns=[
            {
                title: 'NGÀY THÁNG',
                dataIndex: 'date',
                align :'right'
            },
            {
                title: 'GIÁ',
                dataIndex: 'price_in',
                render: (item) => formatter.format(item),
                align :'right'
            },
            {
                title: 'TRẠNG THÁI',
                dataIndex: 'status',
                render: (item) => <div className='status'>
                    <div className={`circle ${item ===1 ? 'hangton': item ===2 ?'hangmoi' :'schedule'}`}></div>
                    <span>{item ===1 ? 'Xuất kho':'Nhập kho'}</span>
                </div>
            },
            {
                title: 'ĐỐI TÁC',
                dataIndex: '',
                render: ()=> '#Khách Hàng'
            },
            {
                title: "",
                dataIndex: '',
                render: (item) => <i className="fas fa-ellipsis-v"></i>,
                align :'right'

            }
        ]

        return(
            <AdminLayout
                {...this.props }
            >
                <div className='product-inventory'>
                    <div className="main-container flex-row">
                        <div className="left-table">
                            <h3>Iphone 11 Pro Max: Quản lý kho</h3>
                            <div className="">
                                <AntdTable
                                    columns={columns}
                                    data={productInventory}
                                    loading={false}
                                />
                            </div>
                        </div>

                        <div className="right-table">
                            <div className="">
                                <PieChart
                                    height={200}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </AdminLayout>
        )
    }
}