import React, {Fragment} from 'react';

export class MenuPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let menuItems = [{
            label: 'Home'
        }, {
            label: 'Log In',
            link : '/login'
        }, {
            label: 'Categories',
            link : '/mobile?brand=all'
        }, {
            label: 'Pages',
            // dropdown: () => (
            //     <div className='dropdown'>
            //         <div>
            //             <div>Helo</div>
            //             <div>Helo</div>
            //             <div>Helo</div>
            //             <div>Helo</div>
            //             <div>Helo</div>
            //             <div>Helo</div>
            //         </div>
            //     </div>
            // )
        }, {
            label: 'People'
        }]
        return (
            <div className='menu-panel'>
                <div className='main-container'>
                    <div className="header-left">
                        {
                            menuItems.map((o, i) => (
                                <a key={i}  className='none-underline' href={o.link || '#'}>
                                    <div className='menu-item'>
                                        {o.label}
                                    </div>
                                </a>
                            ))
                        }
                    </div>

                    <div className="header-right">

                    </div>
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
        const {display}  =this.state;
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