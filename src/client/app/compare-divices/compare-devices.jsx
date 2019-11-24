import React, {Fragment} from 'react';
import {ManageLayout} from "../component/manage-layout/manage-layout";
import {productApi} from "../../api/product/product-api";
import {SearchDevice} from "./search-device/search-device";
import {formatter, getParameterByName} from "../commond";
import {Link} from "react-router-dom";
export class CompareDevices  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value1:'',
            selected1 : null
        };
    }

    render() {
        return(
            <ManageLayout>
                <div className='compare-devices'>
                    <DeviceInfoTable
                        {...this.props}
                    />
                </div>
            </ManageLayout>
        )
    }
}

class DeviceInfoTable  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products : null,
            keys  : [
                getParameterByName('id1',props.location.search),
                getParameterByName('id2',props.location.search),
                getParameterByName('id3',props.location.search),
            ]
        };
        productApi.getProducts().then(data => {
            this.setState({
                products : data.list,
                selectedDevices:[
                    data.list.find(o => o.slug == this.state.keys[0]),
                    data.list.find(o => o.slug == this.state.keys[1]),
                    data.list.find(o => o.slug == this.state.keys[2]),
                ]
            })
        })
    }

    getDevice(key, list){
        let slug = getParameterByName(key ,props.location.search);
            return list.find((o) => o.slug == slug);
    }
    rows=[
        {
            label :'Properties'
        },
        {
            label : 'Name',
            key :'name',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['name'] }
                    </div>
                </div>
            )
        },
        {
            label : 'Ram',
            key: 'ram',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['ram'] + ' G' }
                    </div>
                </div>
            )
        },
        {
            label : 'CPU Name' ,
            key :'cpu_name',
            render : (item , index ) =>(
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['cpu_name'] }
                    </div>
                </div>
            )
        },
        {
            label : 'CPU',
            key : 'cpu',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['cpu'] + ' Ghz' }
                    </div>
                </div>
            )
        },
        {
            label : 'Price',
            key : 'price',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && formatter.format(item['price'] )}
                    </div>
                </div>
            )
        },
        {
            label: 'Brand Name',
            key: 'brand',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['brand'] }
                    </div>
                </div>
            )
        },
        {
            label: 'CPU Name',
            key: 'cpu_name',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['cpu_name'] }
                    </div>
                </div>
            )
        },
        {
            label: 'Weight',
            key: 'weight',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['weight'] }
                    </div>
                </div>
            )
        },
        {
            label: 'Memory',
            key: 'memory',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['memory'] }
                    </div>
                </div>
            )
        },
        {
            label: 'sim',
            key: 'sim',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['sim'] }
                    </div>
                </div>
            )
        },
        {
            label: 'Monitor',
            key: 'monitor',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['monitor'] }
                    </div>
                </div>
            )
        },
        {
            label: 'Resolution',
            key: 'resolution',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['resolution'] }
                    </div>
                </div>
            )
        },
        {
            label: 'OS',
            key: 'os',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['os'] }
                    </div>
                </div>
            )
        },
        {
            label: 'OS Version',
            key: 'os_version',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['os_version'] }
                    </div>
                </div>
            )
        },

        {
            label: 'Monitor Size',
            key: 'monitor_size',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['monitor_size'] }
                    </div>
                </div>
            )
        },
        {
            label: 'Memory Slot',
            key: 'memory_slot',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['memory_slot'] }
                    </div>
                </div>
            )
        },
        {
            label: "Back Camera",
            key: 'back_camera',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['back_camera'] }
                    </div>
                </div>
            )
        },
        {
            label: 'Front Camera',
            key: 'front_camera',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['front_camera'] }
                    </div>
                </div>
            )
        },
        {
            label: 'Video Information',
            key: 'video_info',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['video_info'] }
                    </div>
                </div>
            )
        },
        {
            label: 'WLAN',
            key: 'wlan',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['wlan'] }
                    </div>
                </div>
            )
        },
        {
            label: 'Bluetooth',
            key: 'bluetooth',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['bluetooth'] }
                    </div>
                </div>
            )
        },
        {
            label: 'GPS',
            key: 'gps',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['gps'] }
                    </div>
                </div>
            )
        },
        {
            label: 'NFC',
            key: 'nfc',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['nfc'] }
                    </div>
                </div>
            )
        },
        {
            label: 'Sensor',
            key: 'sensor',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['sensor'] }
                    </div>
                </div>
            )
        },
        {
            label: 'Battery',
            key: 'battery',
            render : (item ,index ) => (
                <div key={index} className='brick'>
                    <div className="content">
                        { item && item['battery'] }
                    </div>
                </div>
            )
        },
        {
            label :'Preview Page',
            key:'slug',
            render : (item ,index )=>  (
                <div key={index} className='brick'>
                    <div className="content">
                        {
                            item && <Link
                                to={ item ?`/preview/${item['slug']}` :'#'}
                            >Read more</Link>
                        }

                    </div>
                </div>
            )
        }
    ]
    render() {
        const {products , selectedDevices } = this.state;
        return(
            <div className='device-info-table'>
                <div className='row'>
                    <div className="col-lg-3">
                        <div className='brick-column properties'>
                            {
                                [...Array(this.rows.length)].map((o,i) =>{
                                    return(
                                        <div key={i} className='brick'>
                                            <div className="content">
                                                {this.rows[i].label}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {
                        products && [...Array(3)].map((o,i) =>(
                            <div key={i} className="col-lg-3">
                                <div className='brick-column device'>
                                    <DevicePicker
                                        {...this.props}
                                        {...this.state}
                                        rows={this.rows}
                                        onClear={()=> this.setState({

                                        })}
                                        selected={selectedDevices[i]}
                                        onSelect={(sel) =>{
                                            let newSel =[...selectedDevices] ;
                                            newSel[i] = sel;
                                            this.setState({
                                                selectedDevices: newSel
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        )
    }
}


class DevicePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : '',
        };
    }

    render() {
        const {products, rows, selected , onSelect,onClear } =this.props ;
        const { value } = this.state;
        return(
            <Fragment>
                <div className="brick">
                    <SearchDevice
                        value={ value}
                        onChange={(val) => this.setState({ value : val})}
                        list={products|| []}
                        selectItem={ selected }
                        onSelect={onSelect}
                        onClear={()=> onClear()}
                        renderResult={(item)=> (
                            <div onClick={()=> onSelect(item)} className='content-rs flex-row'>
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
                </div>

                {
                    rows.map((o ,i) => {
                        if( i== 0 ) return ;
                        return(
                            o.render(selected, i)
                        )
                    })
                }
            </Fragment>
        )
    }
}