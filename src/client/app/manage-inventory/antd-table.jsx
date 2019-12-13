import React from 'react';
import {Table} from "antd";
export class AntdTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                current: 1,
                total: 5
            },
        };
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
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
        const {columns , data , loading}=this.props ;
        return(
            <div className='antd-table'>
                <Table
                    columns={columns}
                    rowKey={record => record._id}
                    dataSource={data}
                    pagination={this.state.pagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                />

            </div>
        )
    }
}