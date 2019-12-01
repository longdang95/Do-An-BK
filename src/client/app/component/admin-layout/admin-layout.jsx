import React from 'react';
import {Link} from "react-router-dom";
import {AppFooter} from "../app-layout/app-footer/app-footer";
import {Icon, Menu} from "antd";
export class AdminLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {showMenu =true } =this.props ;
        return(
            <div className='admin-layout'>
                <LeftSideMenuBar />
                <div className="header">
                    <div className="main-container">
                        <Link to='/'>
                            <img
                                height='40'
                                src="https://i.imgur.com/fPq8Yb8.png"
                                alt=""/>
                        </Link>
                    </div>
                </div>

                <div className="main-container main-center">
                    {this.props.children}
                </div>
                <AppFooter/>
            </div>
        )
    }
}

class LeftSideMenuBar  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <div className='left-side-menu-bar'>
                <Menu
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode={this.state.mode}
                    onClick={({ item, key, keyPath, domEvent })=>{
                        console.log(item)
                    }}
                    theme={this.state.theme}
                >
                    <Menu.Item
                        key="1">
                        <Link to='/dashboard'>
                            Dashboard
                        </Link>

                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to='/add-product'>
                            Thêm sản phẩm mới
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/trials'>
                            Danh Sách Dùng Thử
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to='/payments'>
                            Hóa Đơn
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="4">
                        <Link to='/warehousing'>
                            Nhập Kho
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}