import React from 'react';
import {ManageLayout} from "../component/manage-layout/manage-layout";
import {FeaturedProducts} from "../home-page/featured-products/featured-products";
import {productApi} from "../../api/product/product-api";
import {brands, brandsEnum, covertToQueryString} from "../commond";
export class BrandList  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products : []
        };
        this.urlParams = new URLSearchParams(window.location.search);
        this.brand = this.urlParams.get('brand');
        productApi.getFilterProducts({
            brand : this.urlParams.get('brand'),
            ram  : this.urlParams.get('ram'),
            sim : this.urlParams.get('sim'),
            from : this.urlParams.get('from'),
            to : this.urlParams.get('to')
        }).then(data =>{
            this.setState({ products : data})
        })
    }

    componentDidMount(){
        productApi.getProducts().then((data )=>{
        })
    }
    render() {
        const {products} =this.state;
        return(
            <ManageLayout>
                <div className='row brand-list'>
                    <div className="col-lg-2">
                        <FilterBar/>
                    </div>
                    <div className="col-lg-10">
                        {
                            products.length > 0 && (
                                <FeaturedProducts
                                    label={brandsEnum[products[0].brand]}
                                    products={products}
                                    onAddProduct={()=>{}}
                                />
                            )
                        }
                    </div>
                </div>
            </ManageLayout>
        )
    }
}


class FilterBar  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <div className='filter-bar'>
                <FilterTab
                    label='Hãng'
                    type='brand'
                    list={[ {label :'Tất cả' , key : 'all' , value :'all'}, ...brands]}
                    modifyParams={(key , item)=>{
                        let urlParams = new URLSearchParams(window.location.search);
                        urlParams.set(key,item.value);
                        console.log(urlParams.toString())
                        return '/mobile?'+urlParams.toString();
                    }}
                />
                <FilterTab
                    label='Ram'
                    type='ram'
                    list={[
                        {label :'Tất cả', value :'all'},
                        {label :'2 GB',value :'2'},
                        {label :'3 GB',value :'3'},
                        {label :'4 GB',value :'4'},
                        {label :'6 GB',value :'6'},
                        {label :'8 GB',value :'8'},
                    ]}
                    modifyParams={(key , item )=>{
                        let urlParams = new URLSearchParams(window.location.search);
                        urlParams.set(key,item.value);
                        return '/mobile?'+urlParams.toString();
                    }}
                />
                <FilterTab
                    label='Số Sim'
                    type='sim'
                    list={[
                        {label :'Tất cả', value :'all'},
                        {label :'1 Sim',value :1},
                        {label :'2 Sim',value :2},
                    ]}
                    modifyParams={(key , item)=>{
                        let urlParams = new URLSearchParams(window.location.search);
                        urlParams.set(key,item.value);
                        return '/mobile?'+urlParams.toString();
                    }}
                />

                <FilterTab
                    label='Giá'
                    type='price'
                    list={[
                        {label: '< 5 triệu' , from: 0 , to : 50000000},
                        {label: 'Từ 5 triệu đến 10 triệu' , from: 5000000 , to : 100000000},
                        {label: 'Từ 10 triệu đến 15 triệu' , from: 100000000 , to : 150000000},
                        {label: '> 15 triệu' , from: 150000000 },
                    ]}
                    modifyParams={(key, item ) =>{
                        let urlParams = new URLSearchParams(window.location.search);
                        urlParams.set('from',item.from);
                        if(item.to === undefined){
                            urlParams.delete('to')
                        }else{
                            urlParams.set('to',item.to);
                        }
                        return '/mobile?'+urlParams.toString();
                    }}
                />
            </div>
        )
    }
}


class FilterTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {label = 'AAA' ,  onClick , list , onChange ,type, modifyParams  } = this.props ;
        return(
            <div className='fil-tab'>
                {
                    label && (
                        <div className='fil-label'>
                            {label}
                        </div>
                    )
                }

                <div className='fil-content'>
                    {
                        list.map((o,i) =>(
                            <a key={i} href={modifyParams && modifyParams(type, o)}><div>{o.label}</div></a>
                        ))
                    }
                </div>
            </div>
        )
    }
}