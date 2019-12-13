import React from 'react';
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {PieChart} from "../dashboard/pie-chart/pie-chart";
import {Table, Tag} from "antd";
import moment from "moment";
import {formatter} from "../commond";
import {AntdTable} from "./antd-table";

export class ManageInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let inventories = [
            {
                _id: '1',
                product_name: 'Iphone 11 Max',
                image: '/uploads/116asus1.jpg',
                price_in: 5200000,
                status: 1,
                provider: 'https://upload.wikimedia.org/wikipedia/vi/a/a2/FPT_Telecom_logo.svg',
                product_left: 124,
            },
            {
                _id: '2',
                product_name: 'Iphone 11 Max Like New',
                price_in: 4600000,
                image: '/uploads/116asus1.jpg',

                status: 2,
                provider: 'https://upload.wikimedia.org/wikipedia/vi/a/a2/FPT_Telecom_logo.svg',
                product_left: 45,
            },
            {
                _id: '3',
                product_name: 'SamSung S10',
                image: '/uploads/116asus1.jpg',

                price_in: 5900000,
                status: 3,
                provider: 'https://upload.wikimedia.org/wikipedia/vi/a/a2/FPT_Telecom_logo.svg',
                product_left: 52,
            },
            {
                _id: '4',
                product_name: 'XiaoMi 4',
                image: '/uploads/116asus1.jpg',

                price_in: 8300000,
                status: 2,
                provider: 'https://upload.wikimedia.org/wikipedia/vi/a/a2/FPT_Telecom_logo.svg',
                product_left: 40,
            },
            {
                _id: '5',

                product_name: 'Sony Xperia Z',
                image: '/uploads/116asus1.jpg',

                price_in: 9500000,
                status: 1,
                provider: 'https://upload.wikimedia.org/wikipedia/vi/a/a2/FPT_Telecom_logo.svg',
                product_left: 120,
            }
        ];

        let inventories2 = [
            {
                _id: '1',
                product_name: 'Iphone 11 Max',
                image: '/uploads/116asus1.jpg',
                price: 5200000,
                status: 1,
                isProvider : true ,
                provider: 'https://upload.wikimedia.org/wikipedia/vi/a/a2/FPT_Telecom_logo.svg',
                quantity: 10,
            },
            {
                _id: '2',
                product_name: 'Iphone 11 Max Like New',
                price: 4600000,
                image: '/uploads/116asus1.jpg',

                status: 2,
                provider: 'https://upload.wikimedia.org/wikipedia/vi/a/a2/FPT_Telecom_logo.svg',
                quantity: 1,
            },
            {
                _id: '3',
                product_name: 'SamSung S10',
                image: '/uploads/116asus1.jpg',

                price: 5900000,
                status: 1,
                isProvider : true ,
                provider: 'https://upload.wikimedia.org/wikipedia/vi/a/a2/FPT_Telecom_logo.svg',
                quantity: 52,
            },
            {
                _id: '4',
                product_name: 'Iphone XR',
                image: '/uploads/116asus1.jpg',

                price: 8300000,
                status: 2,
                provider: 'https://upload.wikimedia.org/wikipedia/vi/a/a2/FPT_Telecom_logo.svg',
                quantity: 2,
            },
            {
                _id: '5',

                product_name: 'Sony Xperia Z',
                image: '/uploads/116asus1.jpg',

                price: 9500000,
                status: 1,
                provider: 'https://upload.wikimedia.org/wikipedia/vi/a/a2/FPT_Telecom_logo.svg',
                quantity: 4,
            }
        ];

        const columns = [
            {
                title: 'MẶT HÀNG',
                dataIndex: '',
                render: (item) => <div className='row product-info'>
                    <img className='product-image' width={40} src={item.image} alt=""/>
                    <span className='product-name'>{item.product_name}</span>
                </div>
            },
            {
                title: 'GIÁ NHẬP',
                dataIndex: 'price_in',
                render: (item) => formatter.format(item),
                align :'right'
            },
            {
                title: 'TÌNH TRẠNG',
                dataIndex: 'status',
                render: (item) => <div className='status'>
                    <div className={`circle ${item ===1 ? 'hangton': item ===2 ?'hangmoi' :'schedule'}`}></div>
                    <span>{item ===1 ? 'Tồn Hàng': item ===2 ?'Hàng Mới' :'Đang Lên Lịch'}</span>
                </div>
            },
            {
                title: 'NHÀ PHÂN PHỐI',
                dataIndex: 'provider',
                render: (item) => <img height={40} src={item} alt=""/>
            },
            {
                title: 'SỐ LƯỢNG CÒN LẠI',
                dataIndex: 'product_left',
                align :'right',
                render: (item) => item
            },
            {
                title: "",
                dataIndex: '',
                render: (item) => <i className="fas fa-ellipsis-v"></i>,
                align :'right'

            }
        ];

        let columns2=[
            {
                title: 'TÊN MÁY',
                dataIndex: '',
                render: (item) => <div className='row product-info'>
                    <img className='product-image' width={40} src={item.image} alt=""/>
                    <span className='product-name'>{item.product_name}</span>
                </div>
            },
            {
                title: 'GIÁ',
                dataIndex: 'price',
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
                title: 'SỐ LƯỢNG',
                dataIndex: 'quantity',
                align :'right',
                render: (item) => item
            },
            {
                title: 'BÊN NHẬN/GỬI',
                dataIndex: '',
                render: (item) => item.isProvider ? <img height={40} src={item.provider} alt=""/> : 'Đơn hàng #123'
            },
            {
                title: "",
                dataIndex: '',
                render: (item) => <i className="fas fa-ellipsis-v"></i>,
                align :'right'

            }
        ]
        return (
            <AdminLayout
                {...this.props}
            >
                <div className='manage-inventory'>
                    <div className="row main-container stat-inventory">
                        <div className='stat-left flex-column'>
                            <div className="stat-card">
                                <h4>Tổng máy trong kho</h4>
                                <span>2,340</span>
                                <i className="fas fa-chart-pie"></i>
                            </div>

                            <div className="stat-card">
                                <h4>Kho còn trống</h4>
                                <span>150 chỗ</span>
                                <i className="far fa-chart-bar"></i>
                            </div>

                        </div>
                        <div className='stat-right'>
                            <PieChart
                                height={300}
                            />
                        </div>
                    </div>

                    <div className="row main-container inventory-table">
                        <h3>Danh Sách Kho Hàng</h3>
                        <AntdTable
                            columns={columns}
                            data={inventories}
                            loading={false}
                        />
                    </div>


                    <div className="row main-container inventory">
                        <h3>Danh Sách Hàng Ra Vào Kho</h3>
                        <AntdTable
                            columns={columns2}
                            data={inventories2}
                            loading={false}
                        />
                    </div>
                </div>
            </AdminLayout>
        )
    }
}