import React from 'react';
import {brands} from "../../commond";

export class InformationPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            more: false
        };
    }

    infos = [
        {
            label: 'Tên',
            key: 'name'
        },
        {
            label: 'Giá',
            key: 'price',
            onlyNumber: true
        },
        {
            label: 'Brand Name',
            key: 'brand',
            render:(data) =>  brands.find(o => o.type === data.brand ).value.toUpperCase()
        },
        {
            label: 'CPU',
            key: 'cpu_name'
        },
        {
            label: 'Trọng lượng',
            key: 'weight'
        },
        {
            label: 'Bộ nhớ trong',
            key: 'memory',
            onlyNumber: true
        },
        {
            label: 'Số SIM',
            key: 'sim'
        },
        {
            label: 'Màn hình',
            key: 'monitor'
        },
        {
            label: 'Độ phân giải',
            key: 'resolution'
        },
        {
            label: 'OS',
            key: 'os'
        },
        {
            label: 'Phiên bản OS',
            key: 'os_version'
        },

        {
            label: 'Kích thước màn hình',
            key: 'monitor_size'
        },
        {
            label: 'Thẻ nhớ',
            key: 'memory_slot'
        },
        {
            label: "Camera Sau",
            key: 'back_camera'
        },
        {
            label: 'Camera Trước',
            key: 'front_camera'
        },
        {
            label: 'Quay Phim',
            key: 'video_info'
        },
        {
            label: 'Wifi',
            key: 'wlan'
        },
        {
            label: 'Bluetooth',
            key: 'bluetooth'
        },
        {
            label: 'GPS',
            key: 'gps'
        },
        {
            label: 'NFC',
            key: 'nfc'
        },
        {
            label: 'Cảm biến',
            key: 'sensor'
        },
        {
            label: 'Pin',
            key: 'battery'
        }

    ]

    render() {
        const {product} = this.props;
        const {more} = this.state;
        return (
            <div className='information-panel'>
                <h2>
                    Cấu hình
                </h2>
                <div className='infor-wrap'>
                    {
                        this.infos.slice(0, more?1000 : 10).map((o, i) => (
                            <div key={i} className='row infor-content no-margin'>
                                <div className='col-sm-4 infor-label'>
                                    {o.label}
                                </div>
                                <div className="col-sm-8 infor-value">
                                    <strong>

                                        {
                                            !o.render ? product[o.key] : o.render(product)
                                        }
                                    </strong>

                                </div>
                            </div>
                        ))
                    }

                    <div
                        onClick={() => this.setState({ more : !more })}
                        className='infor-content more-hide no-margin text-center'>
                        {more ? 'Ẩn bớt' : 'Xem thêm'}
                    </div>
                </div>

            </div>
        )
    }
}