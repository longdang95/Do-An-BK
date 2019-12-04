

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

    handleDelete=(item)=>{
        this.setState({loading :true })
        let _self  = this;

        if(confirm(`Bạn muốn xóa sản phẩm "${item.name}" ?`)){
            productApi.deleteProduct(item._id ).then((error , message ) =>{
                alert(message);
                this.setState({loading :false  , products : this.state.products.filter(o => o._id !== item._id ) })
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
                // filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
                // width: '20%',
                render :(item) => formatter.format(item)
            },
            {
                title : 'Ram',
                dataIndex :'ram'
            },

            {
                title : 'CPU',
                dataIndex : 'cpu'
            }
            ,
            {
                title : 'Tên CPU',
                dataIndex :'cpu_name'
            },
            {
                title : 'Act',
                dataIndex :'',
                render: (item) => <div>
                    <Button
                        onClick={()=>this.handleDelete(item)} type="danger" shape="round" >Xóa</Button>
                </div>
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