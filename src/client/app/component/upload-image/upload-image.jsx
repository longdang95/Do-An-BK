import React from "react";
import {uploadApi} from "../../../api/upload/upload-api";
import classnames from 'classnames'
export class UploadImage extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    handleImgFile(e){
        // e.preventDefault();
        let files = e.target.files;
        let promiseUpload = (file)=> new Promise((res,rej)=>{
            uploadApi.upload(file).then(data=> {
                let parseData = JSON.parse(data)
                res(parseData);
            })
        })
        let promiseAll = [] ;
        for(let i =0 ; i < files.length ; i++ ){
            promiseAll.push(promiseUpload(files[i]));
        }

        Promise.all(promiseAll).then(data =>{
            this.props.onChange(data);
        })
    }
    render(){
        const {height,classNames,multiple =true , filePath} =this.props;
        return(
            <div className={classnames('upload-image',...classNames)}>
                <input
                    type="file"
                    className="inputImage"
                    multiple={multiple}
                    onChange={(e)=>this.handleImgFile(e)}
                    accept="image/x-png,image/gif,image/jpeg"
                    // ref={inputFile => this.inputFile= inputFile}
                />
                <div style={{'minHeight' : height }} className='images-show'>
                    {
                         filePath.length > 0  &&  filePath.map((o,i) =>(
                            <img key={i} height={height} src={o.filePath || null} id='blah' alt=""/>
                        ))
                    }
                </div>


            </div>
        );
    }
}