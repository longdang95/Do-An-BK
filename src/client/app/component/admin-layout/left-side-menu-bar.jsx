import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";


export class LeftSideMenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let menus = [
            {
                to: '/dashboard',
                label: 'Dashboard'
            },
            {
                to: '/add-product',
                label: 'Thêm sản phẩm mới'
            },
            {
                to: '/products',
                label: 'Quản lý sản phẩm'
            },
            {
                to: '/trials',
                label: 'Danh Sách Dùng Thử'
            },
            {
                to: '/payments',
                label: 'Hóa Đơn'
            },
            {
                to: '/warehousing',
                label: 'Nhập Kho'
            },
            {
                to: '/manage-warehousing',
                label : 'Quản lý kho'
            },
            {
                to: '/update-banners',
                label: 'Update ảnh bìa'
            },
            {
                to: '/edit-banners',
                label: 'Quản lý ảnh bìa'
            },
        ]
        return (
            <div className='left-side-menu-bar'>
                <Menu
                    style={{width: 256}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode={this.state.mode}
                    onClick={({item, key, keyPath, domEvent}) => {
                        console.log(item)
                    }}
                    theme={this.state.theme}
                >
                    {
                        menus.map((o,i)=>(
                            <Menu.Item
                                key={i+1}>
                                <Link to={o.to}>
                                    {o.label}
                                </Link>

                            </Menu.Item>
                        ))
                    }
                </Menu>
            </div>
        )
    }
}