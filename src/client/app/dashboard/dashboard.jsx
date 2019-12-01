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
        const chartData = [];
        for (let i = 0; i < 20; i += 1) {
            chartData.push({
                x: new Date().getTime() + 1000 * 60 * 30 * i,
                y1: Math.floor(Math.random() * 100) + 1000,
                y2: Math.floor(Math.random() * 100) + 10,
            });
        }
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
                                                    <h5 >3000</h5>
                                                    <h5 style={{color : 'green'}} >3.3 %</h5>
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
                                                    <h5>3000</h5>
                                                    <h5 style={{color : 'green'}} >3.3 %</h5>
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
                                                    <h5>3000</h5>
                                                    <h5 style={{color : 'green'}}>3.3 %</h5>
                                                </div>
                                                <div className="col-lg-5">
                                                    <SmallLineChart data={sparkline.inventoryData.map(o => (o[1]))}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div style={{paddingTop : '50px'}} className='main-container'>

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