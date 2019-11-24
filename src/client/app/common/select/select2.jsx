import React, {Fragment} from "react";
import {BaseComponent} from "../base-comp";
import classnames from 'classnames'
export class Select2 extends BaseComponent{
    constructor(props){
        super(props);
        this.state={
            displayDropDown: false,
            filterKey:"",
        };
    };
    componentWillMount(){
        document.addEventListener('mousedown',this.handleClick,false) ;
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown',this.handleClick,false) ;
    }

    handleClick=(e)=>{
        if(this.node.contains(e.target)){
            return ;
        }
        this.setState({
            displayDropDown: false
        })
    }
    handleOnClickItem(item){
        const {onChange,} =this.props ;
        onChange(item) ;
        this.setState({
            displayDropDown : false
        })
    }
    displayDropDownContent=(list,render)=>{
        if(list.length <11){
            var height = list.length*40 ;
        }
        return(
            <div
                className="content-wrapper" style={{height : height }} >
                <div className="content" >
                    {list &&  list.map((o,index) =>{
                        return(
                            <div
                                className="item"
                                key={index}
                                onClick={()=> this.handleOnClickItem(o)}
                            >
                                <span className='content'>{render(list[index])}</span>
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }
    render(){
        const {displayDropDown} =this.state;
        const {select ,render , label , list ,disabled, width='300'} =this.props
        return(
            <div
                ref={node =>this.node =node}
                style={{width : width}}
                className="select-form2">
                {
                    label && (
                        <div className='label'>
                            {label}
                        </div>
                    )
                }
                <div
                    className={`display ${disabled ? "disabled":""} form-control`}
                    onClick={()=>this.setState({displayDropDown : !this.state.displayDropDown})}>
                    <div className='content-selected'>
                        {
                            render(select)
                        }
                    </div>
                    <i className="fas fa-sort-down"></i>
                </div>
                {
                    displayDropDown && this.displayDropDownContent( list,render )
                }
            </div>
        );
    }
}