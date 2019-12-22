import React, {Fragment} from 'react';
import {userServices} from "../../../../services/user-info";

export class MenuPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let user = userServices.getUser();

        let menuItems = [{
            label: 'Home'
        }, {
            label: 'Log In',
            link: '/login'
        }, {
            label: 'Categories',
            link: '/mobile?brand=all'
        }, {
            label: 'Dashboard',
            link: '/dashboard'
        }, {
            label: 'Đơn Hàng',
            link: '/payments'
        }]

        let menuRights = [
            {
                label: 'Đăng ký',
                link: '/register'
            },
            {
                label: 'Đăng nhập',
                link: '/login'
            }
        ];

        return (
            <div className='menu-panel'>
                <div className='main-container'>
                    <div className="header-left">
                        {
                            menuItems.map((o, i) => (
                                <a key={i} className='none-underline' href={o.link || '#'}>
                                    <div className='menu-item'>
                                        {o.label}
                                    </div>
                                </a>
                            ))
                        }
                    </div>


                    {!user &&
                        <div className="header-right">
                            menuRights.map((o,i)=> (
                            <a key={i} className='none-underline' href={o.link || '#'}>
                                <div className='menu-item'>
                                    {o.label}
                                </div>
                            </a>
                            ))
                        </div>
                    }
                </div>
            </div>
        )
    }
}

class MenuDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: true
        };
    }

    render() {
        let {menu, index} = this.props;
        const {display} = this.state;
        return (
            <div
                onMouseEnter={() => this.setState({display: true})}
                onMouseLeave={() => this.setState({display: false})}
                key={index} className='menu-item'
            >
                {menu.label}
                {
                    display && menu.dropdown && menu.dropdown()
                }

            </div>
        )
    }
}