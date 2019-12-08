import React, {Fragment} from 'react';
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {api} from "../../api/api";
import {HighChartLine} from "./high-chart-line/high-chart-line";
import {chartApi} from "../../api/chart/chart-api";
import {Button} from "antd";
import {SmallLineChart} from "./small-line-chart/small-line-chart";
import {InventoryInfo} from "./inventory-info/inventory-info";
import {PaymentInfo} from "./payment-info/payment-info";
import {inventoryApi} from "../../api/inventory/inventory-api";
import {paymentApi} from "../../api/payment/payment-api";
import {SearchDevice} from "../compare-divices/search-device/search-device";
import {productApi} from "../../api/product/product-api";

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sparkline: null,
            inventories : [],
            bills :[],
            listProducts : null,
            value :'',
            selectedProduct: null
        };

        // lấy danh sách sản phẩm
        productApi.getProducts().then((data )=>{
            this.setState({
                listProducts : data.list
            })
        })

        // lấy data chart
        this.getDataChart();

        // lấy thông tin kho nhập mới nhất
        inventoryApi.getInventories().then(data =>  this.setState({inventories : data }))

        // lấy thông tin thanh toán mới nhất
        paymentApi.getPayments().then(data => {
            this.setState({bills: data})
        })
    }



    getDataChart(){
        chartApi.getSumary().then(data => {
            this.setState({sparkline: data})
        })
    }

    // xử lý select product cho chart
    handleSelect(sel){
        this.setState({
            selectedProduct: sel
        })
        this.getDataChart();
    }
    render() {
        const {sparkline , inventories , bills ,listProducts,selectedProduct,value } = this.state;

        return (
            <AdminLayout
                {...this.props}
            >
                <div className='dashboard'>
                    <div className="main-container">
                        <h1>Dashboard</h1>
                    </div>
                    {
                        sparkline && (
                            <Fragment>
                                <div className="main-container sum-header">
                                    <div className="head-card">
                                        <div className="sum-cover">
                                            <div className='row sum-content no-margin'>

                                                <div className="col-lg-7">
                                                    <h4>Máy bán trong tháng</h4>
                                                    <h5 >3110</h5>
                                                    <h5 style={{color : 'green'}} >23.1 %</h5>
                                                </div>
                                                <div className="col-lg-5">
                                                    <SmallLineChart data={sparkline.inventoryData.map(o => (o[1]))}/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="head-card week">
                                        <div className="sum-cover sum-content">
                                            <div className='row no-margin'>
                                                <div className="col-lg-7">
                                                    <h4>Máy bán trong tuần</h4>
                                                    <h5>730</h5>
                                                    <h5 style={{color : 'green'}} >13.3 %</h5>
                                                </div>
                                                <div className="col-lg-5">
                                                    <SmallLineChart data={sparkline.pmData.map(o => (o[1]))}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="head-card">
                                        <div className="sum-cover">
                                            <div className='row sum-content no-margin'>
                                                <div className="col-lg-7">
                                                    <h4>So với tháng trước</h4>
                                                    <h5>+2240</h5>
                                                    <h5 style={{color : 'green'}}>23.3 %</h5>
                                                </div>
                                                <div className="col-lg-5">
                                                    <SmallLineChart data={sparkline.inventoryData.map(o => (o[1]))}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div style={{paddingTop : '50px'}} className='main-container'>
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="select-product col-lg-3">
                                                <h4>Chọn sản phẩm:</h4>
                                                {
                                                    listProducts && (
                                                        // component search và select sản phẩm
                                                        <SearchDevice
                                                            value={ value}
                                                            onChange={(val) => this.setState({ value : val})}
                                                            list={listProducts|| []}
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
                                        </div>

                                        <div className="row">
                                            {
                                                selectedProduct && (
                                                    <HighChartLine
                                                        id={'price_in'}
                                                        datas={[sparkline.inventoryData, sparkline.pmData]}
                                                        setNames={['Giá nhập', 'Giá bán']}
                                                    />
                                                )
                                            }

                                        </div>
                                    </div>


                                </div>
                            </Fragment>
                        )
                    }

                    <div className='payment-infomation row main-container'>
                        <div className="col-lg-4">
                            {/*component thông tin kho nhập*/}
                            <InventoryInfo
                                inventories={inventories}
                            />
                        </div>
                        <div className="col-lg-8">
                            {/*component thông tin thanh toán*/}
                            <PaymentInfo
                                payments={bills}
                            />
                        </div>
                    </div>

                </div>
            </AdminLayout>
        )
    }
}