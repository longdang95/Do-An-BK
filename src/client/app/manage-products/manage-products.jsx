

import React from 'react';
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {Button, Table} from "antd";
import moment from "moment";
import {formatter} from "../commond";
import {productApi} from "../../api/product/product-api";



export class ManageProducts  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products :null,
            pagination:{},
            loading:false
        };

        productApi.getProducts().then(data =>{
            this.setState({ products : data.list , pagination: {
                    current : 1,
                    total: data.list.length
                } })
        })
    }

    handleActive=(item)=>{
        this.setState({loading :true })
        let _self  = this;

        if(confirm(`Bạn muốn tạm dừng bán sản phẩm "${item.name}" ?`)){
            productApi.updateStatus(item._id  , !item.status ).then(({error , message , status } ) =>{
                alert(message);
                if(!error){
                    this.setState({loading :false  , products : this.state.products.map(o => o._id == item._id ? ({...o , status : status  }) : (o) ) })
                }
            })
        }else{
            this.setState({loading :false })

        }



    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    render() {
        const {products , loading } =this.state ;
        const columns = [
            {
                title: 'Image',
                dataIndex: 'images',
                render:(item) => <img width='40px' height='40px' src={item[0].filePath} alt=""/>
            },
            {
                title: 'Tên sản phẩm',
                dataIndex: 'name',
            },
            {
                title: 'Giá',
                dataIndex: 'price',
                align:'right',
                // filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
                // width: '20%',
                render :(item) => formatter.format(item)
            },
            {
                title : 'Ram',
                align:'right',

                dataIndex :'ram'
            },

            {
                title : 'CPU',
                align:'right',
                dataIndex : 'cpu'
            }
            ,
            {
                title : 'Tên CPU',
                dataIndex :'cpu_name'
            },
            {
                title : 'Hành động',
                align:'right',
                dataIndex :'',
                render: (item) => {
                    let isActive = item.status ;
                    return (
                        <div>
                            <Button
                                onClick={()=>this.handleActive(item)} size='normal' type={isActive ? 'danger' :'primary'} shape="round" >{isActive ? "Tạm dừng bán" :"Bỏ tạm dừng"}</Button>
                        </div>
                    )
                }
            }


        ]

        return(
           <AdminLayout>
               <div className='manage-products'>
                   <div className='row main-container'>
                       <Table
                           size='middle'
                           columns={columns}
                           rowKey={record => record._id}
                           dataSource={products}
                           pagination={this.state.pagination}
                           // loading={this.state.loading}
                           onChange={this.handleTableChange}
                       />
                   </div>

               </div>
           </AdminLayout>
        )
    }
}