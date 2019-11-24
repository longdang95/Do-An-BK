import React from 'react';

export class AppFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let paymentImage = 'https://portotheme.com/html/porto_ecommerce/demo_4/assets/images/payments.png';
        return (
            <div className='app-footer'>
                <div className="footer-middle">
                    <div className='main-container'>
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="widget">
                                    <h4 className="widget-title">Liên hệ</h4>
                                    <ul className="contact-info">
                                        <li>
                                            <span className="contact-info-label"><i className="fas fa-home"></i> Địa chỉ:</span>123 Hoan Kiem, Ha Noi
                                        </li>
                                        <li>
                                            <span className="contact-info-label"><i className="fas fa-phone"></i> SĐT:</span> Hotline: <a href="tel:">(123)
                                            456-7890</a>
                                        </li>
                                        <li>
                                            <span className="contact-info-label"><i className="fas fa-envelope"></i> Email:</span> <a
                                            href="mailto:mail@example.com">do-an.mail@gmail.com</a>
                                        </li>
                                        <li>
                                            <span className="contact-info-label"><i className="far fa-clock"></i> Giờ làm việc:</span>
                                            9:00 - 22:00 Tất cả các ngày trong tuần
                                        </li>
                                    </ul>
                                    <div className="social-icons">
                                        <a href="#" className="social-icon" target="_blank">
                                            <i className="fab fa-facebook-f"/>
                                        </a>
                                        <a href="#" className="social-icon" target="_blank">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a href="#" className="social-icon" target="_blank">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="widget">
                                    <h4 className="widget-title">Thông Tin</h4>
                                    <ul className="more-info">
                                        <li>Chính sách Bảo hành</li>
                                        <li>Chính sách sử dụng</li>
                                        <li>Chính sách bảo mật</li>
                                        <li>Liên hệ hợp tác kinh doanh</li>
                                        <li>Bán hàng doanh nghiệp</li>
                                        <li>Ưu đãi từ đối tác</li>
                                        <li>Tuyển dụng</li>
                                        <li>Bản tin công nghệ</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="widget">
                                    <h4 className="widget-title">Thông Tin</h4>
                                    <ul className="more-info">
                                        <li>Gọi mua hàng: <b>1800.2097</b> (8h00 - 22h00)</li>
                                        <li>Gọi khiếu nại: <b>1800.2063</b> (8h00 - 21h00)</li>
                                        <li>Gọi bảo hành: <b>1800.2064</b> (8h00 - 21h00)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="widget">
                                    <h4 className="widget-title">Phương Thức Thanh Toán</h4>
                                    <img src="assets/img/thanh-toan.png" height="75px" width="250px"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main-container footer-bottom">
                        <p className="footer-copyright">Đồ Án Tốt Nghiệp - Đặng Văn Long © 2019. All Rights Reserved</p>

                        <img src={paymentImage} alt="payment methods" className="footer-payments"/>
                    </div>
                </div>

            </div>
        )
    }
}