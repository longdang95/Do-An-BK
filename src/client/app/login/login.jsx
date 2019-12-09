import React from "react";
import {security} from "../../../security/secuiry-fe";
import {AdminLayout} from "../component/admin-layout/admin-layout";

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            submitting: false,
            error: false
        };
    };

    handleOnSubmit(e) {
        this.setState({submitting: true, error: false});
        e.preventDefault();
        e.stopPropagation();
        const {username, password} = this.state;
        // userApi.login({username, password}).then((data) =>{
        //     this.props.history.push("/manage")
        // },()=>{
        //     this.setState({error: true, submitting: false})
        // })

        security.login({username, password}).then((data) => {
            this.props.history.push(`/manage/trials`)
        }, () => {
            this.setState({error: true, submitting: false})
        })

    }

    render() {
        let {username, password, submitting, error} = this.state;

        return (
            <AdminLayout
                {...this.props}
                showSideBar={false}
            >
                <div className="login">
                    <h1>Login</h1>
                    {error && (
                        <div className="error-login">
                            Sai tài khoản hoặc mật khẩu
                        </div>
                    )}
                    <form onSubmit={(e) => this.handleOnSubmit(e)}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.username}
                                        onChange={(e) => this.setState({username: e.target.value})}
                                        placeholder="Username"/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={(e) => this.setState({password: e.target.value})}
                                        placeholder="Password"/>
                                </div>
                            </div>
                        </div>
                        <button
                            disabled={submitting}
                            type="submit" className="btn btn-primary"
                        >
                            Login
                        </button>
                    </form>

                </div>
            </AdminLayout>
        );
    }
}