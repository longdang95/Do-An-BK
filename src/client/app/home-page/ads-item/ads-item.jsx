import React from 'react';
export class  AdsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let imageUrl= (index) => `/assets/img/ads/ads-${index}.png`
        return(
            <div className='ads-item'>
                <div className="main-container">
                    <div className='images-left'>
                        {
                            [...Array(3)].map((o,i) =>(
                                <div key={i} className='banner-image'>
                                    <a href="#">
                                        <img src={imageUrl(i+1)} alt=""/>
                                    </a>
                                </div>

                            ))
                        }
                    </div>

                    <div className="images-center">
                        {
                            [...Array(3)].map((o,i) =>(
                                <div key={i} className='banner-image'>
                                    <a href="#">
                                        <img src={imageUrl(i+4)} alt=""/>
                                    </a>
                                </div>
                            ))
                        }
                    </div>

                    <div className='images-right'>
                        {
                            [...Array(3)].map((o,i) =>(
                                <div key={i} className='banner-image'>
                                    <a href="#">
                                        <img src={imageUrl(i+7)} alt=""/>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}