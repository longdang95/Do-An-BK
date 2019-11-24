import React from 'react';

export class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {checked = false, labels, onChange } = this.props;
        return (
            <div className='check-box-inline'>
                <input
                    className='cbox'
                    checked={checked}
                    onChange={()=> onChange()}
                    type="checkbox"/>

                {
                    labels && (
                        <span>
                            {checked ? labels[0] : labels[1]}
                         </span>
                    )
                }

            </div>
        )
    }
}