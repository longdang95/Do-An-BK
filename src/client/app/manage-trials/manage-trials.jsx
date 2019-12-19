import React from 'react';
import {ManageLayout} from "../component/manage-layout/manage-layout";
import {trialRegisterApi} from "../../api/trial-register/trial-register";
import {PaginationTable} from "../component/pagination-table/pagination-table";
import {CheckBox} from "../component/check-box/check-box";
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {setTitle} from "../commond";
export class ManageTrials extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trials : null,
            submitting: false
        };
        setTitle('Quản lý dùng thử')

    }
    componentDidMount(){
        trialRegisterApi.getTrials().then(data =>{
            console.log(data )
            this.setState({ trials : data })
        })
    }
    columns=[
        {
            label: 'Tên người đăng ký',
            renderCell: (item) =>
                    <div
                        className='cell name'
                    >
                        {item.name}
                    </div>
            ,
            classNames: 'left'
        },
        {
            label: 'Sản phẩm',
            renderCell: (item) =>
                <div
                    className='cell product'
                >

                    <img src={item.product.images[0].filePath} width={40} alt=""/>
                    {item.product.name}
                </div>
            ,
            classNames: 'left'
        },
        {
            label: 'Địa chỉ',
            renderCell: (item) =>
                <div
                    className='cell address'
                >
                    {item.address +", " + item.district.Title}
                </div>
            ,
            classNames: 'left'
        },
        {
            label: 'CMTND',
            renderCell: (item) =>
                <div
                    className='cell cmtnd'
                >
                    {item.cmtnd}
                </div>
            ,
            classNames: 'left'
        },
        {
            label: 'Số điện thoại',
            renderCell: (item) =>
                <div
                    className='cell phone-number'
                >
                    {item.sdt}
                </div>
            ,
            classNames: 'left'
        },
        {
            label: 'Trạng thái',
            renderCell: (item) =>
                <div
                    className='cell status'
                >
                    <StatusController
                        trial={item}
                        submitting={this.state.submitting}
                        onClick={()=>{
                            trialRegisterApi.acceptTrial(item._id).then(data =>{

                                if(data){
                                    this.setState({
                                        submitting :true
                                    })
                                    setTimeout(()=>{
                                        this.setState({
                                            submitting:false,
                                            trials : this.state.trials.map((o,i)=>{
                                                if(o._id === item._id){
                                                    return data;
                                                }
                                                return o ;
                                            })
                                        })
                                    },1000)

                                }

                            })
                        }}
                    />
                </div>
            ,
            classNames: 'right'
        },

    ]
    render() {
        const {trials} =this.state;
        return(
            <AdminLayout
                {...this.props}
            >
                <div className='manage-trials'>
                    <div className="row main-container">
                        <div className="col-lg-12">
                            <h2>Quản Lý Đăng Ký Dùng Thử</h2>
                        </div>


                        <div className="col-lg-12">
                            {
                                trials && (
                                    <PaginationTable
                                        perPage={10}
                                        colums={this.columns}
                                        list={trials}
                                    />
                                )
                            }

                        </div>
                    </div>
                </div>
            </AdminLayout>
        )
    }
}

class StatusController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {trial ,submitting, onClick} =this.props;
        if(trial.startTime){
            let startDate = new Date(trial.startTime) ;
            let ranger = new Date().getTime() - startDate.getTime();
            let rangerDay = ranger / (1000 * 3600 * 24);
            console.log(rangerDay)
            if(rangerDay <= trial.maxDay){
                return (
                    <div className='status-controller'>
                        Còn lại: {((3- rangerDay)*(24)).toFixed(2)} giờ
                    </div>
                )
            }else{
                return (
                    <div className='status-controller'>
                        Quá hạn: {((rangerDay - 3 )*(24)).toFixed(2) } giờ
                    </div>
                )
            }
        }else{
            return(
                <div className='status-controller'>
                    <button
                        onClick={()=> {
                            onClick()
                        }}
                        className='accept-trial'>
                        {submitting ? <i className="fas fa-circle-notch fa-spin"></i> : 'Xác nhận'}
                    </button>
                </div>
            )
        }

    }
}
