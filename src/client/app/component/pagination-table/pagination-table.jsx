import React from "react";
import {Pagination} from "./pagination/pagination";
export class PaginationTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            page :1
        };
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.list && nextProps.list.length !=  this.props.list.length){
            this.setState({
                page : 1
            })
        }
    }
    render(){
        const {colums,list, redirect =null,perPage=10} =this.props;
        const {page} =this.state;
        return(
            <div className="pagination-table-cover">
                <table>
                    <thead>
                        <tr>
                            {colums && colums.map((o,i)=>{
                               return(
                                   <td
                                       className={o.classNames}
                                       style={{width : o.width && o.width}}
                                       key={i}>
                                       {
                                           o.renderHeader && o.renderHeader()
                                       }
                                       {
                                           o.label &&  <div className="cell">{o.label}</div>
                                       }
                                   </td>
                               )

                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list && colums && list.slice( (page-1)*perPage, page*perPage ).map((o,i) =>{
                                return(
                                    <tr
                                        // onClick={()=>redHoirect && redirect(o.build_name)}
                                        key={i}>
                                            {
                                                colums.map((u,j) => <td
                                                    className={u.classNames}
                                                    key={i+""+j}>
                                                    {
                                                        // j==0 ? <div className="cell">{i+1}</div>: (
                                                            u.renderCell && u.renderCell(o)
                                                        // )
                                                    }
                                                </td>)
                                            }
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>
                {
                    list && list.length==0 ? (<div style={{"textAlign" :"left"}}>No result</div>) :
                        <Pagination
                            total={list.length}
                            pageNum={this.state.page}
                            perPage={perPage}
                            onChangePage={(page)=> this.setState({page: page})}
                        />
                }

            </div>
        );
    }
}