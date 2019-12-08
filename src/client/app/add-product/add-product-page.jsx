import React, {Fragment} from 'react';
import {ManageLayout} from "../component/manage-layout/manage-layout";
import {UploadImage} from "../component/upload-image/upload-image";
import {productApi} from "../../api/product/product-api";
import {Select2} from "../common/select/select2";
import {Editor} from "./editor/editor";
import {brands} from "../commond";
import {AdminLayout} from "../component/admin-layout/admin-layout";
import _ from 'lodash'
import {ProductFormData} from "./product-form-data/product-form-data";

export class AddProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            brand: '',
            description: "",
            image360Path: '',
            images: [],
            cpu: '', ram: '', cpu_name: '',
            weight: '',
            size: '',
            memory: '',
            sim: '',
            monitor: '',
            os: '',
            os_version: '',
            monitor_size: '',
            memory_slot: '',
            back_camera: '',
            front_camera: '',
            video_info: '',
            wlan: '',
            bluetooth: '',
            gps: '',
            nfc: '',
            sensor: '',
            battery: '',
            submitting: false,
            error: false
        };

    }


    canSubmit() {
        const {name, price, brand, description, images, cpu, ram, cpu_name} = this.state;
        // if(name == '' || price == '' || brand == '' || description=='' || images.length==0 || cpu== null || ram == null ||cpu_name.length == 0 ){
        //     return false;
        // }
        return true;
    }

    handleOnSubmit(e) {
        const {name, price, brand, description, images, ram, cpu, cpu_name} = this.state;
        this.setState({
            submitting: true
        })
        if (!this.canSubmit()) {
            return;
        } else {
            productApi.addProduct({
                ...this.state,
                brand: brand.type,
                ram: ram.value,
                cpu: cpu.value
            }).then(data => {
                console.log(data)
                if (data.error) {
                    alert("Something's wrong");
                } else {
                    alert("Completed !")
                    this.props.push(`/${data.product.slug}`)
                }
            })
        }
    }

    render() {
        const {submitting, images} = this.state;
        return (
            <AdminLayout>
                <div className='add-product-page'>
                    <h3>Add New Product</h3>
                    <ProductFormData
                        draftState={this.state}
                        onChange={(key, value) => this.setState({[key]: value})}
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


