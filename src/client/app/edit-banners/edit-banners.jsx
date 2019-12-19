import React from 'react';
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {Table, Tag} from "antd";
import {bannerApi} from "../../api/banner/banner-api";
import classnames from "classnames";
import _ from 'lodash'
import {setTitle} from "../commond";

export class EditBanners extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: null,
            loading: false
        };

        bannerApi.getBannes(false ).then(data => {
            this.setState({banners: data})
        })
        this.editBanner = _.debounce(this.editBanner, 1500)
        setTitle('Chỉnh sửa ảnh quảng cáo trang chủ')

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

    handleOnChangeActive(item) {
        let {banners} = this.state;
        this.setState({loading: true})
        bannerApi.editBanner({...item , active : !item.active}).then(({error , message , banner }) =>{
            if(error) {
                alert(message)
                this.setState({ loading : false })
            }else{
                let newMap= this.mergeData(banners , item , { active : banner.active })
                this.setState({ loading : false , banners : newMap })
            }

        })

    }

    editBanner(item) {
        this.setState({loading: true})
        setTimeout(() => {
            bannerApi.editBanner(item).then(({error, message, banner}) => {
                if (error) {
                    alert(message)
                }
                this.setState({loading: false})
            })
        }, 500)

    }

    mergeData(array, item, data) {
        return array.map((o) => {
            if (o._id === item._id) return {...item, ...data}
            return o;
        })
    }

    handleOnChange = (item, value) => {
        const {banners} = this.state;
        let newMap = this.mergeData(banners, item, {redirect_link: value})
        this.setState({banners: newMap})
        this.editBanner({...item, redirect_link: value});
    }

    render() {
        const {banners} = this.state;
        console.log(banners)
        const columns = [
            {
                title: 'Image',
                dataIndex: 'filePath',
                render: (item) => <img width='40px' src={item} alt=""/>
            },
            {
                title: 'Link điều hướng',
                dataIndex: '',
                render: (item) => <HoverInput value={item.redirect_link}
                                              onChange={(value) => this.handleOnChange(item, value)}/>
            },
            {
                title: 'Trạng thái',
                dataIndex: '',
                align: 'right',
                render: (item) =>
                    <div
                        onClick={() => this.handleOnChangeActive(item)}
                    >
                        <Tag color={item.active ? 'green' : 'red'}>{item.active ? "Active" : "Non-Active"}</Tag>
                    </div>
            },
        ]
        return (
            <AdminLayout
                {...this.props}
            >
                <div className='edit-banners'>
                    <div className="main-container">
                        <h3>Sửa thông tin ảnh bìa: </h3>
                    </div>

                    <div className='row main-container'>
                        <Table
                            size='middle'
                            columns={columns}
                            rowKey={record => record._id}
                            dataSource={banners}
                            pagination={this.state.pagination}
                            loading={this.state.loading}
                            onChange={this.handleTableChange}
                        />
                    </div>
                </div>
            </AdminLayout>
        )
    }
}

class HoverInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHover: false
        };
    }

    render() {
        const {value, onChange} = this.props;
        const {isHover} = this.state;
        return (
            <div
                onMouseEnter={() => this.setState({isHover: true})}
                onMouseLeave={() => this.setState({isHover: false})}
                className='hover-input'>
                <input
                    className={classnames(isHover ? 'active' : 'non-active')}
                    disabled={!isHover}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        )
    }
}