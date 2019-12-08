
import React from 'react';
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {UploadImage} from "../component/upload-image/upload-image";
import {Button} from "antd";
import {bannerApi} from "../../api/banner/banner-api";
export class UpdateBanners extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images : []
        };
    }
    handleUpload(){
        const {images} = this.state;
        bannerApi.updateBanners({images}).then(({error , message}) =>{
            alert(message);
            this.setState({images : []})
        })
    }
    canUpload(){

    }
    render() {
        return(
            <AdminLayout
                {...this.props}
            >
                <div className='update-banners'>
                    <div className="main-container">
                        <h3>Upload banners</h3>
                    </div>
                    <div style={{paddingBottom : '20px'}} className='main-container'>
                        <Button
                            disabled={this.canUpload()}
                            className='primary'
                            onClick={()=> this.handleUpload()}
                        >Upload</Button>
                    </div>
                    <div className="main-container">
                        <UploadImage
                            height={300}
                            classNames={['upload-product']}
                            filePath={this.state.images}
                            onChange={(paths)=>{
                                console.log(paths)
                                this.setState({
                                    images : this.state.images.concat(paths)
                                })
                            }}
                        />
                    </div>
                </div>
            </AdminLayout>
        )
    }
}