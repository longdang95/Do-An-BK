import React from 'react';
import {productApi} from "../../../api/product/product-api";
import {addComparedDevice, formatter} from "../../commond";
import {comparedDevicesState} from "../../../../security/services/compared-devices-state";
import $ from 'jquery'
import {Link} from "react-router-dom";
import SimpleSlider from "../../component/app-layout/app-header/slide-image/slide-image";

export class FeaturedProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};


    }


    render() {
        const {label, products , onAddProduct } = this.props;
        return (
            <div className='featured-products'>
                <div className="main-container">
                    {
                        label && (
                            <h2>{label}</h2>
                        )
                    }

                </div>

                {
                    products.length < 1 ? <div>None Products</div> :

                        (<div className="main-container flex-row">

                            <div className="row">
                                {
                                    products && products.map((o, i) => (
                                        <div
                                            key={i}
                                            className="col-lg-3">
                                            <Product
                                                product={o}
                                                onAddProduct={onAddProduct}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>)
                }

            </div>
        )
    }
}

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    addToCompareList(product) {
        let comparedDevices = comparedDevicesState.getState() || [];
        if (comparedDevices.length >= 3) {
            alert('Just pick 2 devices !')
        } else {
            comparedDevicesState.setState([...comparedDevices, product])
            addComparedDevice([...comparedDevices, product])
        }
    }

    render() {
        let {product , onAddProduct } = this.props;
        return (
            <div
                className='product'>
                <div className="product-image-container">
                    <SimpleSlider
                        images={product.images}
                        renImage={(image,index)=>(
                            <div className='image-cover'>
                                <a href={`/preview/${product.slug}`}>
                                    <img key={index}  style={{width : '100%' , margin: "0 auto"}} src={image.filePath} alt=""/>
                                </a>
                            </div>

                        )}
                        settings={{
                            infinite: true,
                            adaptiveHeight: true,
                            autoplay: true,
                            fade : true ,
                            autoplaySpeed: 5000,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows:false
                        }}
                    />
                    {/*<a href={`/preview/${product.slug}`}>*/}
                    {/*    <img width={'100%'} src={product.images[0].filePath} alt=""/>*/}
                    {/*</a>*/}
                </div>
                <div className="product-details">
                    <h3 className='product-title'>
                        <a href={`/preview/${product.slug}`}>{product.name}</a>
                    </h3>
                    <div className="price-box">
                        <span className="product-price">{formatter.format(product.price)}</span>
                    </div>
                    <div
                        onClick={() => onAddProduct(product)}
                        className="product-action">
                        <i className='fas fa-shopping-bag'></i>
                        ADD TO CART
                    </div>

                    <div className="compare-act">
                        <i
                            onClick={() => this.addToCompareList(product)}
                            className="fas fa-plus-circle"></i>
                    </div>

                </div>


            </div>
        )
    }
}