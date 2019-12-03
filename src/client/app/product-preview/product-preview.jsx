import React, {Fragment} from 'react';
import {AppLayout, InfoBoxes} from "../component/app-layout/app-layout";
import {ManageLayout} from "../component/manage-layout/manage-layout";
import {productApi} from "../../api/product/product-api";
import Flickity from 'react-flickity-component'
import {addComparedDevice, formatter} from "../commond";
import {comparedDevicesState} from "../../../security/services/compared-devices-state";
import {FeaturedProducts} from "../home-page/featured-products/featured-products";
import {Editor} from "../add-product/editor/editor";
import {InformationPanel} from "./information-panel/information-panel";
import {DiscountInfo} from "./discount-info/discount-info";
import {modals} from "../common/modal/modals";
import {TrialModal} from "../trial-register/trial-modal/trial-modal";
import {trialRegisterApi} from "../../api/trial-register/trial-register";
import {cartState} from "../../../security/services/cart-state";
import {cartApi} from "../../api/cart/cart-api";
import {viewApi} from "../../api/view/view-api";

export class ProductPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            previewIndex: 0,
            samePrice: null,
            show360: false ,
            count : 0
        };

        productApi.getProductBySlug(props.match.params.slug).then(data => {
            this.setState({
                product: data.product
            })
            viewApi.getView(data.product._id ).then(data =>{
                this.setState({ view : data.view  })
            })
        })

        productApi.getSamePrice(props.match.params.slug).then(data => {
            this.setState({
                samePrice: data
            })
        })
    }

    onChangeImage(index) {
        console.log(index)
        this.setState({
            previewIndex: index,
            show360: false
        })
    }

    render() {
        const flickityOptions = {
            initialIndex: 2
        }

        const {product} = this.state;

        let Carousel = (images = null) => {
            return (
                <Flickity
                    className={'carousel'} // default ''
                    elementType={'div'} // default 'div'
                    options={flickityOptions} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    static // default false
                >
                    {
                        images && images.map((o, i) => (
                            <img
                                key={i}
                                onClick={() => this.onChangeImage(i)}
                                height={130} src={o.filePath} alt=""/>
                        ))
                    }
                    <div style={{height: '100%', 'justify-content': 'center'}} className='flex-column'>
                        <img
                            onClick={() => {
                                this.setState({show360: true})
                            }}
                            height={130} src={'/assets/img/360.png'} alt=""/>
                    </div>
                </Flickity>
            )
        }
        return (
            <ManageLayout
                {...this.props}
            >
                <div className='product-preview'>
                    <div className="row">
                        {product && (
                            <Fragment>
                                <div className='col-lg-4 preview-left'>
                                    <div className='main-preview'>
                                        {
                                            this.state.show360 ?
                                                <Image360
                                                    height={400}
                                                    width={400}
                                                /> :
                                                <img height={400} src={product.images[this.state.previewIndex].filePath}
                                                     alt=""/>
                                        }

                                    </div>
                                    {
                                        product && (
                                            Carousel(product.images)
                                        )
                                    }
                                </div>

                                <div className="col-lg-4 preview-mid">
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="price-box">{formatter.format(product.price)}</div>
                                    <div className="view-counting">
                                        <i className="fas fa-eye"></i>
                                        <span>Đã xem: {this.state.view } lần</span>
                                    </div>
                                    <div className="product-des">
                                        {/*{product.description}*/}
                                    </div>
                                    <DiscountInfo/>
                                    <CartAction
                                        product={product}
                                    />
                                    <button
                                        className='dungthu-btn'
                                        onClick={() => {
                                            let modalTrial = modals.openModal({
                                                content: <TrialModal
                                                    modalTitle={<Fragment>Đăng ký dùng thử sản phẩm <strong
                                                        style={{color: 'red'}}>"{product.name}"</strong></Fragment>}
                                                    onOke={(draft) => {
                                                        trialRegisterApi.saveTrial({product, ...draft}).then(({error, errors}) =>{
                                                            if(error){
                                                                alert('Vui lòng nhập đầy đủ thông tin !');
                                                            }else{
                                                                alert('Đăng ký dùng thử thành công !');
                                                                modalTrial.close()
                                                            }
                                                        })
                                                    }}
                                                    onClose={()=>{
                                                        modalTrial.close();
                                                    }}
                                                />
                                            })
                                        }}
                                    >
                                        Đăng Ký Dùng Thử
                                    </button>

                                    <button
                                        onClick={()=>{
                                            this.props.history.push('/checkout')
                                        }}
                                        className='thanhtoan-btn'>
                                        Thanh Toán
                                    </button>
                                </div>

                                <div className="col-lg-4 preview-right">
                                    <InformationPanel
                                        product={product}
                                    />
                                    {/*<InfoBoxes/>*/}
                                </div>

                            </Fragment>
                        )}

                    </div>
                    {
                        product && (
                            <div
                                className="row description-wrap">
                                <div
                                    className='col-lg-9 des-preview'
                                    dangerouslySetInnerHTML={{__html: product.description}}
                                />
                                <div className="col-lg-3 no-padding">
                                    {/*<InformationPanel*/}
                                    {/*    product={product}*/}
                                    {/*/>*/}
                                </div>
                            </div>
                        )
                    }

                    <div className="row same-price">
                        <FeaturedProducts
                            products={this.state.samePrice || []}
                            label='Sảm Phẩm Cùng Tầm Giá'
                        />
                    </div>

                </div>
            </ManageLayout>
        )
    }
}


class CartAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 1
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
        const {amount} = this.state
        const {product} = this.props;
        return (
            <div className='cart-action flex-row'>
                <div className="number-product flex-row">
                    <div
                        onClick={() => this.setState({amount: amount - 1})}
                        className='action minus'>
                        -
                    </div>
                    <div className='wrapper-number'>
                        <input className='number-amount' value={amount}
                               onChange={() => {
                                   this.setState({
                                       amount: amount + 1
                                   })
                               }}
                               type='text'/>
                    </div>


                    <div
                        onClick={() => this.setState({amount: amount + 1})}
                        className='action plus'>
                        +
                    </div>
                </div>

                <div
                    onClick={()=>{

                        let cart =  cartState.getState();

                        cartApi.submitCart( cart ? cart._id : null , product._id ,  1).then(data =>{
                            if(!cart){
                                localStorage.setItem('cartId',data._id);
                            }
                            console.log(data)
                            cartState.setState(data);
                        })
                    }}
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
        )
    }
}


export class Image360 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: 36,
            x: 0,
            y: 0,
            autoplay: true
        };
        this.playImage();

    }

    handleMouseMove(e) {
        const {pos, autoplay, x, y} = this.state;
        if (!autoplay) {
            let ran = e.clientX - x;
            if (Math.abs(ran) > 200) {
                let jump = Math.floor(ran / 200);
                if (jump > 0) {
                    this.setState({pos: this.convertPos(pos + jump)})
                } else {
                    this.setState({pos: this.convertPos(Math.abs(pos - jump), false)})
                }
            } else {

            }

        }
    }

    handleMouseDown(e) {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }

    convertPos(value, clockwise = true) {
        return clockwise ? value == 35 ? 1 : value % 36 : value == 0 ? 36 : value % 36;
    }

    playImage() {
        let sefl = this;
        this.updateImage = setInterval(() => {
            this.setState({autoplay: true, pos: sefl.convertPos(sefl.state.pos + 1)})
        }, 100)
    }

    stopImage() {
        this.setState({autoplay: false}, () => {
            clearInterval(this.updateImage);
        })
    }

    getIndexImage(index) {
        let src = `https://cdn.tgdd.vn/Products/Images/42/210653/Image360/iphone-11-pro-max-256gb-org-${index}.jpg`
        return src;
    }


    render() {
        const {pos, autoplay, x, y} = this.state;
        const {height = 200, width = 200} = this.props;
        return (
            <div

                // onMouseMove={(e) =>{
                //     this.handleMouseMove(e)
                // }}
                // onMouseDown={(e)=>{
                //     this.handleMouseDown(e);
                // }}
                style={{height: height, width: width}} className='image-360-wrap'>
                <img
                    onClick={() => {
                        if (autoplay) {
                            this.stopImage();
                        } else {
                            this.playImage();
                        }
                    }}
                    draggable="false"
                    height={height} src={this.getIndexImage(pos)} alt=""/>
            </div>
        )
    }
}