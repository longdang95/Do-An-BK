import React from 'react';
import {Link} from "react-router-dom";
import {AppFooter} from "../app-layout/app-footer/app-footer";
import {Icon, Menu} from "antd";
import {LeftSideMenuBar} from "./left-side-menu-bar";
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
                    <LeftSideMenuBar/>
                    {this.props.children}
                </div>
                <AppFooter/>
            </div>
        )
    }
}

