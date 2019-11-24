import React, {Component, Fragment} from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
    render() {
        // const settings = ;
        let {images  , renImage , settings } = this.props;
        return (
            <Fragment>
                <Slider {...settings}>
                    {
                        images && images.map((o, i) => renImage(o,i))
                    }
                </Slider>
            </Fragment>
        );
    }
}