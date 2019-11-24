import React from 'react';
import {Link} from "react-router-dom";
import {AppFooter} from "../app-layout/app-footer/app-footer";
export class AdminLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {showMenu =true } =this.props ;
        let menuItems = [{
            label: 'Thêm sản phẩm mới',
            link : '/manage/add-product'
        }, {
            label: 'Quản lý danh sách dùng thử',
            link :'/manage/trials'
        },{
            label : 'Quản lý hóa đơn',
            link : '/manage/payments'
        },{
            label : 'Nhập Kho',
            link : '/manage/warehousing'
        }
        ]
        return(
            <div className='admin-layout'>
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
                {
                    showMenu && (
                        <div className='menu-controler main-container'>
                            <div className="header-left flex-row">
                                {
                                    menuItems.map((o, i) => (
                                        <Link key={i}  className='none-underline' to={o.link || '#'}>
                                            <div className='menu-item'>
                                                {o.label}
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

                <div className="main-container main-center">
                    {this.props.children}
                </div>
                <AppFooter/>
            </div>
        )
    }
}