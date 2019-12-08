import React, {Fragment} from 'react';
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {productApi} from "../../api/product/product-api";
import {brands, brandsEnum} from "../commond";
import {ProductFormData} from "../add-product/product-form-data/product-form-data";
import {Button, Spin} from "antd";

export class EditProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            loading: true,
            submitting: false
        };

        this.prdId = props.match.params.id;
        productApi.getProductById(this.prdId).then(({product}) => {
            this.setState({product: {...product, ram: {value: product.ram}, cpu: {value: product.cpu}}, loading: false})
        })
    }


    onUpdateProduct(key, val) {
        const {product} = this.state;
        let newProd = product;
        newProd[key] = val;
        return newProd;
    }

    modifyDraft(raw) {
        console.log(raw)
        let draft = {...raw, brand: brands.find(o => o.type === raw.brand.type)}
        return draft;
    }

    handleSave() {
        const {product} = this.state;
        this.setState({
            submitting: true
        })

        productApi.editProduct({
            ...product,
            brand: product.brand.type,
            ram: product.ram.value,
            cpu: product.cpu.value
        }).then(data => {
            console.log(data)
            if (data.error) {
                alert("Something's wrong");
            } else {
                alert("Completed !")
            }
        })
    }

    render() {
        const {product} = this.state;
        return (
            <AdminLayout
                {...this.props}
            >
                <div className='edit-product-page'>
                    <h3>Chỉnh sửa sản phẩm: </h3>
                    {!product ? (
                        <div className='row justify-content-center'><Spin size="large"/></div>
                        ):
                        (
                            <Fragment>
                                <ProductFormData
                                    draftState={this.modifyDraft(this.state.product)}
                                    onChange={(key, val) => this.setState({product: this.onUpdateProduct(key, val)})}
                                />


                                <div className="row action">
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={() => this.handleSave()}
                                    >
                                        Cập nhật
                                    </Button>
                                </div>
                            </Fragment>
                        )
                    }
                </div>
            </AdminLayout>
        )
    }
}