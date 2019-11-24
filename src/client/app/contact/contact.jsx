import React from 'react';
import { MenuPanel } from '../component/app-layout/app-header/menu-panel/menu-panel';
import { AppHeader } from '../component/app-layout/app-header/app-header';


export class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='contact-layout'>
                <AppHeader />
            </div>
        )
    }
}