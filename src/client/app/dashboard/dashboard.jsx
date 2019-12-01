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

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sparkline: null,
            inventories : [],
            bills :[]
        };

        chartApi.getSumary().then(data => {
            this.setState({sparkline: data})
        })

        inventoryApi.getInventories().then(data =>  this.setState({inventories : data }))
        paymentApi.getPayments().then(data => {
            this.setState({bills: data})
        })
    }

    render() {
        const {sparkline , inventories , bills } = this.state;
        return (
            <AdminLayout
                {...this.props}
            >
                <div className='dashboard'>
                    <div className="main-container">
                        <h2>Trang Dashboard</h2>
                    </div>
                    {
                        sparkline && (
                            <Fragment>
                                <div className="row main-container justify-content-around">
                                    <div className="head-card col-lg-4">
                                        <div className="sum-cover">
                                            <h4>Máy bán trong tháng</h4>
                                            <div className='row sum-content no-margin'>
                                                <div className="col-lg-5">
                                                    <h4>3000</h4>
                                                    <h5>3.3 %</h5>
                                                </div>
                                                <div className="col-lg-7">
                                                    <SmallLineChart data={sparkline.inventoryData.map(o => (o[1]))}/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="head-card week col-lg-4">
                                        <div className="sum-cover sum-content">
                                            <h4>Máy bán trong tuần</h4>
                                            <div className='row no-margin'>
                                                <div className="col-lg-5">
                                                    <h4>3000</h4>
                                                    <h5>3.3 %</h5>
                                                </div>
                                                <div className="col-lg-7">
                                                    <SmallLineChart data={sparkline.pmData.map(o => (o[1]))}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="head-card col-lg-4">
                                        <div className="sum-cover">
                                            <h4>So với tháng trước</h4>
                                            <div className='row sum-content no-margin'>
                                                <div className="col-lg-5">
                                                    <h4>3000</h4>
                                                    <h5>3.3 %</h5>
                                                </div>
                                                <div className="col-lg-7">
                                                    <SmallLineChart data={sparkline.inventoryData.map(o => (o[1]))}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-container'>
                                    <Button type="primary">Primary</Button>
                                </div>
                                <div className='main-container'>

                                    <HighChartLine
                                        coinId={'price_in'}
                                        datas={[sparkline.inventoryData, sparkline.pmData]}
                                        setNames={['Giá nhập', 'Giá bán']}
                                    />

                                </div>
                            </Fragment>
                        )
                    }

                    <div className='payment-infomation row main-container'>
                        <div className="col-lg-4">
                            <InventoryInfo
                                inventories={inventories}
                            />
                        </div>
                        <div className="col-lg-8">
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