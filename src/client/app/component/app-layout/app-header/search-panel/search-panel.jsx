import React from 'react';
export class SearchPanel  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:''
        };
    }
    render() {
        const {list ,renderResult} =this.props;
        const {value} = this.state;
        let filterFunc = (obj, val) => obj.name.toLowerCase().includes(val.toLowerCase());
        let filterList = list.filter(o => filterFunc(o, value))  || []

        return(
            <div className='search-panel'>
                <input
                    value={value}

                    onChange={(e) => this.setState({ value : e.target.value})}

                    type="text"/>
                <i className="fas fa-search"></i>
                {
                    value.length > 0 && (
                        <i
                            onClick={()=> this.setState({value : ''})}
                            className="fas fa-times"></i>
                    )
                }

                {
                    value.length > 1 && list && filterList.length > 0 && (
                        <div className='dropdown-results'>
                            {
                                list.map((u, i) =>
                                    (
                                        <div key={i} className='result-item'>
                                            {renderResult(u)}
                                        </div>
                                    ))
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}