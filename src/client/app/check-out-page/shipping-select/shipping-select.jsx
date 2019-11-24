import React from "react";
import classnames from 'classnames' ;
export class ShippingSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shippingtypes = [
        {
            type: 1,
            label: 'Thanh toán Momo',
            comp: <div></div>,
            image: 'https://static.mservice.io/img/logo-momo.png'
        },
        {
            type: 2,
            label: 'Thanh toán qua Thẻ tín dụng',
            comp: <div></div>,
            image :'https://icon-library.net/images/visa-master-icon/visa-master-icon-7.jpg'
        }
    ]

    render() {
        const {type , onChange } = this.props;
        return (
            <div className='shipping-select'>
                <div className='shipping-controller flex-column'>
                    {
                        this.shippingtypes.map((o, i) => (
                            <div
                                key={i}
                                className={classnames('shipping-select' , type === o.type ?'active':'')}>
                                <input
                                    className='cbox'
                                    checked={type === o.type}
                                    onChange={()=> onChange(o.type)}
                                    type="checkbox"/>
                                <img style={{marginLeft :'10px'}} width='40px' src={ o.image }alt=""/>
                                <span>{o.label}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}