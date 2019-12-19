import React from 'react';
import classnames from 'classnames';

export class RattingStar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current : 0,
            rate:props.rate ||1
        };
    }

    handleClick(value){
        // this.props.onClick(value) ;
        this.setState({ rate : value })
    }

    render() {
        const {current , rate = 3}  = this.state ;
        return(
            <div className='ratting-star'>
                <h3>Đánh giá:</h3>
                {
                    [...Array(5)].map((o,i) =>(
                        <i
                            onMouseEnter={()=> this.setState({current : i+1})}
                            onMouseLeave={()=> this.setState({current : 0})}
                            onClick={()=> this.handleClick(i+1)}
                            key={i} className={classnames("fas fa-star", (rate >= i+1 || current >= i+1 )  && "active" )}></i>                    ))
                }
            </div>
        )
    }
}