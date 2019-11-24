import React from 'react';

export class SearchDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {selectItem = null, value = '', onSelect, list = [], renderResult, renderSelected, onChange} = this.props;
        let filterFunc = (obj, val) => obj.name.toLowerCase().includes(val.toLowerCase());
        if (selectItem) return (
            <div className='pre-selected'>
                <img src={selectItem.images[0].filePath} height={80} alt=""/>
                <h4>{selectItem.name}</h4>
                <i
                    onClick={()=> onSelect(null)}
                    className="fas fa-times"></i>
            </div>
        )
        let filterList = list.filter(o => filterFunc(o, value))  || []
        return (
            <div className='search-device-wrapper'>
                <div className='search-input'>
                    <input
                        placeholder='Add Device'
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        type="text"/>
                    <i className="fas fa-search"></i>
                </div>
                {
                    value.length > 1 && list && filterList.length > 0 && (
                        <div className='dropdown-results'>
                            {
                                filterList.map((u, i) =>
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