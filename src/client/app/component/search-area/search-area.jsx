import React from "react";

export class SearchArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            display: false
        }
    }
    filterBySearch(list ,val){
        return  list.filter((o,index) => o.name.toLowerCase().includes(val.toLowerCase()) || o.symbol.toLowerCase().includes(val.toLowerCase()) )
    }
    handleClear(){
        this.setState({value : ''})
    }

    render() {
        const {display, value} = this.state;
        const {renItem=null, list=null} = this.props;
        return (
            <div className='search-area'>
                <input type="text"
                       value={this.state.value}
                       onChange={(e) => {
                           this.setState({value: e.target.value})
                       }}
                       // onFocus={() => this.setState({display: true})}
                       // onBlur={() => this.setState({display: false})}
                       className='input-search'/>

                {
                    value.length >0 &&  <i
                        onClick={()=> this.handleClear()}
                        className='fas fa-times'></i>
                }
                <i className="fas fa-search"></i>

                {
                    value.length>0 && (
                        <div className='dropdown-content'>
                            {
                                list && this.filterBySearch(list,value).map((o,i) =>{
                                    return renItem(o,i)
                                })
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}