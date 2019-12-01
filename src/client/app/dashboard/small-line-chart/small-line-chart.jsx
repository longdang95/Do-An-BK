import React from "react";

export class SmallLineChart extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };

    getCoordinates(values, width, height ) {
        // var min = Math.floor(Math.min.apply( null, values ) * 0.95)
        var min = Math.min(...values);
        // var max = Math.ceil(Math.max.apply( null, values ) * 1.05 )
        var max = Math.max(...values)
        var yRatio = ( max - min ) / height
        var xRatio = width / ( values.length - 2 )

        return values.map( function( value, i ) {
            var y = height - ( ( value - min ) / yRatio );
            var x = ( xRatio * i ) - ( xRatio / 2 )
            return [x,y]
        })
    }
    render(){
        const {data} =this.props ;
        // console.log(data && this.getCoordinates(data,130,60))
        if(!data) return null;
        return(
            <div className='small-line-chart'>
                <svg width="130" height="60">
                    <g id='huy'>
                        <polyline points={this.getCoordinates(data ,130,60).toString().split(",").join(' ')}></polyline>
                    </g>

                </svg>
            </div>
        );
    }
}