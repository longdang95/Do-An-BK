

import React from 'react';
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {userServices} from "../services/user-info";
import {Button} from "antd";
import {UploadImage} from "../component/upload-image/upload-image";
import {userApi} from "../../api/user/user-api";
export class EditUserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            name : '',
            address : '',
            avatar : null
        };

        userApi.me().then(data =>{
            this.setState({
                username : data.username,
                name : data.name ,
                address : data.address ,
                avatar : data.avatar
            })
        })
    }
    updateInfo(){
        userApi.updateInfo(this.state).then(data =>{
            if( !data.error ) alert('Update thành công !')
            else alert('Vui lòng thực hiện lại')
        })
    }
    render() {
        let user = userServices.getUser();
        return(
            <AdminLayout
                {...this.props}
            >
                <div className='edit-user-info'>
                    <div className="main-container">
                        <h3>Sửa thông tin cá nhân: </h3>
                    </div>

                    <div className="main-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        disabled={true}
                                        value={this.state.username}
                                        placeholder="Tài khoản"/>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={(e) => this.setState({name: e.target.value})}
                                        placeholder="Tên người dùng"/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        value={this.state.address}
                                        onChange={(e) => this.setState({address: e.target.value})}
                                        placeholder="Địa chỉ"/>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <UploadImage
                                    height={200}
                                    multiple={false}
                                    classNames={['upload-user-avatar']}
                                    filePath={this.state.avatar ? [{filePath : this.state.avatar}] : []}
                                    onChange={(paths) => {
                                        console.log(paths)
                                        this.setState({avatar : paths[0].filePath})
                                    }}
                                />
                            </div>
                            <div className="action-area col-md-12">
                                <Button
                                    // disabled={true}
                                    type="primary"
                                    size="large"
                                    onClick={()=> this.updateInfo()}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        )
    }
}