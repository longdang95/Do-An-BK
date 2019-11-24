import React from 'react';
export class Flickity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount(){
        $('.main-carousel').flickity({
            // options
            cellAlign: 'left',
            contain: true
        });
    }
    render() {
        const {images} =this.props;
        return(
            <div className="main-carousel">
                {/*{*/}
                {/*    images.length > 0 && images.map((o,i) =>{*/}
                {/*        return(*/}
                {/*            <div key={i} className="carousel-cell"></div>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
                <div className="carousel-cell"></div>
                <div className="carousel-cell"></div>
                <div className="carousel-cell"></div>
                <div className="carousel-cell"></div>
                <div className="carousel-cell"></div>
                <div className="carousel-cell"></div>
                <div className="carousel-cell"></div>
                <div className="carousel-cell"></div>
                <div className="carousel-cell"></div>
                <div className="carousel-cell"></div>
                <div className="carousel-cell"></div>
            </div>

        )
    }
}