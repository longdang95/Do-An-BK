import React from 'react';
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {PaginationTable} from "../component/pagination-table/pagination-table";
import {Select2} from "../common/select/select2";
import {productApi} from "../../api/product/product-api";
import {SearchDevice} from "../compare-divices/search-device/search-device";

// Trang thêm sản phẩm vào kho
export class WareHousing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: null,
            list: null,
        };

        // lấy danh sách sản phẩm từ database
        productApi.getProducts().then((data )=>{
            this.setState({
                list : data.list
            })
        })
    }

    // xử lý select sản phẩm
    handleSelect(sel){
        this.setState({
            selectedProduct: sel
        })
    }
    render() {
        const {selectedProduct, list ,value } = this.state;
        return (
            <AdminLayout
                {...this.props}
            >
                <div className='ware-housing'>
                    <div className="row main-container">
                        <div className="col-lg-12">
                            <h2>Quản lý kho</h2>
                        </div>
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-3">
                                    <h4>Chọn sản phẩm:</h4>
                                    {
                                        list && (
                                            // component search và select sản phẩm
                                            <SearchDevice
                                                value={ value}
                                                onChange={(val) => this.setState({ value : val})}
                                                list={list|| []}
                                                selectItem={ selectedProduct }
                                                onSelect={(sel) => this.handleSelect(sel)}
                                                renderResult={(item)=> (
                                                    <div onClick={()=> this.handleSelect(item)} className='content-rs flex-row'>
                                                        <span className='device-name'>{item.name}</span>
                                                        <img className='device-image' src={item.images[0].filePath} height={40} alt=""/>
                                                    </div>
                                                )}
                                                renderSelected={(item) => (
                                                    <div
                                                        className='selected-item'>

                                                    </div>
                                                )}
                                            />
                                        )
                                    }
                                </div>

                                <div className="col-lg-3">
                                    <h4>Giá mua:</h4>
                                    <input
                                        type={'number'}
                                        min={0}
                                        className="form-control"
                                        value={this.state.price}
                                        onChange={(e) => this.setState({price: e.target.value})}
                                        placeholder='Giá mua'/>
                                </div>

                                <div className="col-lg-3">
                                    <h4>Số lượng:</h4>
                                    <input
                                        type={'number'}
                                        min={0}
                                        className="form-control"
                                        value={this.state.quantity}
                                        onChange={(e) => this.setState({quantity: e.target.value})}
                                        placeholder='Số lượng'/>
                                </div>
                                <div className="col-lg-3">
                                    <button className='btn add-quantity btn-primary'>
                                        Thêm vào kho
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </AdminLayout>
        )
    }
}