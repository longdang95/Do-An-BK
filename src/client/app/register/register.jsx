import React from "react";
import {Link} from "react-router-dom";
import {userApi} from "../../api/user/user-api";
import {AdminLayout} from "../component/admin-layout/admin-layout";
import {setTitle} from "../commond";



export class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            re_password: "",
            submitting: false,
            error: false
        };
        setTitle('Đăng ký')

    };

    handleOnSubmit(e) {
        this.setState({submitting: true, error: false});
        e.preventDefault();
        e.stopPropagation();
        const {username, password, re_password} = this.state;
        // let rexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
        if (username.includes(" ")
            // || !rexEmail.test(username)
            || username.length <4 || password.length < 4 || re_password.length < 4
            || password.includes(" ") || re_password.includes(" ") || password != re_password) {
            this.setState({submitting: false})
            alert('Vui lòng nhập đúng các trường !');
        }else{
            userApi.register({username: username, password: password, re_password: re_password})
                .then(({error, message}) => {
                    this.setState({submitting: false})
                    alert(message)
                    if(!error){
                        this.props.history.push('/login')
                    }
                })
        }
    }

    render() {
        let {username, password, re_password, submitting, error} = this.state;

        return (
            <AdminLayout
                {...this.props}
                showSideBar={false}
            >

                <div className="register">
                    <h1>Register</h1>
                    {/*{error && (*/}
                    {/*<div className="error-login">*/}
                    {/*Sai tài khoản hoặc mật khẩu*/}
                    {/*</div>*/}
                    {/*)}*/}
                    <form onSubmit={(e) => this.handleOnSubmit(e)}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.username}
                                        onChange={(e) => this.setState({username: e.target.value})}
                                        autoComplete='true'
                                        placeholder="Username"/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={this.state.password}
                                        autoComplete='true'
                                        onChange={(e) => this.setState({password: e.target.value})}
                                        placeholder="Password"/>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={this.state.re_password}
                                        autoComplete='true'
                                        onChange={(e) => this.setState({re_password: e.target.value})}
                                        placeholder="Re-Password"/>
                                </div>
                            </div>
                        </div>
                        <div style={{'paddingBottom': 20}}>
                            <button
                                disabled={submitting}
                                type="submit" className="submit-btn btn"
                            >
                                Register
                            </button>
                        </div>

                        <Link to="/login">
                            Do you have an acount ? <br/> Log in now !
                        </Link>
                    </form>

                </div>
            </AdminLayout>

        );
    }
}