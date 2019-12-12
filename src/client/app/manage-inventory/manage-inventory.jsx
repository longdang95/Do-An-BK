

import React from 'react';
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {PieChart} from "../dashboard/pie-chart/pie-chart";
export class ManageInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
           <AdminLayout
               {...this.props}
           >
               <div className='manage-inventory'>
                    <div className="main-container stat-inventory">
                        <div className='stat-left flex-column'>
                            <div className="stat-card">
                                <h4>Tổng máy trong kho</h4>
                                <span>2,340</span>
                                <i className="fas fa-chart-pie"></i>
                            </div>

                            <div className="stat-card">
                                <h4>Kho còn trống</h4>
                                <span>150 chỗ</span>
                                <i className="far fa-chart-bar"></i>
                            </div>

                        </div>
                        <div className='stat-right'>
                            <PieChart
                                height={300}
                            />
                        </div>
                    </div>
               </div>
           </AdminLayout>
        )
    }
}