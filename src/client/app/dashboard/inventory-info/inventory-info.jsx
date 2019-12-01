
import React from 'react';
import {Avatar, List} from "antd";
import moment from 'moment';
export class InventoryInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {inventories} = this.props ;
        return(
            <div className='inventory-info'>
                <List
                    size="large"
                    header={<h4 style={{ margin: '0 !important' }}>Kho Hàng:</h4>}
                    // footer={<div>Footer</div>}
                    bordered
                    dataSource={inventories}
                    renderItem={item => <List.Item
                        className='inven'
                        key={item._id}>
                        <Avatar src={item.product_image} />
                        <div className='inven-right flex-row'>
                            <div
                                style={{'marginLeft' :'20px' ,'fontWeight':'600'}}
                                className='inven-left flex-column'>
                                <span >Sản phẩm: {item.product_name}</span>
                                <span >Số lượng: {item.quantity_in}</span>
                            </div>
                            <div className='time'>
                                {moment(new Date(item.created)).format("DD/MM/YYYY, HH:mm a")}
                            </div>
                        </div>
                    </List.Item>}
                />
            </div>
        )
    }
}
