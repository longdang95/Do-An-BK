import React from 'react';
import {ManageLayout} from "../component/manage-layout/manage-layout";
import {UploadImage} from "../component/upload-image/upload-image";
import {productApi} from "../../api/product/product-api";
import {Select2} from "../common/select/select2";
import {Editor} from "./editor/editor";
import {brands} from "../commond";
import {AdminLayout} from "../component/admin-layout/admin-layout";
export class AddProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            brand: '',
            description: "",
            image360Path:'',
            images: [],
            cpu:'', ram :'', cpu_name:'',
            weight : '',
            size : '',
            memory : '' ,
            sim : '' ,
            monitor : '',
            os : '',
            os_version  : '',
            monitor_size : '' ,
            memory_slot : '' ,
            back_camera : '',
            front_camera : '',
            video_info : '',
            wlan : '',
            bluetooth : '',
            gps :'',
            nfc : '',
            sensor : '',
            battery  : '',
            submitting: false,
            error: false
        };

    }


    canSubmit(){
        const {name, price, brand, description, images , cpu, ram , cpu_name } = this.state;
        // if(name == '' || price == '' || brand == '' || description=='' || images.length==0 || cpu== null || ram == null ||cpu_name.length == 0 ){
        //     return false;
        // }
        return  true ;
    }
    handleOnSubmit(e) {
        const {name, price, brand, description, images , ram, cpu , cpu_name} = this.state;
        this.setState({
            submitting:  true
        })
        if(!this.canSubmit()){
            return ;
        }else{
            productApi.addProduct({
                ...this.state,
                brand: brand.type ,
                ram : ram.value ,
                cpu : cpu.value
            }).then(data =>{
                console.log(data)
                if(data.error){
                    alert("Something's wrong") ;
                }else{
                    alert("Completed !")
                    this.props.push(`/${data.product.slug}`)
                }
            })
        }
    }
    inputs=[
        {
            label : 'Product Name',
            key:'name'
        },
        {
            label : 'Price',
            key: 'price',
            onlyNumber : true
        },
        {
            label : 'Brand Name',
            key: 'brand',
            list: brands,
            render : (item) =>  item.value.toUpperCase() ,
            default : {value : 'apple' },
            type: 'select'
        },
        {
            label : 'CPU Name',
            key : 'cpu_name'
        },
        {
            label : 'Weight',
            key : 'weight'
        },
        {
            label : 'Memory',
            key : 'memory',
            onlyNumber : true
        },
        {
            label : 'sim',
            key : 'sim',
            onlyNumber :true
        },
        {
            label :'Monitor',
            key : 'monitor'
        },
        {
            label : 'Resolution',
            key : 'resolution'
        },
        {
            label : 'OS',
            key : 'os'
        },
        {
            label : 'OS Version',
            key : 'os_version'
        },

        {
            label : 'Monitor Size',
            key : 'monitor_size',
            onlyNumber :true
        },
        {
            label : 'Memory Slot',
            key :'memory_slot'
        },
        {
            label :  "Back Camera",
            key : 'back_camera',
            type :'area'
        },
        {
            label  :'Front Camera',
            key : 'front_camera',
            type :'area'
        },
        {
            label : 'Video Information',
            key :'video_info',
            type :'area'
        },
        {
            label : 'WLAN',
            key : 'wlan'
        },
        {
            label : 'Bluetooth',
            key : 'bluetooth'
        },
        {
            label : 'GPS',
            key : 'gps'
        },
        {
            label : 'NFC',
            key : 'nfc'
        },
        {
            label : 'Sensor',
            key : 'sensor',
            type :'area'
        },
        {
            label : 'Battery',
            key : 'battery'
        }

    ]

    getListCPU(){
        let listCPU = [];
        for(let i= 2 ; i< 5 ; i= (i*10 + 0.1*10)/10 ){
            listCPU.push({value : i});
        }
        return listCPU;
    }
    handleChange(value) {
        console.log(value)
        this.setState({ description: value })
    }

    selects=[
        {
            label:  'CPU',
            key: 'cpu',
            list: this.getListCPU(),
            render : (item) =>  item.value + ' Ghz',
            default : {value :2 }
        },
        {
            label : 'Ram',
            key :'ram',
            list :[...Array(10)].map((o,i) => ({value : i+1})),
            render : (item) =>  item.value + ' G',
            default : {value :1 }
        }
    ]
    render() {
        const {submitting ,images} = this.state;
        console.log(this.state)
        return (
            <AdminLayout>
                <div className='add-product-page'>
                    <h3>Add New Product</h3>
                    <div>
                        <div className="row">

                            {
                                this.inputs.map((o,i) => (
                                    <div key={i} className="col-md-12">
                                        <h5>{o.label }
                                            <span
                                            style={{color :'red', 'font-size': '12px'}}>{o.onlyNumber ? " (only number)":""}</span></h5>
                                        <div className="form-group">
                                            {
                                                o.type ==='area' ? (
                                                        <textarea
                                                            className="form-control description"
                                                            value={this.state[o.key]}
                                                            onChange={(e) => this.setState({[o.key]: e.target.value})}
                                                            placeholder={o.label}/>
                                                    ) :
                                                    o.type === 'select'? (
                                                        <Select2
                                                            classNames={['form-control']}
                                                            width={300}
                                                            type={o.key}
                                                            select={ this.state[o.key] ||  o.default }
                                                            list={o.list}
                                                            render={o.render}
                                                            onChange={(item) =>{
                                                                this.setState({
                                                                    [o.key] : item
                                                                })
                                                            }}
                                                        />
                                                    ) : (
                                                        <input
                                                            type={o.onlyNumber? 'number' :'text'}
                                                            min={o.onlyNumber ? '0':null}
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
                            <div className="col-md-12">
                                <div className="row">
                                    {
                                        this.selects.map((o,i) => (
                                            <div key={i} className="col-md-6">
                                                <div className='form-group'>
                                                    <h5>{o.label}</h5>
                                                    <Select2
                                                        classNames={['form-control']}
                                                        width={300}
                                                        type={'ram'}
                                                        select={ this.state[o.key] ||  o.default }
                                                        list={o.list}
                                                        render={o.render}
                                                        onChange={(item) =>{
                                                            this.setState({
                                                                [o.key] : item
                                                            })
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <h5>Description</h5>
                                    <Editor
                                        minHeight={400}
                                        value={this.state.description}
                                        onChange={(val) => {
                                            console.log(val)
                                            this.handleChange(val)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h5>Image 360</h5>
                            <div className="form-group">
                                <input
                                    type={'text'}
                                    className="form-control"
                                    value={this.state.image360Path}
                                    onChange={(e) => this.setState({image360Path: e.target.value})}
                                    placeholder='Image 360'/>
                            </div>
                        </div>
                    </div>
                    <UploadImage
                        height={300}
                        classNames={['upload-product']}
                        filePath={this.state.images}
                        onChange={(paths)=>{
                            this.setState({
                                images : this.state.images.concat(paths)
                            })
                        }}
                    />

                    <button
                        // disabled={!this.canSubmit()}
                        onClick={(e) => this.handleOnSubmit(e)}
                        className="btn btn-primary"
                    >
                        Add Product
                    </button>
                </div>
            </AdminLayout>
        )
    }
}