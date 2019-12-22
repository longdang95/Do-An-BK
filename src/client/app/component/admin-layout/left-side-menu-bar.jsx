import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {menus} from "./commons";


export class LeftSideMenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
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