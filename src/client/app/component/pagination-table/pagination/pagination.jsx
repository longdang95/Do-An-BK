import React from "react";
import classnames from "classnames";
export class Pagination extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    numPerPage(){
        return 10;
    }
    render(){
        const {ranger,total, pageNum, onChangePage ,perPage} = this.props;
        var totalPage= Math.ceil(total/perPage) ;
        return(
            <div className="footer-pg"
                 // style={{top : ranger}}
            >
                <div className="sumary">
                    <span>{total && ((pageNum-1)*this.numPerPage() +1) +" to "+ (total<perPage * pageNum ? total: pageNum*perPage ) +" of "+ total +" records shown" }</span>
                </div>

                <div className="pagination">
                    <ul>
                        {
                            totalPage && pageNum>1 && (
                                <li onClick={()=> onChangePage(pageNum-1)}>
                                    &#60; Previous
                                </li>
                            )
                        }
                        {
                            totalPage &&
                            [...Array(totalPage<=9 ? totalPage : 9)].map((o,index ) => {
                                return(
                                    <li key={index}
                                        className={classnames(pageNum== index+1 &&"active")}
                                        onClick={()=>onChangePage(index+1)}
                                    >
                                        {index +1}
                                    </li>
                                )
                            })
                        }
                        {
                            totalPage>9 && (
                                <li
                                >
                                    ...
                                </li>
                            )
                        }
                        {
                            pageNum< totalPage && pageNum>9 && (
                                <li
                                    className={classnames(pageNum>9 &&"active")}
                                    onClick={()=>onChangePage(pageNum)}
                                >
                                    {pageNum}
                                </li>
                            )
                        }

                        {
                            totalPage >9 && (
                                <li
                                    className={classnames(pageNum== totalPage &&"active")}
                                    onClick={()=>onChangePage(totalPage)}
                                >
                                    {totalPage}
                                </li>
                            )
                        }
                        {
                            totalPage && pageNum < totalPage &&
                            (
                                <li
                                    onClick={()=>onChangePage(pageNum+1)}
                                >
                                    Next &#62;
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>

        );
    }
}