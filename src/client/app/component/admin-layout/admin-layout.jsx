import React from 'react';
import {Link} from "react-router-dom";
import {AppFooter} from "../app-layout/app-footer/app-footer";
import {Icon, Menu} from "antd";
import {LeftSideMenuBar} from "./left-side-menu-bar";
import {menus} from "./commons";
export class AdminLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {showSideBar =true } =this.props ;
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
                <div className='menu-mobile flex-row main-container'>
                    {
                        menus.map((o,i)=>(
                            <div className='menu-item' key={i}>
                                <Link to={o.to}>
                                    {o.label}
                                </Link>
                            </div>
                        ))
                    }
                </div>
                <div className="main-container main-center">
                    {showSideBar && <LeftSideMenuBar/> }
                    {this.props.children}
                </div>
                <AppFooter/>
            </div>
        )
    }
}

