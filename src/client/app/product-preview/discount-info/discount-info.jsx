import React, {Fragment} from 'react';
export class DiscountInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { discounts } =this.props ;
        let dcs =[
            {
                label :'Trả góp 0%:',
                description : 'Trả góp lãi suất 0% với Home Credit. Trả trước 50%, kỳ hạn 8 tháng. Giảm thêm 500.000đ (Áp dụng trên GIÁ NIÊM YẾT, không áp dụng cùng các khuyến mại khác)'
            },
            {
                label: 'Chương trình khuyến mại:',
                description: 'Thu cũ đổi mới iPhone 11 | Pro | Pro Max - Giá thu tốt nhất thị trường'
            }
        ]
        return(
            <div className='discount-info'>
                <span className='dc-title'>
                    <i className="fas fa-gift"></i>
                    Khuyến Mãi
                </span>
                <ul className='dc-list'>
                    {
                        dcs.map((o,i) =>(
                            <Fragment>
                                <h3>{o.label}</h3>
                                <li className='dc-item'>
                                    {o.description}
                                </li>
                            </Fragment>
                        ))
                    }
                </ul>

            </div>
        )
    }
}