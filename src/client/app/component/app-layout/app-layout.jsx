import React from 'react';
import {AppHeader} from "./app-header/app-header";
import {AppFooter} from "./app-footer/app-footer";
import {cartState} from "../../../../security/services/cart-state";
import {comparedDevicesState} from "../../../../security/services/compared-devices-state";
import SimpleSlider from "./app-header/slide-image/slide-image";
import {brands, brandsEnum} from "../../commond";
import {bannerApi} from "../../../api/banner/banner-api";

export class AppLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFixedHeader: false
        };
    }

    componentDidMount() {
        // window.onscroll = function () {
        //     myFunction()
        // };
        //
        // let sticky = 150;
        // console.log(sticky)
        //
        // function myFunction() {
        //     if (window.pageYOffset > sticky) {
        //         $('header-fixed').addClass("show");
        //     } else {
        //         $('header-fixed').removeClass("show");
        //         $('header-fixed').addClass("hide");
        //         console.log('not shw')
        //     }
        // }
    }

    render() {
        let comparedDeives = comparedDevicesState.getState() ;
        const {showAds =true } =this.props;
        return (
            <div className='app-layout'>
                <AppHeader
                    {...this.props}
                />
                {showAds && <MidContent/>}
                {this.props.children}

                <AppFooter/>
            </div>
        )
    }
}


class MidContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banners : null
        };
        bannerApi.getActiveBanners().then(data =>{
            this.setState({ banners : data })
        })
    }

    render() {
        const {banners} =this.state;
        return(
            <div className='mid-area'>
                <div className="content flex-row">
                    <div className='top-cate flex-column'>
                        <h3>DANH MỤC</h3>
                        <div className='cate-list flex-column'>
                            {
                                brands.map((o,i)=>(
                                    <a key={i} className='none-underline' href={`/mobile?brand=${o.value}`}>
                                        <div  className='cate'>
                                            {o.icon} {o.value.toUpperCase()}
                                        </div>
                                    </a>

                                ))
                            }
                        </div>
                    </div>


                    <div className='slide-image'>
                        <SimpleSlider
                            images={banners}
                            renImage={(image,index)=>(
                                <a href={image.redirect_link}>
                                    <img
                                        key={index}  style={{width : '100%' , margin: "0 auto"}} src={image.filePath} alt=""/>
                                </a>
                            )}
                            settings={{
                                infinite: true,
                                adaptiveHeight: true,
                                autoplay: true,
                                autoplaySpeed: 1000,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                arrows:false
                            }}
                        />
                    </div>
                </div>

                <InfoBoxes/>
            </div>
        )
    }
}

export class InfoBoxes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <div className='info-boxes'>
                <div className="main-container flex-row">
                    <div className="info-box">
                        <i className="fas fa-shipping-fast"></i>
                        <div className="info-box-content">
                            <h4>MIỄN PHÍ VẬN CHUYỂN</h4>
                            <p>Miễn phí vận chuyển cho tất cả đơn hàng trị giá hơn 500,000</p>
                        </div>
                    </div>
                    <div className="info-box">
                        <i className="fas fa-dollar-sign"></i>
                        <div className="info-box-content">
                            <h4>HOÀN TIỀN 100%</h4>
                            <p>Nếu xảy ra bất kì lỗi của nhà sản xuất trong 1 tuần đầu tiên sử dụng sản phẩm.</p>
                        </div>
                    </div>
                    <div className="info-box">
                        <i className="fas fa-hourglass-start"></i>
                        <div className="info-box-content">
                            <h4>HOTLINE 24/7</h4>
                            <p>Liên hệ hotline của chúng tôi bất khi nào quý khách cần sự trợ giúp.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}