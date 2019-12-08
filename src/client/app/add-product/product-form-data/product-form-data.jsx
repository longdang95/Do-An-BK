import React from "react";
import {brands} from "../../commond";
import _ from "lodash";
import {Select2} from "../../common/select/select2";
import {Editor} from "../editor/editor";
import {UploadImage} from "../../component/upload-image/upload-image";

export class ProductFormData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    inputs = [
        {
            label: 'Product Name',
            key: 'name'
        },
        {
            label: 'Price',
            key: 'price',
            onlyNumber: true
        },
        {
            label: 'Brand Name',
            key: 'brand',
            list: brands.map(o => _.omit(o, 'icon')),
            render: (item) => item.value.toUpperCase(),
            default: {value: 'apple'},
            type: 'select'
        },
        {
            label: 'CPU Name',
            key: 'cpu_name'
        },
        {
            label: 'Weight',
            key: 'weight'
        },
        {
            label: 'Memory',
            key: 'memory',
            onlyNumber: true
        },
        {
            label: 'sim',
            key: 'sim',
            onlyNumber: true
        },
        {
            label: 'Monitor',
            key: 'monitor'
        },
        {
            label: 'Resolution',
            key: 'resolution'
        },
        {
            label: 'OS',
            key: 'os'
        },
        {
            label: 'OS Version',
            key: 'os_version'
        },

        {
            label: 'Monitor Size',
            key: 'monitor_size',
            onlyNumber: true
        },
        {
            label: 'Memory Slot',
            key: 'memory_slot'
        },
        {
            label: "Back Camera",
            key: 'back_camera',
            type: 'area'
        },
        {
            label: 'Front Camera',
            key: 'front_camera',
            type: 'area'
        },
        {
            label: 'Video Information',
            key: 'video_info',
            type: 'area'
        },
        {
            label: 'WLAN',
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
            label: 'Sensor',
            key: 'sensor',
            type: 'area'
        },
        {
            label: 'Battery',
            key: 'battery'
        }

    ]

    getListCPU() {
        let listCPU = [];
        for (let i = 2; i < 5; i = (i * 10 + 0.1 * 10) / 10) {
            listCPU.push({value: i});
        }
        return listCPU;
    }

    selects = [
        {
            label: 'CPU',
            key: 'cpu',
            list: this.getListCPU(),
            render: (item) => item.value + ' Ghz',
            default: {value: 2}
        },
        {
            label: 'Ram',
            key: 'ram',
            list: [...Array(10)].map((o, i) => ({value: i + 1})),
            render: (item) => item.value + ' G',
            default: {value: 1}
        }
    ]

    render() {
        const {draftState, onChange} = this.props;
        return (
            <div>
                <div className='row'>
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
                                                    value={draftState[o.key]}
                                                    onChange={(e) => onChange(o.key, e.target.value)}
                                                    placeholder={o.label}/>
                                            ) :
                                            o.type === 'select' ? (
                                                <Select2
                                                    classNames={['form-control']}
                                                    width={300}
                                                    type={o.key}
                                                    select={draftState[o.key] || o.default}
                                                    list={o.list}
                                                    render={o.render}
                                                    onChange={(item) => onChange(o.key, item)}

                                                />
                                            ) : (
                                                <input
                                                    type={o.onlyNumber ? 'number' : 'text'}
                                                    min={o.onlyNumber ? '0' : null}
                                                    className="form-control"
                                                    value={draftState[o.key]}
                                                    onChange={(e) => onChange(o.key, e.target.value)}
                                                    placeholder={o.label}/>
                                            )
                                    }

                                </div>
                            </div>
                        ))
                    }


                    {
                        this.selects.map((o, i) => (
                            <div key={i} className="col-md-6">
                                <div className='form-group'>
                                    <h5>{o.label}</h5>
                                    <Select2
                                        classNames={['form-control']}
                                        width={300}
                                        type={'ram'}
                                        select={draftState[o.key] || o.default}
                                        list={o.list}
                                        render={o.render}
                                        onChange={(item) => onChange(o.key, item)}
                                    />
                                </div>
                            </div>
                        ))
                    }


                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <h5>Description</h5>
                            <Editor
                                minHeight={400}
                                value={draftState.description}
                                onChange={(value) => onChange('description', value)}

                            />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <h5>Image 360</h5>
                        <div className="form-group">
                            <input
                                type={'text'}
                                className="form-control"
                                value={draftState.image360Path}
                                onChange={(value) => onChange('image360Path', value)}
                                placeholder='Image 360'/>
                        </div>
                    </div>


                    <div className="col-md-12">
                        <UploadImage
                            height={300}
                            classNames={['upload-product']}
                            filePath={draftState.images || []}
                            onChange={(paths) => {
                                onChange('images', draftState.images.concat(paths))
                            }}
                        />
                    </div>
                </div>

            </div>
        )
    }
}