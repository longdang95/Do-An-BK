import React from 'react';
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {AntdTable} from "../manage-inventory/antd-table";
import {formatter} from "../commond";
import {Progress} from "antd";
export class Provider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let providers =[
            {
                product_name : 'IPhone 11 Pro Max',
                price_in : 25000000,
                quantity : 230 ,
                date : '11/12/2019',
                percent : 56
            },
            {
                product_name : 'Iphone 11',
                price_in : 18900000 ,
                quantity:   124,
                date : '11/12/2019',
                percent : 70
            },
            {
                product_name : 'Iphone X',
                price_in : 12000000,
                quantity : 232,
                date : '23/11/2019',
                percent : 40
            },
            {
                product_name : 'Iphone 11 Pro',
                price_in : 22000000,
                quantity : 123,
                date : '23/11/2019',
                percent : 45
            },
            {
                product_name : 'Iphone XR',
                price_in : 18000000,
                quantity : 190,
                date : '25/11/2019',
                percent : 90
            }
        ]
        let columns=[
            {
                title: 'Tên Máy',
                dataIndex: 'product_name',
            },
            {
                title: 'GIÁ NHẬP',
                dataIndex: 'price_in',
                render: (item) => formatter.format(item),
                align :'right'
            },
            {
                title: 'Số Lượng',
                dataIndex: 'quantity',
                align :'right'
            },
            {
                title: 'Thời Gian Nhập',
                dataIndex: 'date',
                align :'right'
            },
        ]

        let columns2=[
            {
                title: 'Máy',
                dataIndex: 'product_name',
                width:180
            },
            {
                title: 'Số Máy',
                dataIndex: 'quantity',
                width :80
            },
            {
                title: 'Stat',
                dataIndex: 'percent',
                render:(item) => <Progress
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={item}/>,
                align :'left'
            },
        ]

        return(
           <AdminLayout
               {...this.props}
           >
               <div className='provider-page'>


                   <div className="main-container stats flex-row">
                       <div className='left-table box-shadow'>
                           <h3 className='no-margin'>Lịch sử nhập hàng từ kho FPT</h3>
                           <div>
                               <AntdTable
                                   columns={columns}
                                   data={providers}
                                   loading={false}
                               />
                           </div>
                       </div>

                       <div className='right-table box-shadow'>
                           <h3 className='no-margin'>Phân bố hàng từ FPT</h3>
                           <div>
                               <AntdTable
                                   columns={columns2}
                                   data={providers}
                                   loading={false}
                               />
                           </div>
                       </div>
                   </div>
               </div>
           </AdminLayout>
        )
    }
}