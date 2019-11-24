import React, {Fragment} from 'react';
import {Select2} from "../../common/select/select2";
import {brands} from "../../commond";
import {cities} from "../../cities";

export class TrialModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState()
    }
    initState(){
        return {
            name: '',
            cmtnd: '',
            sdt: '',
            address: '',
            district: '',

        }
    }
    inputs = [
        {
            label: 'Tên Khách Hàng',
            key: 'name'
        },
        {
            label: 'Số Chứng Minh Thư',
            key: 'cmtnd',
            onlyNumber: true
        },
        {
            label: 'Số Điện Thoại',
            key: 'sdt',
            onlyNumber: true
        },
        {
            label: 'Địa chỉ',
            key: 'address',
            type: 'area',
        },
        {
            label: 'Quận',
            list: cities,
            render: (item) => item.Title,
            default: cities[2],
            key: 'district',
            type: 'select'
        }

    ]

    render() {
        const {modalTitle, onOke , onClose } = this.props;
        return (
            <div className='trial-modal'>
                {
                    modalTitle && (
                        <h2>{modalTitle}</h2>
                    )
                }
                <div className="col-md-12">
                    <span className='warning-label'>
                        (* Chú ý: Mỗi 1 sản phẩm được mượn mặc định 3 ngày ! )
                    </span>
                </div>

                {
                    this.inputs.map((o, i) => (
                        <div key={i} className="col-md-12">
                            <h5>{o.label}
                                <span
                                    style={{
                                        color: 'red',
                                        'font-size': '12px'
                                    }}>{o.onlyNumber ? " (only number)" : ""}</span></h5>
                            <div className="form-group">
                                {
                                    o.type === 'area' ? (
                                            <textarea
                                                className="form-control description"
                                                value={this.state[o.key]}
                                                onChange={(e) => this.setState({[o.key]: e.target.value})}
                                                placeholder={o.label}/>
                                        ) :
                                        o.type === 'select' ? (
                                            <Select2
                                                classNames={['form-control']}
                                                width={300}
                                                type={o.key}
                                                select={this.state[o.key] || o.default}
                                                list={o.list}
                                                render={o.render}
                                                onChange={(item) => {
                                                    this.setState({
                                                        [o.key]: item
                                                    })
                                                }}
                                            />
                                        ) : (
                                            <input
                                                type={o.onlyNumber ? 'number' : 'text'}
                                                min={o.onlyNumber ? '0' : null}
                                                className="form-control"
                                                value={this.state[o.key]}
                                                onChange={(e) => this.setState({[o.key]: e.target.value})}
                                                placeholder={o.label}/>
                                        )
                                }

                            </div>
                        </div>
                    ))
                }
                <div className="trial-modal-bottom col-md-12">
                    <button
                        className='btn-dungthu'
                        onClick={() => {
                            onOke && onOke(this.state);
                            // setTimeout(()=>{
                            //     this.setState({
                            //         ...this.initState
                            //     },()=>{
                            //         onClose && onClose();
                            //     })
                            // },0)
                        }}
                    >
                        Đăng ký
                    </button>
                </div>
            </div>
        )
    }
}